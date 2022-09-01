# Structure

This document describes the directory and code structure of Cosmos, which will give a contributor an idea of where to make code changes to fix bugs or implement new features.

## Directory Structure

Following is the dirctory structure of Cosmos.

```
├── cube-server
├── docs
│   ├── concepts
│   ├── contribute
│   ├── guides
│   └── reference
├── src
│   ├── app
│   │   ├── connection
│   │   ├── connection-fields
│   │   ├── cube
│   │   ├── cube-proxy
│   │   ├── health
│   │   ├── meta
│   │   └── metric
│   ├── config
│   ├── lib
│   ├── models
│   ├── plugins
│   ├── providers
│   └── types
└── tests
    ├── app
    │   ├── connection
    │   ├── connection-fields
    │   ├── cube
    │   ├── health
    │   ├── meta
    │   └── metric
    ├── factories
    ├── lib
    └── providers
```

The `src` folder contains all the source code for the app and `tests` follows the same structure and contains tests for `src` files.

## cube-server

The `cube-server` contains source code for `cube.js` docker image. Cube server needs custom `cube.js` file to read connections and schema files from Cosmos.

```
├── Dockerfile
├── cube.js
├── package-lock.json
├── package.json
```

## src/server.ts

The server is initialized here

## src/app

This folder contains the entry point of handling the native endpoints of Cosmos. Any sub-folder inside the app will have the entry points to handle the APIs. For eg: /app/connection will contain the entry point of the code required to handle /api/connections endpoints

## src/app/cube-proxy

This folder contains the configuration for proxying requests to the cube.js instance.

## src/app/{domain}

As described earlier, any sub-folder inside the app folder contains the entry point of the code required to handle various endpoints.

## src/app/{domain}/index.ts

This file contains all the routes for a specific domain. For eg: app/cube/index.ts will container all the routes with /api/cubes as the base.

## src/app/{domain}/schema.ts

This file contains all the schema definitions used for validating requests and responses. The schemas have been defined using Joi.

## src/app/{domain}/handler.ts

The handler acts as a controller that validates and calls the appropriate resource method to handle the request.

## src/app/{domain}/resource.ts

This file contains methods with business logic to handle a request. These methods might interact with the database models to fetch data, or can even call other methods present in utils, other domains, lib, etc.

# src/config/composer.ts

The composer file registers all the plugins used by Cosmos, loads the configs, and exposes the method to construct the server.

## src/config/config.js

This file contains all the configs such as port, environment, etc.

## docs

This folder contains all the documentation deployed in Gitbook.
