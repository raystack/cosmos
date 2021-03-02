import Cube from 'src/models/cube';
import { ICubeDocument, ICreateCubePayload, ICubeListQuery } from 'src/types';
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
