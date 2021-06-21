# enigma API documentation
## Version: 0.1.1

### /ping

#### GET
##### Summary

pong the request

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /connections

#### GET
##### Summary

List Connections

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### POST
##### Summary

Create Connection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /connections-fields

#### GET
##### Summary

Get Connection fields

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /cubes

#### GET
##### Summary

List Cubes

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| connection | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### POST
##### Summary

Create Cube

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /metrics

#### GET
##### Summary

Get Metric list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| meta | query |  | No | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### POST
##### Summary

Create Metric

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /connections/{urn}

#### GET
##### Summary

Get Connection by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### PUT
##### Summary

Update Connection by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /cubes/{urn}

#### GET
##### Summary

Get Cube by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### PUT
##### Summary

Update Cube by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /meta/cubes

#### GET
##### Summary

Get Cubes Meta Info

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /metrics/{urn}

#### GET
##### Summary

Get Metric by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### PUT
##### Summary

Update Connection by urn

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /connections/{urn}/test

#### GET
##### Summary

Test Connection

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /connections/{urn}/tables

#### GET
##### Summary

Get Connection's tables list

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

#### PUT
##### Summary

Create Cubes for all tables

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /connections/{urn}/tables/{table_name}

#### GET
##### Summary

Get table details

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |
| table_name | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| default | Successful | string |

### /connections/{urn}/tables/{table_name}/cube

#### GET
##### Summary

Get table cube schema

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| urn | path |  | Yes | string |
| table_name | path |  | Yes | string |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |

### /connections/test

#### POST
##### Summary

Test Credentials

##### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| body | body |  | No | object |

##### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | Successful | object |
