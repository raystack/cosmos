import Glue, {Manifest} from '@hapi/glue'
import Inert from '@hapi/inert';
import Vision from '@hapi/vision';
import HapiSwagger from 'hapi-swagger'
import * as Config from './config';
import Logging from '../plugins/logging';
const Package = require('../../package.json')

const swaggerOptions = {
  info: {
    title: `${Package.name} API documentation`,
    version: Package.version
  },
  schemes: ['http'],
  deReference: true
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
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: '../app/health/index'
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
}

const options = {
  relativeTo: __dirname
};

const compose = async () => {
  const server = await Glue.compose(manifest, options);
  return server;
};

export default compose