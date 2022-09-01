import { Metric } from "types";
import dayjs from "dayjs";

export const transformMetricToOverview = (metric: Metric) => {
    return [
        {
            label: "Name",
            value: metric.name,
        },
        {
            label: "Abbreviation",
            value: metric.abbreviation,
        },
        {
            label: "Description",
            value: metric.description || "",
        },
        {
            label: "Formula",
            value: "",
        },
        {
            label: "Labels",
            value: "",
        },
        {
            label: "Created By",
            value: "",
        },
        {
            label: "Creator Team",
            value: "",
        },
        {
            label: "Created On",
            value: dayjs(metric.createdAt).format("DD MMM YYYY,  HH:mm A"),
        },
        {
            label: "Last Updated By",
            value: "",
        },
        {
            label: "Last Updated On",
            value: dayjs(metric.updatedAt).format("DD MMM YYYY,  HH:mm A"),
        },
    ];
};
