import { Segments } from "@odpf/apsara";
import { Metric } from "types";
import { transformMetricToOverview } from "../helpers";

interface OverviewProps {
    metric: Metric;
}

export default function Overview({ metric }: OverviewProps) {
    const rowData = transformMetricToOverview(metric);
    return (
        <Segments>
            <Segments.Segment title="General" rowData={rowData} />
        </Segments>
    );
}
