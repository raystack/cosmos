import Layout from "Layouts/AppLayout";
import { Listing } from "@odpf/apsara";
import styles from "../styles/style.module.css";
import useNetworkCall from "hooks/useNetworkCall";
import { fetchTables } from "api";
import { searchProps, getTableProps } from "../data/listConfig";
import Editor from "../components/editor";
import { useState } from "react";
import { TablesResponse, Table } from "types";

interface TablesProps {
    activePath?: string;
}

export default function Tables({ activePath }: TablesProps) {
    const [selectedTable, setSelelctedTable] = useState<Table | null>(null);
    const { data, isRequesting } = useNetworkCall<TablesResponse>(fetchTables);
    const tableProps = getTableProps({ onClick: setSelelctedTable });
    return (
        <Layout title="Tables" activePath={activePath}>
            <div className={styles.contentLayout}>
                <Listing
                    className={styles.list}
                    list={data?.data}
                    loading={isRequesting}
                    tableProps={tableProps}
                    searchProps={searchProps}
                ></Listing>
                <Editor table={selectedTable} />
            </div>
        </Layout>
    );
}
