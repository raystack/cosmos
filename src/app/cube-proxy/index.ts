import Hapi from '@hapi/hapi';
import * as Config from '../../config/config';

interface ICubeProxyOptions {
  url: string;
}

function modifyPath(pathname: string) {
  const pathArr = pathname.split('/');
  return pathArr.slice(2).join('/');
}

const cubeURl = Config.get('/cube_server/url');

export const plugin = {
  name: 'cube-proxy',
  version: '1.0.0',
  register: (server: Hapi.Server, options: ICubeProxyOptions): void => {
    if (cubeURl) {
      server.route({
        method: '*',
        path: '/{wildcard*}',
        handler: {
          proxy: {
            mapUri: async (request) => {
              const { pathname, search } = request.url;
              return {
                uri: `${cubeURl}/${modifyPath(pathname)}${search}`
              };
            },
            passThrough: true
          }
        }
      });
    } else {
      server.route({
        method: '*',
        path: '/{wildcard*}',
        handler: async (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
          return { data: 'Proxy is not Enabled' };
        }
      });
    }
  }
};
