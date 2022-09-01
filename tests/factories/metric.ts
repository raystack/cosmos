import { Factory } from 'rosie';
import faker from 'faker';

export const payload = new Factory().attrs({
  name: faker.lorem.word(),
  abbreviation: faker.hacker.abbreviation(),
  meta: {
    [faker.lorem.word()]: faker.lorem.word()
  },
  fields: {
    measures: [],
    dimensions: [],
    filters: []
  }
});

export const data = new Factory()
  .sequence('urn', () => faker.datatype.uuid())
  .attrs({
    urn: faker.datatype.uuid(),
    name: faker.lorem.word(),
    description: faker.lorem.sentence(),
    abbreviation: faker.hacker.abbreviation(),
    meta: {
      [faker.lorem.word()]: faker.lorem.word()
    },
    fields: {
      measures: [],
      dimensions: [],
      filters: []
    }
  });
