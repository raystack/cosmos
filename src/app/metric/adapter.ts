import * as CubeProvider from 'src/providers/cube';
import { IMetric, IMetricResponse } from 'src/types';

export async function addSql(metric: IMetric): Promise<IMetricResponse> {
  const { fields } = metric;
  const sql = await CubeProvider.getSql(fields);
  return { ...metric, sql };
}
