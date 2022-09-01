import { TCubeDimension, TCubeSegment } from "@cubejs-client/core";

export interface DimensionOption {
    label: string;
    value: string;
    dimension: TCubeDimension;
}

export interface SegmentOption {
    label: string;
    value: string;
    segment: TCubeSegment;
}

export function getDimensionsOptions(dimensions: TCubeDimension[], cube: string) {
    return dimensions.reduce((acc, dim) => {
        const { name, shortTitle } = dim;
        const [cubeName] = name.split(".");
        if (cubeName === cube) {
            const isDuplicate = acc.find((e) => e.value === name);
            return isDuplicate ? acc : [...acc, { label: shortTitle, value: name, dimension: dim }];
        }
        return acc;
    }, [] as DimensionOption[]);
}

export function getSegmentOptions(segments: TCubeSegment[], cube: string) {
    return segments.reduce((acc, dim) => {
        const { name, shortTitle } = dim;
        const [cubeName] = name.split(".");
        if (cubeName === cube) {
            const isDuplicate = acc.find((e) => e.value === name);
            return isDuplicate ? acc : [...acc, { label: shortTitle, value: name, segment: dim }];
        }
        return acc;
    }, [] as SegmentOption[]);
}
