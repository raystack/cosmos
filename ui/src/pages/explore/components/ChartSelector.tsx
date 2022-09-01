import { ChartType } from "@cubejs-client/core";
import { Button } from "@odpf/apsara";
import { IconName } from "@odpf/apsara/lib/cjs/Icon/Icon";

import clsx from "clsx";
import styles from "../styles/style.module.css";

const charts: { name: ChartType; icon: IconName }[] = [
    { name: "line", icon: "barChart" },
    { name: "area", icon: "areaChart" },
    { name: "bar", icon: "barChart" },
    { name: "pie", icon: "pieChart" },
    { name: "table", icon: "tableChart" },
    { name: "number", icon: "placeholder" },
];

interface ChartSelectorProps {
    selected?: string;
    onClick: (chart: ChartType) => void;
}

export default function ChartSelector({ selected, onClick }: ChartSelectorProps) {
    return (
        <div className={styles.chartSelector}>
            {charts.map((c) => {
                return (
                    <Button
                        key={c.name}
                        iconProps={{ name: c.icon }}
                        className={clsx(styles.chartSelectorBtn, {
                            [styles.chartSelectorBtnActive]: c.name === selected,
                        })}
                        tooltipProps={{
                            message: c.name,
                        }}
                        onClick={() => onClick(c.name)}
                    ></Button>
                );
            })}
        </div>
    );
}
