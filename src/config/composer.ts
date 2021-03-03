import Glue, { Manifest } from '@hapi/glue';
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger';
import Hapi from '@hapi/hapi';
import Boom from '@hapi/boom';
import * as Config from './config';
import Logging from '../plugins/logging';
import * as Meta from '../app/meta';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Package = require('../../package.json');

const swaggerOptions = {
  info: {
    title: `${Package.name} API documentation`,
    version: Package.version
  },
  schemes: ['http'],
  deReference: true,
  basePath: '/api',
  pathPrefixSize: 2
};

const manifest: Manifest = {
  server: {
    port: Config.get('/port/api'),
    router: {
      stripTrailingSlash: true,
      isCaseSensitive: false
    },
    compression: false,
    routes: {
      security: true,
      cors: true,
      timeout: {
        socket: false
      },
      validate: {
        failAction: async (_request, _h, err) => {
          throw Boom.badRequest(err?.message);
        }
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: '../plugins/mongoose',
        options: Config.get('/mongoose')
      },
      {
        plugin: '../app/health/index',
        routes: {
          prefix: '/api'
        }
      },
      {
        plugin: '../app/connection/index',
        routes: {
          prefix: '/api'
        }
      },
      {
        plugin: '../app/cube/index',
        routes: {
          prefix: '/api'
        }
      },
      {
        plugin: Meta.plugin,
        routes: {
          prefix: '/api/meta'
        }
      },
      {
        plugin: Inert
      },
      {
        plugin: Vision
      },
      {
        plugin: HapiSwagger,
        options: swaggerOptions
      },
      Logging
    ]
  }
};

const options = {
  relativeTo: __dirname
};

const compose = async (): Promise<Hapi.Server> => {
  const server = await Glue.compose(manifest, options);
  return server;
};

export default compose;
