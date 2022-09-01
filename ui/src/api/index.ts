import cubejs from "@cubejs-client/core";
import {
    ConnectionResponse,
    ConnectionsResponse,
    CreateConnectionPayload,
    TablesResponse,
    UpdateTablePayload,
    TestResponse,
    MetricsResponse,
    MetricResponse,
    CreateMetricPayload,
} from "types";

const ENIGMA_URL = process.env.REACT_APP_ENIGMA_URL || "http://localhost:8000";
const CUBEJS_TOKEN = process.env.REACT_APP_CUBEJS_TOKEN || "";
const CUBEJS_API_URL = `${ENIGMA_URL}/cube/cubejs-api/v1`;

export const cubejsApi = cubejs(CUBEJS_TOKEN, {
    apiUrl: CUBEJS_API_URL,
});

export async function fetchConnectionFields() {
    return fetch(`${ENIGMA_URL}/api/connections-fields`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function fetchConnections(): Promise<ConnectionsResponse> {
    return fetch(`${ENIGMA_URL}/api/connections`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function createConnection(payload: CreateConnectionPayload): Promise<ConnectionResponse> {
    return fetch(`${ENIGMA_URL}/api/connections`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function testConnection(payload: CreateConnectionPayload): Promise<TestResponse> {
    return fetch(`${ENIGMA_URL}/api/connections/test`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function updateConnection(urn: string, payload: CreateConnectionPayload): Promise<ConnectionResponse> {
    return fetch(`${ENIGMA_URL}/api/connections/${urn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function createCubes(urn: string): Promise<unknown> {
    return fetch(`${ENIGMA_URL}/api/connections/${urn}/tables`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: "",
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function fetchConnection(urn: string): Promise<ConnectionResponse> {
    return fetch(`${ENIGMA_URL}/api/connections/${urn}`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function fetchTables(): Promise<TablesResponse> {
    return fetch(`${ENIGMA_URL}/api/cubes`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function updateTable(urn: string, payload: UpdateTablePayload): Promise<TablesResponse> {
    return fetch(`${ENIGMA_URL}/api/cubes/${urn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function fetchMetrics(): Promise<MetricsResponse> {
    return fetch(`${ENIGMA_URL}/api/metrics`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function fetchMetric(urn: string): Promise<MetricResponse> {
    return fetch(`${ENIGMA_URL}/api/metrics/${urn}`)
        .then((res) => res.json())
        .catch((err) => {
            throw err;
        });
}

export async function createMetric(payload: CreateMetricPayload): Promise<MetricResponse> {
    return fetch(`${ENIGMA_URL}/api/metrics`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}

export async function updateMetric(urn: string, payload: CreateMetricPayload): Promise<MetricResponse> {
    return fetch(`${ENIGMA_URL}/api/metrics/${urn}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) return data;
            const message = data.message || `Error ${res.status}`;
            throw new Error(message);
        })
        .catch((err) => {
            throw err;
        });
}
