import { useCallback, useState, useEffect } from "react";
import { Drawer, Header, FormBuilder, Button, States } from "@odpf/apsara";
import { goBackOrReplace, removePath } from "utils";
import { useHistory, useRouteMatch, useParams } from "react-router";
import style from "./style.module.css";
import {
    fetchConnectionFields,
    createConnection,
    fetchConnection,
    updateConnection,
    testConnection,
    createCubes,
} from "api";
import useNetworkCall from "hooks/useNetworkCall";
import useFormConfig from "../data/formConfig";
import { ConnectionResponse, ConnectionFieldsResponse, CreateConnectionPayload } from "types";
import { STATE_MESSAGES } from "../data/messages";

interface DataSourceCreateFormProps {
    onCancel: () => void;
    isEdit?: boolean;
    urn?: string;
}

type STATES = keyof typeof STATE_MESSAGES;

interface StateScreenProps {
    state?: STATES;
    type?: "loading" | "success";
}

const StateScreen = ({ state = "loading", type = "loading" }: StateScreenProps) => (
    <States type={type} title={STATE_MESSAGES[state].title} subTitle={STATE_MESSAGES[state].subTitle} />
);

const ErrorState = ({ error }: { error: Error }) => <States type="error" subTitle={error.message} />;

function DataSourceCreateForm({ onCancel, isEdit, urn }: DataSourceCreateFormProps) {
    const [form] = FormBuilder.useForm();
    const [state, setState] = useState<STATES>("loading");
    const memoFetchConnection = useCallback(() => (urn ? fetchConnection(urn) : Promise.resolve()), [urn]);
    const { data: connection } = useNetworkCall<ConnectionResponse>(memoFetchConnection);
    const { data: connectionFields } = useNetworkCall<ConnectionFieldsResponse>(fetchConnectionFields);
    const { formConfig, initialValues } = useFormConfig(connectionFields, connection, isEdit);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [successResponse, setSuccessResponse] = useState<ConnectionResponse | null>(null);

    async function createDataSource(data: CreateConnectionPayload) {
        setState("test");
        const testResult = await testConnection(data);
        if (testResult.data === "Failure") {
            throw new Error("Not able to test connection");
        }
        setState("createDataSource");
        const dataSource = await createConnection(data);
        setState("createCubes");
        await createCubes(dataSource.data.urn);
        setState("createSuccess");
        return dataSource;
    }

    async function updateDataSource(urn: string, data: CreateConnectionPayload) {
        setState("test");
        const testResult = await testConnection(data);
        if (testResult.data === "Failure") {
            throw new Error("Not able to test connection");
        }
        setState("updateDataSource");
        const dataSource = await updateConnection(urn, data);
        setState("updateSuccess");
        return dataSource;
    }

    async function onSubmit() {
        const data = form.getFieldsValue(true);
        try {
            setLoading(true);
            const dataSource = isEdit && urn ? await updateDataSource(urn, data) : await createDataSource(data);
            setSuccessResponse(dataSource);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => form.resetFields(), [form, initialValues]);

    return error ? (
        <ErrorState error={error} />
    ) : loading ? (
        <StateScreen state={state} type="loading" />
    ) : successResponse ? (
        <StateScreen state={state} type="success" />
    ) : (
        <FormBuilder className={style.createForm} form={form} initialValues={initialValues} onFinish={onSubmit}>
            <FormBuilder.Items meta={formConfig} form={form} />
            <div className={style.footerBtns}>
                <Button size="large" type="primary" className={style.footerBtn} onClick={() => form.submit()}>
                    {isEdit ? "Save" : "Add Data Source"}
                </Button>
                <Button size="large" className={style.footerBtn} onClick={onCancel}>
                    Cancel
                </Button>
            </div>
        </FormBuilder>
    );
}

export default function DataSourceCreateDrawer({ isEdit = false }: { isEdit?: boolean }) {
    const history = useHistory();
    const { path } = useRouteMatch();
    const { urn } = useParams<{ urn: string }>();

    function onClose() {
        goBackOrReplace(history, removePath(path, "create"));
    }

    const title = isEdit ? "Data Source" : "New Data Source";
    return (
        <Drawer open onClose={onClose}>
            <Header title={title} />
            <DataSourceCreateForm onCancel={onClose} isEdit={isEdit} urn={urn}></DataSourceCreateForm>
        </Drawer>
    );
}
