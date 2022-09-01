import { useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";

import Layout from "Layouts/AppLayout";
import { QueryBuilder, QueryBuilderRenderProps } from "@cubejs-client/react";
import { ChartType, Query } from "@cubejs-client/core";
import { Tabs } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import { cubejsApi } from "api";

import { getDimensionsOptions, getSegmentOptions } from "../helpers";

import Measures from "../components/Measures";
import Dimensions from "../components/Dimensions";
import Filters from "../components/Filters";
import ChartSelector from "../components/ChartSelector";
import TimeSelector from "../components/TimeSelector";
import ChartRenderer from "../components/ChartRenderer";
import Segments from "../components/Segments";

interface ExploreProps {
    activePath?: string;
}

function ExploreQueryBuilder({
    availableMeasures,
    availableDimensions,
    availableTimeDimensions,
    filters,
    timeDimensions,
    chartType,
    query,
    validatedQuery,
    updateChartType,
    updateQuery,
    updateFilters,
    updateTimeDimensions,
    availableSegments,
}: QueryBuilderRenderProps) {
    const selectedMeasure = query.measures?.[0];
    const [selectedCube] = selectedMeasure ? selectedMeasure.split(".") : [""];

    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const search = qs.stringify({ query: validatedQuery });
        history.replace({
            ...location,
            search,
        });
    }, [validatedQuery]);

    function onMeasureSelect(measure: string) {
        updateQuery({ measures: [measure], dimensions: [], filters: [] });
    }

    function onDimensionsChange(dimensions: string[]) {
        updateQuery({ ...query, dimensions });
    }

    function onSegmentsChange(segments: string[]) {
        updateQuery({ ...query, segments });
    }

    function onChartChange(chart: ChartType) {
        updateChartType(chart);
    }

    const dimensionsOptions = useMemo(() => getDimensionsOptions(availableDimensions, selectedCube), [
        selectedCube,
        availableDimensions,
    ]);

    const segmentOptions = useMemo(() => getSegmentOptions(availableSegments, selectedCube), [
        selectedCube,
        availableSegments,
    ]);

    const timeDimensionsOptions = useMemo(() => getDimensionsOptions(availableTimeDimensions, selectedCube), [
        selectedCube,
        availableTimeDimensions,
    ]);

    return (
        <div className={styles.explorelayout}>
            <div className={styles.leftPanel}>
                <Measures measures={availableMeasures} onSelect={onMeasureSelect} selected={selectedMeasure} />
                {selectedCube ? (
                    <Tabs type="secondary" className={styles.leftPanelTabs} size="xs">
                        <Tabs.TabPane key="dimensions" tab="Dimensions">
                            <Dimensions
                                dimensions={dimensionsOptions}
                                onChange={onDimensionsChange}
                                selected={query.dimensions}
                            />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="segments" tab="Segments">
                            <Segments segments={segmentOptions} onChange={onSegmentsChange} />
                        </Tabs.TabPane>
                    </Tabs>
                ) : null}
            </div>
            <div className={styles.rightPanel}>
                <Filters dimensions={dimensionsOptions} updateFilters={updateFilters} filters={filters} />
                <div className={styles.chartTimeWrapper}>
                    <ChartSelector selected={chartType} onClick={onChartChange} />
                    <TimeSelector
                        dimensions={timeDimensionsOptions}
                        timeDimensions={timeDimensions}
                        updateTimeDimensions={updateTimeDimensions}
                    />
                </div>
                <ChartRenderer query={validatedQuery} chartType={chartType} />
            </div>
        </div>
    );
}

export default function Explore({ activePath }: ExploreProps) {
    const location = useLocation();
    const defaultQuery = { order: {}, measures: [] };
    const { query } = qs.parse(location.search, { ignoreQueryPrefix: true });
    return (
        <Layout title="Explore" activePath={activePath}>
            <QueryBuilder
                defaultQuery={(query as Query) || defaultQuery}
                cubejsApi={cubejsApi}
                render={(renderProps) => <ExploreQueryBuilder {...renderProps} />}
            ></QueryBuilder>
        </Layout>
    );
}
