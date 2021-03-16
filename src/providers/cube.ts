import { IMetricFields } from 'src/types';
import * as Config from 'src/config/config';
import fetch from 'node-fetch';

export async function getSql(fields: IMetricFields): Promise<string> {
  const query = JSON.stringify(fields);
  const url = `${Config.get(
    '/cube_server/url'
  )}/cubejs-api/v1/sql?query=${query}`;
  const { sql } = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`Unable to fetch sql : ${err}`);
    });
  return sql.sql;
}
