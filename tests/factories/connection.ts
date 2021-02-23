import { Factory } from 'rosie';
import faker from 'faker';

export const data = new Factory()
  .sequence('urn', () => faker.random.uuid())
  .attrs({
    name: faker.lorem.word(),
    type: faker.helpers.randomize(['postgres']),
    createdAt: () => new Date(),
    updatedAt: () => new Date()
  });

export const payload = new Factory().attrs({
  name: faker.lorem.word(),
  type: faker.helpers.randomize(['postgres']),
  credentials: {
    host: faker.internet.ip(),
    username: faker.internet.userName(),
    password: faker.internet.password()
  }
});
