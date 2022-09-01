import { TimeDimensionGranularity } from "@cubejs-client/core";
import { TimeDimensionUpdater, TimeDimensionWithExtraFields } from "@cubejs-client/react";
import { Select } from "@odpf/apsara";
import { DimensionOption } from "../helpers";
import styles from "../styles/style.module.css";

const dateRanges = [
    { label: "All time", value: "All time" },
    { label: "Today", value: "Today" },
    { label: "Yesterday", value: "Yesterday" },
    { label: "This week", value: "This week" },
    { label: "This month", value: "This month" },
    { label: "This year", value: "This year" },
];

interface TimeSelectorProps {
    dimensions?: DimensionOption[];
    timeDimensions: (TimeDimensionWithExtraFields & { index: number })[];
    updateTimeDimensions: TimeDimensionUpdater;
}

interface TimeSelectorRowProps {
    dimensions?: DimensionOption[];
    td: TimeDimensionWithExtraFields & { index: number };
    updateTimeDimensions: TimeDimensionUpdater;
}

function TimeSelectorRow({ dimensions, td, updateTimeDimensions }: TimeSelectorRowProps) {
    function onChange(_value: string, valueOptions: any) {
        const { dimension }: DimensionOption = valueOptions;
        const newTd = { ...td, dimension };
        updateTimeDimensions.update(td, newTd);
    }

    function onGranularityChange(value: any) {
        const granularity: TimeDimensionGranularity = value;
        const newTd = { ...td, granularity };
        updateTimeDimensions.update(td, newTd);
    }

    function onDateRangeChange(value: string) {
        const dateRange = value === "All time" ? undefined : value;
        const newTd = { ...td, dateRange };
        updateTimeDimensions.update(td, newTd);
    }

    const granularities = td.dimension.granularities.map((g) => ({ label: g.title, value: g.name }));
    const dateRange = (td.dateRange as string) || "All time";

    return (
        <>
            <Select options={dimensions} value={td.dimension.name} onChange={onChange} />
            <Select options={dateRanges} value={dateRange} onChange={onDateRangeChange} />
            <Select options={granularities} value={td.granularity} onChange={onGranularityChange} />
        </>
    );
}

export default function DateSelector({ dimensions, timeDimensions = [], updateTimeDimensions }: TimeSelectorProps) {
    return (
        <div className={styles.timeSelectorWrapper}>
            {timeDimensions.map((td) => (
                <TimeSelectorRow
                    td={td}
                    dimensions={dimensions}
                    key={td.index}
                    updateTimeDimensions={updateTimeDimensions}
                />
            ))}
        </div>
    );
}
