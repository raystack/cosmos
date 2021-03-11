import { Factory } from 'rosie';
import faker from 'faker';

export const payload = new Factory().attrs({
  name: faker.lorem.word(),
  abbreviation: faker.hacker.abbreviation(),
  fields: {
    measures: [],
    dimensions: [],
    filters: []
  }
});

export const data = new Factory()
  .sequence('urn', () => faker.random.uuid())
  .attrs({
    urn: faker.random.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    abbreviation: faker.hacker.abbreviation(),
    fields: {
      measures: [],
      dimensions: [],
      filters: []
    }
  });
