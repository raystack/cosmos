import { Factory } from 'rosie';
import faker from 'faker';

export const data = new Factory()
  .sequence('urn', () => faker.random.uuid())
  .attrs({
    name: faker.lorem.word(),
    type: faker.database.engine(),
    createdAt: () => new Date(),
    updatedAt: () => new Date()
  });
