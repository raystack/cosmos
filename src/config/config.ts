import Confidence from 'confidence';

const criteria = {
  env: process.env.NODE_ENV,
  ci: process.env.CI
};

const config = {
  $meta: 'App configuration',
  env: {
    $filter: 'env',
    production: 'production',
    integration: 'integration',
    test: 'test',
    $default: 'dev'
  },
  port: {
    api: {
      $filter: 'env',
      test: 9000,
      production: process.env.PORT,
      integration: process.env.PORT,
      $default: 8000
    }
  },
  mongoose: {
    uri: {
      $env: 'MONGODB_HOST',
      $default: 'mongodb://localhost/cosmos'
    }
  },
  encryption_secrect_key: {
    $env: 'ENCRYPTION_SECRET_KEY',
    $default: 'test'
  },
  // Joi validation options
  validationOptions: {
    abortEarly: false, // abort after the last validation error
    stripUnknown: true // remove unknown keys from the validated data
  }
};

const store = new Confidence.Store(config);

export function get<T>(key: string): T {
  return store.get(key, criteria);
}
