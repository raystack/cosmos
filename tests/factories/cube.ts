import { Factory } from 'rosie';
import faker from 'faker';

export const data = new Factory()
  .sequence('urn', () => faker.random.uuid())
  .attrs({
    connectionUrn: faker.random.uuid(),
    tableName: faker.lorem.word(),
    content: faker.lorem.paragraph(),
    createdAt: () => new Date(),
    updatedAt: () => new Date()
  });

export const payload = new Factory().attrs({
  connectionUrn: faker.random.uuid(),
  tableName: faker.lorem.word(),
  content: faker.lorem.paragraph()
});
