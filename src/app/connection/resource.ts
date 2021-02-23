import Connection from 'src/models/connection';
import {
  ICreateConnectionPayload,
  IConnectionResponse,
  IFieldsMap
} from 'src/types';
import * as Transformer from './transformer';
import Fields from './fields';

export const list = async (): Promise<IConnectionResponse[]> => {
  const connections = await Connection.list();
  return Promise.all(connections.map(Transformer.get));
};

export const create = async (
  payload: ICreateConnectionPayload
): Promise<IConnectionResponse> => {
  const data = await Transformer.create(payload);
  const connection = await Connection.create(data);
  return connection && Transformer.get(connection.toJSON());
};

export const get = async (urn: string): Promise<IConnectionResponse | null> => {
  const connection = await Connection.findByUrn(urn);
  return connection && Transformer.get(connection);
};

export const update = async (
  urn: string,
  payload: ICreateConnectionPayload
): Promise<IConnectionResponse | null> => {
  const data = await Transformer.update(payload);
  const connection = await Connection.updateByUrn(urn, data);
  return connection && Transformer.get(connection);
};

export const getFields = async (): Promise<IFieldsMap> => {
  return Fields;
};
