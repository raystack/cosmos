import Cube from 'src/models/cube';
import { ICubesStats } from 'src/types';

export const cubesStats = async (): Promise<ICubesStats | undefined> => {
  const stats = await Cube.getStats();
  return stats[0];
};
