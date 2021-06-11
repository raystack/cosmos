# Deployment

Deploying Enigma is very simple with the docker image. You can find the enigma docker image on [dockerhub](https://hub.docker.com/r/odpf/enigma).

## Pre-requisites

1. Enigma needs a MongoDB connection.
2. [Cube.js](https://hub.docker.com/r/odpf/enigma-cube) instance running.

```
docker run -e MONGODB_HOST=mongodb://127.0.0.1:27017/enigma -p 8000:8000 odpf/enigma
```

## Environment Variables

| Name                  | Description                                                                   | Required | default |
| --------------------- | ----------------------------------------------------------------------------- | -------- | ------- |
| PORT                  | port number on which enigma server needs to run                               |          | 8000    |
| MONGODB_HOST          | MongoDB URI for the database connection                                       | true     |         |
| ENCRYPTION_SECRET_KEY | encryption secret to encrypt/decrypt the connection credentials while storing |          | ""      |
| CUBE_URL              | url of cube.js instance for proxying the requests                             |          |         |
