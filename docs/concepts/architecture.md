# Architecture

## Technologies

Enigma is developed with

- [node.js](https://nodejs.org/en/) - Javascript runtime
- [typescript](https://www.typescriptlang.org/) - Adds static type definitions to javascript
- [docker](https://www.docker.com/get-started) - container engine runs on top of operating system
- [hapi](https://hapi.dev/) - Web application framework
- [mongodb](https://www.mongodb.com/) - a NoSQL database
- [mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for mongodb.

## Running locally

In order to install this project locally, you can follow the instructions below:

```text
$ git clone git@github.com:odpf/enigma.git
$ cd enigma
$ docker-compose up
```

Visit [http://localhost:8000/documentation](http://localhost:8000/documentation) to view API documentation.

`docker-compose` will start:

1. monogodb instance
2. enigma server
3. cube.js instance
4. redis for cube.js caching
5. postgres for cube.js pre-aggregation database
