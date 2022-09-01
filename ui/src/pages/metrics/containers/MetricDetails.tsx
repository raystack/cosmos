import { useCallback } from "react";
import { useParams } from "react-router";
import { DetailsLoader, Tabs, States } from "@odpf/apsara";

import Layout from "Layouts/AppLayout";
import useNetworkCall from "hooks/useNetworkCall";
import useTabChange from "hooks/useTabChange";

import { MetricResponse } from "types";
import { fetchMetric } from "api";

import ToolBar from "../components/Details.Toolbar";
import OverView from "../components/Details.Overview";
import Query from "../components/Details.Query";

import styles from "../styles/style.module.css";

interface MetricsProps {
    activePath?: string;
}

const CommingSoon = () => (
    <States
        type="info"
        title="Coming Soon!"
        subTitle="We are currently working on this feature. Soon, you will be able to enjoy it."
    />
);

export default function MetricDetails({ activePath }: MetricsProps) {
    const { urn } = useParams<{ urn: string }>();
    const { currentTab, handleTabChange } = useTabChange({ defaultActiveKey: "overview" });

    const memofetchMetric = useCallback(() => (urn ? fetchMetric(urn) : Promise.resolve()), [urn]);
    const { data: metric, isRequesting } = useNetworkCall<MetricResponse>(memofetchMetric);
    return (
        <Layout title="Metric Details" activePath={activePath}>
            <div className={styles.details}>
                {isRequesting || !metric ? (
                    <DetailsLoader />
                ) : (
                    <>
                        <ToolBar metric={metric?.data} />
                        <Tabs type="secondary" activeKey={currentTab} onChange={handleTabChange}>
                            <Tabs.TabPane key="overview" tab="Overview" className={styles.tabContent}>
                                <OverView metric={metric?.data} />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="monitoring" tab="Monitoring" className={styles.tabContent}>
                                <CommingSoon />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="query" tab="Query" className={styles.tabContent}>
                                <Query fields={metric?.data?.fields} />
                            </Tabs.TabPane>
                            <Tabs.TabPane key="history" tab="History" className={styles.tabContent}>
                                <CommingSoon />
                            </Tabs.TabPane>
                        </Tabs>
                    </>
                )}
            </div>
        </Layout>
    );
}
