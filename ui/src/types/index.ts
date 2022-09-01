import { Filter, Query } from "@cubejs-client/core";

export interface CreateConnectionPayload {
    name: string;
    type: string;
    credentials: Record<string, string | number>;
}
export interface Connection extends Omit<CreateConnectionPayload, "credentials"> {
    urn: string;
    credentials: string;
    createdAt: string;
    updatedAt: string;
}

export interface ConnectionResponse {
    data: Connection;
}

export interface TestResponse {
    data: "Success" | "Failure";
}

export interface ConnectionsResponse {
    data: Connection[];
}

export interface Table {
    urn: string;
    connection: string;
    tableId: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface TablesResponse {
    data: Table[];
}

interface IFieldsObject {
    name: string;
    type: string | number;
    description?: string;
}

export interface ConnectionFieldsResponse {
    data: [
        {
            name: string;
            fields: Array<IFieldsObject>;
        },
    ];
}

export interface UpdateTablePayload {
    connection?: string;
    tableId?: string;
    content?: string;
}

export interface Metric {
    name: string;
    abbreviation: string;
    description?: string;
    meta?: Record<string, string>;
    labels?: Record<string, string>;
    fields: {
        measures: string[];
        dimensions: string[];
        filters: Filter[];
    };
    urn: string;
    createdAt: string;
    updatedAt: string;
}

export interface MetricsResponse {
    data: Metric[];
}

export interface MetricResponse {
    data: Metric;
}

export interface CreateMetricPayload {
    name: string;
    abbreviation: string;
    description?: string;
    meta?: Record<string, string>;
    labels?: Record<string, string>;
    fields: {
        measures: string[];
        dimensions: string[];
        filters: Filter[];
    };
}

export interface FormData {
    query: Query;
    name: string;
    abbreviation: string;
    description?: string;
    labels: Array<{ key: string; value: string }>;
}
