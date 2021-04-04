import Connection from 'src/models/connection';
import Cube from 'src/models/cube';
import * as CubeTransformer from 'src/app/cube/transformer';

import {
  ICreateConnectionPayload,
  IConnectionResponse,
  IPGTablesDetails,
  ITableListItem,
  ICubeDocument
} from 'src/types';
import ConnectionProvider from 'src/providers/connection';
import * as Transformer from './transformer';

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

export const testConnection = async (urn: string): Promise<string | null> => {
  const connection = await Connection.findByUrn(urn);
  if (!connection) return null;
  const transformedData = await Transformer.get(connection);
  const provider = new ConnectionProvider(
    transformedData.type,
    transformedData.credentials
  );
  return provider.test();
};

export const testCredentials = async (
  payload: ICreateConnectionPayload
): Promise<string | null> => {
  const { type, credentials } = payload;
  const provider = new ConnectionProvider(type, credentials);
  return provider.test();
};

export const listTables = async (
  urn: string
): Promise<ITableListItem[] | null> => {
  const connection = await Connection.findByUrn(urn);
  if (!connection) return null;
  const transformedData = await Transformer.get(connection);
  const provider = new ConnectionProvider(
    transformedData.type,
    transformedData.credentials
  );
  return provider.getTablesList();
};

export const createTablesCubes = async (
  urn: string
): Promise<ICubeDocument[] | null> => {
  const connection = await Connection.findByUrn(urn);
  if (!connection) return null;
  const transformedData = await Transformer.get(connection);
  const provider = new ConnectionProvider(
    transformedData.type,
    transformedData.credentials
  );
  const dataSource = `${transformedData.type}::${urn}`;
  const cubes = await provider.getConnectionTablesCubes(dataSource);
  const cubesPayload = await Promise.all(
    cubes.map((c) =>
      CubeTransformer.create({
        content: c.cube,
        tableId: c.id,
        connection: urn
      })
    )
  );
  return Cube.create(cubesPayload);
};

export const getTable = async (
  urn: string,
  table: string
): Promise<IPGTablesDetails[] | null | unknown> => {
  const connection = await Connection.findByUrn(urn);
  if (!connection) return null;
  const transformedData = await Transformer.get(connection);
  const provider = new ConnectionProvider(
    transformedData.type,
    transformedData.credentials
  );
  return provider.getTablesDetails(table);
};

export const getTableCube = async (
  urn: string,
  table: string
): Promise<string | null> => {
  const connection = await Connection.findByUrn(urn);
  if (!connection) return null;
  const transformedData = await Transformer.get(connection);
  const provider = new ConnectionProvider(
    transformedData.type,
    transformedData.credentials
  );
  const dataSource = `${transformedData.type}::${urn}`;
  return provider.getTableCube(table, dataSource);
};
