import { Link } from "react-router-dom";
import { Text } from "@odpf/apsara";

export const filterProps = {
    filterFieldList: [],
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
                title: "Abbreviation",
                dataIndex: "abbreviation",
                key: "abbreviation",
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
    searchFields: ["name", "abbreviation"],
};
