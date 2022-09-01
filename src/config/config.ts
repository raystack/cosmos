import Confidence from 'confidence';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Package = require('../../package.json');

const { name, version } = Package;

const criteria = {
  env: process.env.NODE_ENV,
  ci: process.env.CI
};

const config = {
  $meta: 'App configuration',
  port: {
    api: {
      $env: 'PORT',
      $default: 8000
    }
  },
  app: {
    name,
    version
  },
  mongoose: {
    uri: {
      $env: 'MONGODB_HOST',
      $default: 'mongodb://localhost/cosmos'
    }
  },
  cube_server: {
    url: {
      $env: 'CUBE_URL'
    }
  },
  encryption_secrect_key: {
    $env: 'ENCRYPTION_SECRET_KEY',
    $default: 'test'
  },
  new_relic: {
    APP_NAME: { $env: 'NEW_RELIC_APP_NAME', $default: name },
    KEY: { $env: 'NEW_RELIC_KEY' },
    enabled: {
      $filter: 'env',
      test: 'false',
      $default: { $env: 'NEW_RELIC_ENABLED', $default: 'false' }
    }
  }
};

const store = new Confidence.Store(config);

export function get<T>(key: string): T {
  return store.get(key, criteria);
}
