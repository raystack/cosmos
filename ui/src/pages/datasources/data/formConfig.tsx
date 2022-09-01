import { useEffect, useState } from "react";
import { Widget } from "@odpf/apsara/lib/cjs/FormBuilder/FormBuilderField";
import { ConnectionResponse, ConnectionFieldsResponse } from "types";

export const defaultInitialValues = {
    type: "bigquery",
};

const emptyFn = () => ({});

const NAME_FIELD = {
    name: "name",
    widget: "input" as Widget,
    label: "Name",
};
const TYPE_FIELDS = (onDBChange: (e: any) => void = emptyFn, type = "", isEdit = false) => {
    return {
        name: "type",
        widget: "radio" as Widget,
        options: [
            {
                label: "BigQuery",
                value: "bigquery",
            },
            {
                label: "Postgres",
                value: "postgres",
            },
            {
                label: "Mysql",
                value: "mysql",
            },
        ].filter((option) => !isEdit || (isEdit && option.value === type)),
        onChange: onDBChange,
    };
};

function getInitialValues(connection?: ConnectionResponse | null) {
    if (!connection) return defaultInitialValues;
    return { ...defaultInitialValues, ...connection.data };
}

export default function useFormConfig(
    connectionFields?: ConnectionFieldsResponse | null,
    connection?: ConnectionResponse | null,
    isEdit = false,
) {
    const initialValues = getInitialValues(connection);
    const [selectedDB, setSelectedDB] = useState(initialValues.type);
    const { fields = [] } = connectionFields?.data?.find((d) => d.name === selectedDB) || {};
    function onDBChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSelectedDB(e.target.value);
    }
    useEffect(() => {
        setSelectedDB(initialValues.type);
    }, [initialValues.type]);
    const typeField = TYPE_FIELDS(onDBChange, initialValues.type, isEdit);
    const credentialsFields = fields.map((f) => {
        return {
            name: ["credentials", f.name],
            widget: "input" as Widget,
            label: f.name,
        };
    });

    const formConfig = {
        fields: [typeField, NAME_FIELD, ...credentialsFields],
    };
    return { formConfig, initialValues };
}
