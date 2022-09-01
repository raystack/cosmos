import { BinaryOperator, TCubeDimension, UnaryOperator } from "@cubejs-client/core";
import { FilterUpdateFields, FilterUpdater, FilterWithExtraFields } from "@cubejs-client/react";
import { Button, Text, Shadows, Search, Input, Icon, Select } from "@odpf/apsara";
import { useState } from "react";
import { DimensionOption } from "../helpers";
import styles from "../styles/style.module.css";
import { InputNumber } from "antd";

interface FilterProps {
    dimensions: DimensionOption[];
    updateFilters: FilterUpdater;
    filters: FilterWithExtraFields[];
}

interface FilterRowProps {
    updateFilters: FilterUpdater;
    filter: FilterWithExtraFields & { index: number };
}

type Operator = BinaryOperator | UnaryOperator;

function MultiInput({ onChange }: { onChange: (values: string[]) => void }) {
    function onSelectChange(values: string[]) {
        onChange(values);
    }
    return <Select className={styles.filtersRowInput} onChange={onSelectChange} mode="tags" notFoundContent={null} />;
}

function NumberInput({ onChange }: { onChange: (values: string[]) => void }) {
    function onSelectChange(values: string) {
        onChange([values]);
    }
    return <InputNumber className={styles.filtersRowInput} stringMode={true} onChange={onSelectChange} />;
}

function BoolInput({ onChange, value }: { value?: string; onChange: (value: string[]) => void }) {
    function onSelectChange(value: string) {
        onChange([value]);
    }

    const options = [
        { value: "false", label: "False" },
        { value: "true", label: "True" },
    ];
    return <Select options={options} className={styles.filtersRowInput} onChange={onSelectChange} value={value} />;
}

function FilterRow({ updateFilters, filter }: FilterRowProps) {
    const operatorsOptions = filter.operators.map((o) => ({ label: o.title, value: o.name }));
    const [operator, setOperator] = useState<Operator>(operatorsOptions[0].value as Operator);

    function onOperatorChange(o: string) {
        const operator = o as Operator;
        setOperator(operator);
        const newFilter = { ...filter, operator };
        updateFilters.update(filter, newFilter);
    }

    function onValueChange(values: string[]) {
        const op = filter.dimension.type === "boolean" ? "equals" : operator;
        const newFilter = { ...filter, operator: op, values };
        updateFilters.update(filter, newFilter);
    }

    function onRemove() {
        updateFilters.remove(filter);
    }

    return (
        <div className={styles.filterRow}>
            <Input
                value={filter.dimension.shortTitle || filter.dimension.title}
                disabled
                className={styles.filtersRowInput}
            />
            {filter.dimension.type !== "boolean" ? (
                <Select
                    options={operatorsOptions}
                    defaultValue={operator}
                    className={styles.filtersRowInput}
                    onChange={onOperatorChange}
                ></Select>
            ) : null}
            {filter.dimension.type === "string" ? <MultiInput onChange={onValueChange} /> : null}
            {filter.dimension.type === "number" ? <NumberInput onChange={onValueChange} /> : null}
            {filter.dimension.type === "boolean" ? (
                <BoolInput onChange={onValueChange} value={filter.values?.[0]} />
            ) : null}
            <Icon name="deleteFilled" onClick={onRemove} />
        </div>
    );
}

interface FilterListProps {
    toggleDropDown: (value: boolean) => void;
    dimensions: DimensionOption[];
    addFilter: (member: FilterUpdateFields) => void;
    filters: FilterWithExtraFields[];
}

function FilterList({ toggleDropDown, dimensions, addFilter, filters = [] }: FilterListProps) {
    function onClick(dim: TCubeDimension, isAlreadyApplied: boolean) {
        toggleDropDown(false);
        if (!isAlreadyApplied) {
            // @ts-ignore
            addFilter({ dimension: dim });
        }
    }

    return (
        <div className={styles.filtersListWarpper} style={{ boxShadow: Shadows[40] }}>
            <Search className={styles.filtersListSearch} />
            <div className={styles.filtersList}>
                {dimensions.map((d) => {
                    const isAlreadyApplied = !!filters.find((f) => f.dimension.name === d.value);
                    return (
                        <div
                            key={d.value}
                            className={styles.filtersListItem}
                            onClick={() => onClick(d.dimension, isAlreadyApplied)}
                        >
                            <Text size={12}>{d.label}</Text>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Filters({ dimensions, updateFilters, filters = [] }: FilterProps) {
    const [showDropDown, setShowDropDown] = useState(false);
    return (
        <div className={styles.filtersPannel}>
            <div className={styles.filtersTop}>
                <Text size="11" strong>
                    Filters
                </Text>
                <div className={styles.addFilterWrapper}>
                    <Button
                        iconProps={{ name: "add", size: 16 }}
                        type="barebone"
                        size="small"
                        className={styles.addFilterBtn}
                        onClick={() => setShowDropDown(!showDropDown)}
                    >
                        Add Filter
                    </Button>
                    {showDropDown ? (
                        <FilterList
                            toggleDropDown={setShowDropDown}
                            dimensions={dimensions}
                            filters={filters}
                            addFilter={updateFilters.add}
                        />
                    ) : null}
                </div>
            </div>
            <div className={styles.filtersRowWrapper}>
                {filters.map((filter) => {
                    return (
                        <FilterRow
                            updateFilters={updateFilters}
                            key={filter.dimension.name}
                            // @ts-ignore
                            filter={filter}
                        />
                    );
                })}
            </div>
        </div>
    );
}
