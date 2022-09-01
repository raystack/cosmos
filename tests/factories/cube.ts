import { Factory } from 'rosie';
import faker from 'faker';

export const data = new Factory()
  .sequence('urn', () => faker.datatype.uuid())
  .attrs({
    connection: faker.datatype.uuid(),
    tableId: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    createdAt: () => new Date(),
    updatedAt: () => new Date()
  });

export const payload = new Factory().attrs({
  connection: faker.datatype.uuid(),
  tableId: faker.lorem.word(),
  content: faker.lorem.paragraph()
});
