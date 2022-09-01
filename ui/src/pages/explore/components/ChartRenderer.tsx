import { ChartPivotRow, ChartType, Query, ResultSet } from "@cubejs-client/core";
import { useCubeQuery } from "@cubejs-client/react";
import { cubejsApi } from "api";
import { VTable, States, Text, Colors } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import {
    CartesianGrid,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    LineChart,
    Line,
} from "recharts";
import dayjs from "dayjs";
import { CategoricalChartProps } from "recharts/types/chart/generateCategoricalChart";
interface ChartRenderer {
    query: Query;
    chartType?: ChartType;
}

function TableRenderer({ resultSet }: { resultSet: ResultSet }) {
    const items = resultSet.tablePivot();
    const columns = resultSet.tableColumns();
    return <VTable columns={columns} items={items} />;
}

function NumberRenderer({ resultSet }: { resultSet: ResultSet }) {
    const seriesNames = resultSet.seriesNames();
    const totalRow = resultSet.totalRow();
    return (
        <div className={styles.numberRenderer}>
            {seriesNames.map((s) => (
                <div key={s.key} className={styles.numberWrapper}>
                    <Text size={36}>{totalRow[s.key]}</Text>
                    <Text>{s.title}</Text>
                </div>
            ))}
        </div>
    );
}

const numberFormatter = (item: any) => item;
const dateFormatter = (date: string) => dayjs(date).format("DD MMM YY");
const xAxisFormatter = (item: any) => (dayjs(item).isValid() ? dateFormatter(item) : item);

interface ChartBaseProps {
    data: ChartPivotRow[];
    children: React.ReactNode;
    ChartComponent: React.ComponentType<CategoricalChartProps>;
}

function ChartBase({ data, ChartComponent, children }: ChartBaseProps) {
    return (
        <ResponsiveContainer width="100%" height={500} className={styles.chartWrapper}>
            <ChartComponent data={data}>
                <XAxis axisLine={false} tickLine={false} tickFormatter={xAxisFormatter} dataKey="x" />
                <YAxis axisLine={false} tickLine={false} tickFormatter={numberFormatter} />
                <CartesianGrid vertical={false} />
                <Tooltip labelFormatter={dateFormatter} formatter={numberFormatter} />
                {children}
            </ChartComponent>
        </ResponsiveContainer>
    );
}

function LineChartRenderer({ resultSet }: { resultSet: ResultSet }) {
    const data = resultSet.chartPivot();
    const seriesNames = resultSet.seriesNames();
    return (
        <ChartBase data={data} ChartComponent={LineChart}>
            {seriesNames.map((series) => (
                <Line
                    dot={false}
                    activeDot={{ stroke: Colors.primary[400], strokeWidth: 2, r: 4 }}
                    key={series.key}
                    dataKey={series.key}
                    name={series.title}
                    stroke={Colors.primary[400]}
                />
            ))}
        </ChartBase>
    );
}

function AreaChartRenderer({ resultSet }: { resultSet: ResultSet }) {
    const data = resultSet.chartPivot();
    const seriesNames = resultSet.seriesNames();
    return (
        <ChartBase data={data} ChartComponent={AreaChart}>
            {seriesNames.map((series) => (
                <Area
                    activeDot={{ stroke: Colors.primary[400], strokeWidth: 2, r: 4 }}
                    key={series.key}
                    dataKey={series.key}
                    name={series.title}
                    stroke={Colors.primary[400]}
                    fill={Colors.primary[200]}
                />
            ))}
        </ChartBase>
    );
}

function BarChartRenderer({ resultSet }: { resultSet: ResultSet }) {
    const data = resultSet.chartPivot();
    const seriesNames = resultSet.seriesNames();
    return (
        <ChartBase data={data} ChartComponent={BarChart}>
            {seriesNames.map((series) => (
                <Bar key={series.key} dataKey={series.key} name={series.title} fill={Colors.primary[400]} />
            ))}
        </ChartBase>
    );
}

function PieChartRenderer({ resultSet }: { resultSet: ResultSet }) {
    const colors = Object.values(Colors.primary);
    const colorsLength = colors.length;
    return (
        <ResponsiveContainer width="100%" height={500} className={styles.chartWrapper}>
            <PieChart>
                <Pie
                    isAnimationActive={false}
                    data={resultSet.chartPivot()}
                    nameKey="x"
                    dataKey={resultSet.seriesNames()[0].key}
                >
                    {resultSet.chartPivot().map((e, index) => {
                        return <Cell key={index} fill={colors[index % colorsLength]} />;
                    })}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default function ChartRenderer({ query, chartType }: ChartRenderer) {
    const { resultSet, isLoading, error, progress } = useCubeQuery(query, { cubejsApi });

    if (isLoading) {
        return (
            <div className={styles.chartRenderer}>
                <States iconProps={{ name: "placeholder", size: 72 }} title="Loading" subTitle={progress?.stage} />
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.chartRenderer}>
                <States type="error" subTitle={error.toString()} />
            </div>
        );
    }

    return resultSet ? (
        <div className={styles.chartRenderer}>
            {chartType === "table" ? <TableRenderer resultSet={resultSet} /> : null}
            {chartType === "number" ? <NumberRenderer resultSet={resultSet} /> : null}
            {chartType === "pie" ? <PieChartRenderer resultSet={resultSet} /> : null}
            {chartType === "area" ? <AreaChartRenderer resultSet={resultSet} /> : null}
            {chartType === "line" ? <LineChartRenderer resultSet={resultSet} /> : null}
            {chartType === "bar" ? <BarChartRenderer resultSet={resultSet} /> : null}
        </div>
    ) : null;
}
