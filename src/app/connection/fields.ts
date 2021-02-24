import { IFieldsMap } from 'src/types';

const fieldsMap: IFieldsMap = {
  postgres: {
    fields: [
      { name: 'host', type: 'string' },
      { name: 'port', type: 'number' },
      { name: 'database', type: 'string' },
      { name: 'user', type: 'string' },
      { name: 'password', type: 'string' }
    ]
  },
  mysql: {
    fields: [
      { name: 'host', type: 'string' },
      { name: 'port', type: 'number' },
      { name: 'database', type: 'string' },
      { name: 'user', type: 'string' },
      { name: 'password', type: 'string' }
    ]
  },
  bigquery: {
    fields: [
      { name: 'projectId', type: 'string' },
      {
        name: 'credentials',
        type: 'string',
        description: 'base64 encoded Service Account Key File'
      }
    ]
  }
};

export default fieldsMap;
