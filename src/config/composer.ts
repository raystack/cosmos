import Glue from '@hapi/glue'

const manifest = {
  server: {
    port: 3000,
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