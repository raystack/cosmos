import Confidence from 'confidence';

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
  mongoose: {
    uri: {
      $env: 'MONGODB_HOST',
      $default: 'mongodb://localhost/enigma'
    }
  },
  encryption_secrect_key: {
    $env: 'ENCRYPTION_SECRET_KEY',
    $default: 'test'
  }
};

const store = new Confidence.Store(config);

export function get<T>(key: string): T {
  return store.get(key, criteria);
}
