import Connection from 'src/models/connection';
import { ICreateConnectionPayload, IConnectionResponse } from 'src/types';
import * as Transformer from './transformer';

export const list = async (): Promise<IConnectionResponse[]> => {
  const connections = await Connection.list();
  return Promise.all(connections.map(Transformer.get));
};

export const create = async (
  data: ICreateConnectionPayload
): Promise<IConnectionResponse> => {
  const payload = await Transformer.create(data);
  const connection = await Connection.create(payload);
  return connection && Transformer.get(connection.toJSON());
};

export const get = async (urn: string): Promise<IConnectionResponse | null> => {
  const connection = await Connection.findByUrn(urn);
  return connection && Transformer.get(connection);
};
