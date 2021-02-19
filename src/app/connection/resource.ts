import Connection from 'src/models/connection';

export const list = async () => {
  const connections = await Connection.list();
  return connections;
};
