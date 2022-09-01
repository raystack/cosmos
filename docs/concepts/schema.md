# Schema

Following are the details of schema models used in Cosmos

## Connection

| Field Name  | Field Type    | Description                                |
| ----------- | ------------- | ------------------------------------------ |
| urn         | string (uuid) | primary key for Connection model           |
| name        | string        | Connection Name                            |
| type        | string        | Connection Database Type                   |
| credentials | string        | Encryped Connection Credentials            |
| createdAt   | string        | data/time when the record was created      |
| updatedAt   | string        | data/time when the record was last updated |

## Cube

| Field Name | Field Type    | Description                                |
| ---------- | ------------- | ------------------------------------------ |
| urn        | string (uuid) | primary key for Cube model                 |
| connection | string        | Connection urn                             |
| tableId    | string        | Database table unique id                   |
| content    | string        | Cube.js Schema content                     |
| createdAt  | string        | data/time when the record was created      |
| updatedAt  | string        | data/time when the record was last updated |

## Metric

| Field Name   | Field Type                                                                                                               | Description                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| urn          | string (uuid)                                                                                                            | primary key for Metric model               |
| name         | string                                                                                                                   | Metric Name                                |
| abbreviation | string                                                                                                                   | Metric Abbreviation                        |
| description  | string                                                                                                                   | Metric Description                         |
| meta         | Map<string, string>                                                                                                      | Metadata for Metric                        |
| labels       | Map<string, string>                                                                                                      | Labels for Metric                          |
| fields       | <pre lang="ts">{<br> "measures": Array[string],<br> "dimensions": Array[string],<br> "filters": Array[Object]<br>}</pre> | Cube.js Query                              |
| createdAt    | string                                                                                                                   | data/time when the record was created      |
| updatedAt    | string                                                                                                                   | data/time when the record was last updated |
