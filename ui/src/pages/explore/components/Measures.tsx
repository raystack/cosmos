import { TCubeMeasure } from "@cubejs-client/core";
import { Select } from "@odpf/apsara";
import styles from "../styles/style.module.css";

interface MeasuresProps {
    measures?: TCubeMeasure[];
    onSelect?: (measure: string) => void | null;
    selected?: string;
}

export default function Measures({ measures = [], selected, onSelect = () => null }: MeasuresProps) {
    const measuresOptions = measures.map((m) => ({ label: m.title, value: m.name }));

    function onMeasureSelect(value: string) {
        onSelect(value);
    }

    return (
        <Select
            className={styles.select}
            options={measuresOptions}
            placeholder="Select a metric to measure"
            onSelect={onMeasureSelect}
            showSearch
            value={selected}
        ></Select>
    );
}
