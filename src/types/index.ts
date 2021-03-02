/* eslint-disable camelcase */
import { Document } from 'mongoose';

// * Important: need to install cube driver for the supported dbs
export type SupportedDBType = 'postgres' | 'mysql' | 'bigquery';

export interface ICreateConnectionPayload {
  name: string;
  type: SupportedDBType;
  credentials: Record<string, string | number>;
}

export interface ICreateCubePayload {
  connection: string;
  tableName: string;
  content: string;
}

export interface ICubeListQuery {
  connection?: string;
}

export interface ICreateCubeTransformedPayload extends ICreateCubePayload {
  urn: string;
}

export interface IConnection
  extends Omit<ICreateConnectionPayload, 'credentials'> {
  urn: string;
  credentials: string;
  createdAt: string;
  updatedAt: string;
}

export type IConnectionDocument = IConnection & Document;

export interface ICube {
  urn: string;
  connection: string;
  tableName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type ICubeDocument = ICube & Document;

export interface IConnectionResponse extends Omit<IConnection, 'credentials'> {
  credentials: Record<string, string | number>;
}

export interface IFieldsObject {
  name: string;
  type: string | number;
  description?: string;
}

export interface IFieldsMap {
  [key: string]: {
    fields: Array<IFieldsObject>;
  };
}

export interface ICreateConnectionTransformedPayload
  extends Omit<ICreateConnectionPayload, 'credentials'> {
  urn: string;
  credentials: string;
}

export interface IPGTablesResult {
  table_schema: string;
  table_name: string;
}
export interface IPGTablesDetails {
  table_catalog: string;
  table_name: string;
  column_name: string;
  data_type: string;
}

export interface ITableListItem {
  name: string;
  id: string;
}
