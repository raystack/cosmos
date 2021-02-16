import Hapi from '@hapi/hapi'

export const ping = {
  description: 'pong the request',
  handler: (_req: Hapi.Request, _h: Hapi.ResponseToolkit) => {
    return {
      statusCode: 200,
      status: 'ok',
      message: 'pong'
    };
  }
};
