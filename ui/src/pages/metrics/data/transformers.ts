import { CreateMetricPayload, FormData, Metric } from "types";

export function formDataToPayload(data: FormData): CreateMetricPayload {
    const labels =
        data?.labels?.reduce((acc, l) => {
            acc[l.key] = l.value;
            return acc;
        }, {} as Record<string, string>) || {};

    const { measures = [], dimensions = [], filters = [] } = data?.query || {};
    return {
        name: data.name,
        abbreviation: data.abbreviation,
        description: data.description,
        labels: labels,
        fields: {
            measures,
            dimensions,
            filters,
        },
    };
}

export function payloadToFormData(metric: Metric): FormData {
    const labels = Object.keys(metric?.labels || {}).map((key) => ({ key: key, value: metric?.labels?.[key] || "" }));
    const { measures = [], dimensions = [], filters = [] } = metric?.fields || {};
    return {
        name: metric.name,
        abbreviation: metric.abbreviation,
        description: metric.description,
        labels: labels,
        query: {
            measures,
            dimensions,
            filters,
        },
    };
}
