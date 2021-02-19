import Connection, { IConnectionDocument } from 'src/models/connection';
import * as Transformer from './transformer';

export const list = async (): Promise<IConnectionDocument[]> => {
  const connections = await Connection.list();
  return connections;
};

export type CreatePayload = Pick<
  IConnectionDocument,
  'name' | 'type' | 'credentials'
>;

export const create = async (
  data: CreatePayload
): Promise<IConnectionDocument> => {
  const payload = await Transformer.create(data);
  const connection = await Connection.create(payload);
  return connection;
};

export const get = async (urn: string): Promise<IConnectionDocument> => {
  const connection = await Connection.findByUrn(urn);
  return connection;
};
