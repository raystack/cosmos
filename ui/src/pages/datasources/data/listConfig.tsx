import { Link } from "react-router-dom";
import { Text } from "@odpf/apsara";
export const filterProps = {
    filterFieldList: [
        {
            name: "Type",
            data: ["Postgres", "Bigquery", "MySQL"].map((d) => {
                return { label: d, value: d.toLowerCase() };
            }),
            slug: "type",
        },
    ],
};
export const tableProps = {
    getColumnList: (path: string) => {
        return [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
                // eslint-disable-next-line react/display-name
                render: (text: string, record: { urn: string }) => {
                    return (
                        <Link to={`${path}/${record.urn}`}>
                            <Text>{text}</Text>
                        </Link>
                    );
                },
            },
            {
                title: "Type",
                dataIndex: "type",
                key: "type",
            },
            {
                title: "Teams",
                dataIndex: "teams",
                key: "teams",
            },
            {
                title: "Creator",
                dataIndex: "creator",
                key: "creator",
            },
        ];
    },
};

export const searchProps = {
    searchFields: ["name"],
};
