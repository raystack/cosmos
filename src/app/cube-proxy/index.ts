import Hapi from '@hapi/hapi';

interface ICubeProxyOptions {
  url: string;
}

function modifyPath(pathname: string) {
  const pathArr = pathname.split('/');
  return pathArr.slice(2).join('/');
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
          mapUri: async (request) => {
            const { pathname, search } = request.url;
            return {
              uri: `${options.url}/${modifyPath(pathname)}${search}`
            };
          },
          passThrough: true
        }
      }
    });
  }
};
