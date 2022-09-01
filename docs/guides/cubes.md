# Cubes Schema

Cosmos supports management and auto-generation for cube.js schema files.

## Generating Cube schema

Cosmos can auto-generate cube schema files for connection tables. Cosmos bulk generates the schema files for all the tables of the connection. You need to call `api/connections/{urn}/tables` API to generate schema files.

```
PUT api/connections/{urn}/tables
Content-Type: application/json
Accept: application/json

Request Body:

{}
```

## Creating Cube schema

You can even manually create schema files for the table. For this, you need to call the create cube API with schema file content as payload. The request payload also requires a connection urn and tableId.

```
POST api/cubes
Content-Type: application/json
Accept: application/json

Request Body:

{
  "connection": "string",
  "tableId": "string",
  "content": "string"
}
```

## Updating Cube schema

You can update the schema file whether it is auto-generated or manually created. The update cube api requires the schema file urn and updated content as request payload.

```
PUT api/cubes/{urn}
Content-Type: application/json
Accept: application/json

Request Body:

{
  "connection": "string",
  "tableId": "string",
  "content": "string"
}
```
