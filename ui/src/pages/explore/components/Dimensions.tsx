import Switch from "@odpf/apsara/lib/esm/Switch";
import { Search, Text } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import { useState } from "react";
import { DimensionOption } from "../helpers";

interface DimensionsProps {
    dimensions?: DimensionOption[];
    selected?: string[];
    onChange?: (dimensions: string[]) => void | null;
}

export default function Dimensions({ dimensions = [], selected = [], onChange = () => null }: DimensionsProps) {
    const selectedDimensionsMap = selected.reduce((acc, dim) => ({ ...acc, [dim]: true }), {});
    const [dimensionsMap, setDimensionsMap] = useState<Record<string, boolean>>(selectedDimensionsMap);

    function onClick(key: string, value: boolean) {
        const newDimensonsMap = { ...dimensionsMap, [key]: value };
        setDimensionsMap(newDimensonsMap);
        const selectedDimensons = Object.keys(newDimensonsMap).reduce((acc, dimKey) => {
            if (newDimensonsMap[dimKey]) return [...acc, dimKey];
            return acc;
        }, selected);
        onChange(selectedDimensons);
    }

    return (
        <div>
            <Search></Search>
            <div className={styles.dimensionsList}>
                {dimensions.map((option) => {
                    return (
                        <div key={option.value} className={styles.dimensions}>
                            <Text size={11}>{option.label}</Text>
                            <Switch
                                size="small"
                                checked={dimensionsMap[option.value]}
                                onClick={(v) => onClick(option.value, v)}
                            ></Switch>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
