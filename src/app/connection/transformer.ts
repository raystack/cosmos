import * as Adapter from 'src/lib/adapter';

export function create<T>(data: T) {
  return Adapter.urn(data);
}
