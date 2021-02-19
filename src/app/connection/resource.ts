import Connection, { IConnectionDocument } from 'src/models/connection';
import * as Transformer from './transformer';

export const list = async () => {
  const connections = await Connection.list();
  return connections;
};

export type CreatePayload = Pick<
  IConnectionDocument,
  'name' | 'type' | 'credentials'
>;

export const create = async (data: CreatePayload) => {
  const payload = await Transformer.create(data);
  const connection = await Connection.create(payload);
  return connection;
};
