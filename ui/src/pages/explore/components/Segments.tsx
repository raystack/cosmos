import Switch from "@odpf/apsara/lib/esm/Switch";
import { Search, Text } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import { useState } from "react";
import { SegmentOption } from "../helpers";

interface SegmentsProps {
    segments?: SegmentOption[];
    onChange?: (segments: string[]) => void | null;
}

export default function Segments({ segments = [], onChange = () => null }: SegmentsProps) {
    const [segmentsMap, setSegmentsMap] = useState<Record<string, boolean>>({});

    function onClick(key: string, value: boolean) {
        const newSegmentsMap = { ...segmentsMap, [key]: value };
        setSegmentsMap(newSegmentsMap);
        const selectedSegments = Object.keys(newSegmentsMap).reduce((acc, key) => {
            if (newSegmentsMap[key]) return [...acc, key];
            return acc;
        }, [] as Array<string>);
        onChange(selectedSegments);
    }

    return (
        <div>
            <Search></Search>
            <div className={styles.dimensionsList}>
                {segments.map((option) => {
                    return (
                        <div key={option.value} className={styles.dimensions}>
                            <Text size={11}>{option.label}</Text>
                            <Switch
                                size="small"
                                checked={segmentsMap[option.value]}
                                onClick={(v) => onClick(option.value, v)}
                            ></Switch>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
