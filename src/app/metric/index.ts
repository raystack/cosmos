import Hapi from '@hapi/hapi';

export const plugin = {
  name: 'metric',
  version: '1.0.0',
  register: (server: Hapi.Server): void => {}
};
