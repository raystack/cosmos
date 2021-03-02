import Cube from 'src/models/cube';
import {
  ICubeDocument,
  ICreateCubePayload,
  ICubeListQuery,
  IUpdateCubePayload
} from 'src/types';
import * as Transformer from './transformer';

export const list = async (
  query: ICubeListQuery = {}
): Promise<ICubeDocument[]> => {
  const cubes = await Cube.list(query);
  return cubes;
};

export const create = async (
  payload: ICreateCubePayload
): Promise<ICubeDocument> => {
  const data = await Transformer.create(payload);
  const connection = await Cube.create(data);
  return connection;
};

export const get = async (urn: string): Promise<ICubeDocument | null> => {
  return Cube.findByUrn(urn);
};

export const update = async (
  urn: string,
  payload: IUpdateCubePayload
): Promise<ICubeDocument | null> => {
  return Cube.updateByUrn(urn, payload);
};
