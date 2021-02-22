import * as Adapter from 'src/lib/adapter';

export async function create<T>(data: T) {
  return Adapter.urn(data);
}
