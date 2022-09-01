import Layout from "Layouts/AppLayout";
import { Link, useRouteMatch } from "react-router-dom";
import { ContentLayout, Listing, Button, Text } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import useNetworkCall from "hooks/useNetworkCall";
import { fetchMetrics } from "api";
import { tableProps, filterProps, searchProps } from "../data/listConfig";
import { MetricsResponse } from "types";

interface MetricsProps {
    activePath?: string;
}

export default function Metrics({ activePath }: MetricsProps) {
    const { path } = useRouteMatch();
    const { data, isRequesting } = useNetworkCall<MetricsResponse>(fetchMetrics);

    return (
        <Layout title="Metrics" activePath={activePath}>
            <ContentLayout className={styles.contentLayout}>
                <Listing
                    loading={isRequesting}
                    list={data?.data}
                    tableProps={tableProps}
                    filterProps={filterProps}
                    searchProps={searchProps}
                    resourcePath={path}
                ></Listing>
                <div className={styles.rightSidebarWrapper}>
                    <Link to={`${path}/create`}>
                        <Button size="large" type="primary" className={styles.btnCreate}>
                            Define New Metric
                        </Button>
                    </Link>
                    <Text size={12}>
                        We are guilty of performing shallow work all day and call it a good day’s work. This is a
                        placehoder for final content.
                    </Text>
                </div>
            </ContentLayout>
        </Layout>
    );
}
