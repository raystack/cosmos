import Cube from 'src/models/cube';
import { ICubeDocument, ICreateCubePayload } from 'src/types';
import * as Transformer from './transformer';

export const list = async (): Promise<ICubeDocument[]> => {
  const cubes = await Cube.list();
  return cubes;
};

export const create = async (
  payload: ICreateCubePayload
): Promise<ICubeDocument> => {
  const data = await Transformer.create(payload);
  const connection = await Cube.create(data);
  return connection;
};
