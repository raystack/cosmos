import Hapi from '@hapi/hapi';

interface ICubeProxyOptions {
  url: string;
}

export const plugin = {
  name: 'cube-proxy',
  version: '1.0.0',
  register: (server: Hapi.Server, options: ICubeProxyOptions): void => {
    server.route({
      method: '*',
      path: '/{wildcard*}',
      handler: {
        proxy: {
          passThrough: true,
          uri: `${options.url}/{wildcard}`
        }
      }
    });
  }
};
