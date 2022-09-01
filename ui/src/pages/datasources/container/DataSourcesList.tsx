import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { ContentLayout, Listing, Button, Text } from "@odpf/apsara";
import Layout from "Layouts/AppLayout";
import styles from "./style.module.css";
import { fetchConnections } from "api";
import useNetworkCall from "hooks/useNetworkCall";
import { tableProps, filterProps, searchProps } from "../data/listConfig";
import { ConnectionsResponse } from "types";

interface ConnectionsProps {
    activePath?: string;
}

export default function Connections({ activePath }: ConnectionsProps) {
    const { path } = useRouteMatch();
    const { data, isRequesting } = useNetworkCall<ConnectionsResponse>(fetchConnections);
    return (
        <Layout title="Data Sources" activePath={activePath}>
            <ContentLayout className={styles.contentLayout}>
                <Listing
                    list={data?.data}
                    loading={isRequesting}
                    tableProps={tableProps}
                    filterProps={filterProps}
                    searchProps={searchProps}
                    resourcePath={path}
                ></Listing>
                <div className={styles.rightSidebarWrapper}>
                    <Link to={`${path}/create`}>
                        <Button size="large" type="primary" className={styles.btnCreate}>
                            Add New Data Source
                        </Button>
                    </Link>
                    <Text size={12}>
                        Connection helps you import data from your source to expore insights and to dig into data
                        points.
                    </Text>
                </div>
            </ContentLayout>
        </Layout>
    );
}
