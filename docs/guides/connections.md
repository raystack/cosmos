# Connections

You can easily manage database connections to the cube.js instance with the enigma. Enigma supports addition, update, and test database connections.

## Supported Databases

Following are the supported database types and the required fields.

| Database type | Fields                                                                                                                                             |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| BigQuery      | <pre lang="json">{<br> "projectId": "string"<br/> "credentials": "string" <br>}</pre>                                                              |
| Postgres      | <pre lang="json">{<br> "host": "string",<br> "port": "number",<br> "database": "string",<br> "user": "string",<br> "password": "string"<br>}</pre> |
| Mysql         | <pre lang="json">{<br> "host": "string",<br> "port": "number",<br> "database": "string",<br> "user": "string",<br> "password": "string"<br>}</pre> |

## Adding a Connection

You can add a new connection just by hitting the create connection API. The request payload requires the `credentials` object for the database type. You can check the credentials fields in the [supported databases table](#supported-databases)

The `credentials` here is in plaintext while it will be encrypted while saving in the database.

```
POST /api/connections
Content-Type: application/json
Accept: application/json

Request Body:

{
  "name": "connection-name",
  "type": "database-type",
  "credentials": {}
}
```

On Success, it will return the connection object along with generated `urn`

## Updating Connection

To update the connection you have to call the update connection API with connection urn and the updated payload. The payload of the update API is the same as create connection API.

```
PUT /api/connections/{urn}
Content-Type: application/json
Accept: application/json

Request Body:

{
  "name": "connection-name",
  "type": "database-type",
  "credentials": {}
}
```

## Testing Connection

There are two ways to test database connection with the enigma.

1. Before adding the connection.

   There is `api/connections/test` API which takes the create/update API payload. It tests the payload by trying to set up a database connection

   ```
    POST /api/connections/test
    Content-Type: application/json
    Accept: application/json

    Request Body:

    {
      "name": "connection-name",
      "type": "database-type",
      "credentials": {}
    }
   ```

2. After adding the connection.

   We can test any saved connection by calling the `api/connections/{urn}/test` API. It needs a connection urn and tests the connection with the saved credentials.

   ```
    GET /api/connections/{urn}/test
    Content-Type: application/json
    Accept: application/json
   ```

Both APIs return the test status which is either `Success` or `Failure`.

```
 Response Body:

 {
  "data": "Success"
 }
```
