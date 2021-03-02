# Cosmos

[![node-ci](https://github.com/odpf/cosmos/actions/workflows/test.yml/badge.svg)](https://github.com/odpf/cosmos/actions/workflows/test.yml)

## Getting Started

Cosmos Docker image can be found [here](https://github.com/orgs/odpf/packages?repo_name=cosmos)

```sh
docker run -e MONGODB_HOST=mongodb://127.0.0.1:27017/cosmos -p 8000:8000 docker.pkg.github.com/odpf/cosmos/cosmos
```

Visit [http://localhost:8000/documentation](http://localhost:8000/documentation) to view API documentation.

## Environment Variables

```bash
PORT (optional, default: 8000)
MONGODB_HOST (required)
ENCRYPTION_SECRET_KEY (optional, default: "")
```

## Building from source

### Prerequisite Tools

- [Node.js](https://nodejs.org/) (version >= 12.0.0)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

1. Clone the repo

   ```sh
   $ git clone https://github.com/odpf/cosmos
   $ cd cosmos
   ```

2. Install dependencies

   ```sh
   $ npm install
   ```

3. Run development server

   ```sh
   $ npm run dev
   ```

4. Build production server

   ```sh
   $ npm build
   ```

5. Run production server locally

   ```sh
   $ npm start
   ```

## Running tests

All of the tests are written with [jest](https://jestjs.io/). They can be run with npm/yarn.

```sh
$ npm test
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags](https://github.com/odpf/cosmos/tags).

## License

Cosmos is released under the Apache License 2.0. See [LICENSE](LICENSE)
