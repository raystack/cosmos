import Cube from 'src/models/cube';
import { ICubeDocument } from 'src/types';

export const list = async (): Promise<ICubeDocument[]> => {
  const cubes = await Cube.list();
  return cubes;
};
