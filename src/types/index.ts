import { Document } from 'mongoose';

export interface ICreateConnectionPayload {
  name: string;
  type: string;
  credentials: Record<string, string>;
}

export interface IConnectionDocument
  extends Omit<ICreateConnectionPayload, 'credentials'>,
    Document {
  urn: string;
  credentials: string;
  createdAt: string;
  updatedAt: string;
}

export interface IConnectionResponse
  extends Omit<IConnectionDocument, 'credentials'> {
  credentials: Record<string, string>;
}

export interface ICreateConnectionTransformReturn
  extends Omit<ICreateConnectionPayload, 'credentials'> {
  urn: string;
  credentials: string;
}
