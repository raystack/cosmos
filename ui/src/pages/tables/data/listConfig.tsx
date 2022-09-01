import { Table } from "types";

interface getTablePropsArgs {
    onClick: (data: Table) => void;
}

export const getTableProps = ({ onClick }: getTablePropsArgs) => ({
    getColumnList: () => {
        return [
            {
                title: "Name",
                dataIndex: "tableId",
                key: "tableId",
            },
        ];
    },
    handleRowClick: (_e: any, rowIndexData: Table) => {
        onClick(rowIndexData);
    },
});

export const searchProps = {
    searchFields: ["tableId"],
};
