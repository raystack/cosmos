import { ServerRoute } from '@hapi/hapi';
import * as Handler from './handler';

export const META_ROUTES: ServerRoute[] = [
  {
    method: 'GET',
    path: '/{metricUrn}/meta',
    options: Handler.list
  },
  {
    method: 'POST',
    path: '/{metricUrn}/meta',
    options: Handler.create
  },
  {
    method: 'GET',
    path: '/{metricUrn}/meta/{metaName}',
    options: Handler.get
  },
  {
    method: 'PUT',
    path: '/{metricUrn}/meta/{metaName}',
    options: Handler.update
  },
  {
    method: 'DELETE',
    path: '/{metricUrn}/meta/{metaName}',
    options: Handler.deleteMeta
  }
];
