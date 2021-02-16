/* eslint-disable no-console */
import * as Joi from 'joi';
import { Server } from '@hapi/hapi';
import { Options } from '@hapi/glue';

import Mongoose from 'mongoose';
import Glob from 'glob';
import Hoek from '@hapi/hoek';

const internals = {
  schema: Joi.object({
    uri: Joi.string().uri().required(),
    options: Joi.object()
  })
};

exports.plugin = {
  name: 'mongoose',
  version: '1.0.0',
  async register(server: Server, options: Options) {
    const result = internals.schema.validate(options);
    Mongoose.Promise = global.Promise;

    const connectToMongo = () =>
      new Promise((resolve) => {
        const tryConnectToMongo = () => {
          const mongoConnectionErrorHandler = (err: Error) => {
            if (err) {
              console.error(
                'Failed to connect to mongo on start up - retrying in 5 sec'
              );
              setTimeout(tryConnectToMongo, 5000);
            }
            Hoek.assert(!err, err);
          };

          return Mongoose.connect(result.value.uri, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
          }).then(resolve, mongoConnectionErrorHandler);
        };

        tryConnectToMongo();
      });

    Mongoose.connection.on('connected', () => {
      console.log('Connected to mongoDB');
    });

    Mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    Mongoose.connection.on('error', () => {
      console.error('Could not connect to MongoDB');
    });

    Mongoose.connection.on('reconnectFailed', () => {
      console.error('Mongodb reconnect failed');
    });

    server.events.on('stop', () => {
      console.log('Closing MongoDB connections on server stop');
      Mongoose.connection.close();
    });

    await connectToMongo();

    const models = Glob.sync('models/*.js');
    models.forEach((model) => {
      import(`../${model}`);
    });
  }
};
