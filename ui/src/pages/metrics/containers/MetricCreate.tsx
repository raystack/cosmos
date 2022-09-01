import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { goBackOrReplace, removePath } from "utils";
import { Drawer, Header, FormBuilder, Button, Tabs, notification } from "@odpf/apsara";
import style from "../styles/style.module.css";
import useFormConfig from "../data/formConfig";
import { useCallback, useEffect, useState } from "react";
import { QueryBuilder, QueryBuilderRenderProps } from "@cubejs-client/react";
import { createMetric, cubejsApi, fetchMetric, updateMetric } from "api";
import { formDataToPayload } from "../data/transformers";
import { MetricResponse } from "types";
import useNetworkCall from "hooks/useNetworkCall";

interface MetricCreateFormProps extends QueryBuilderRenderProps {
    onClose: () => void;
    isEdit?: boolean;
    urn?: string;
}

function MetricCreateForm({ onClose, isEdit, urn, ...queryProps }: MetricCreateFormProps) {
    const [form] = FormBuilder.useForm();
    const memoFetchMetric = useCallback(() => (urn ? fetchMetric(urn) : Promise.resolve()), [urn]);
    const { data: metric } = useNetworkCall<MetricResponse>(memoFetchMetric);
    const { initialValues, formConfig } = useFormConfig({ form, queryProps, metric: metric?.data });
    const [activeTab, setActiveTab] = useState(formConfig.tabs[0].key);
    const isLastTab = activeTab === formConfig.tabs[formConfig.tabs.length - 1].key;

    async function onSaveBtnClick() {
        if (isLastTab) {
            form.submit();
        } else {
            const currentTabIndex = formConfig.tabs.findIndex((t) => t.key === activeTab);
            setActiveTab(formConfig.tabs[currentTabIndex + 1].key);
        }
    }

    async function onSubmit() {
        try {
            const data = form.getFieldsValue(true);
            const payload = formDataToPayload(data);
            const dataSource = isEdit && urn ? await updateMetric(urn, payload) : await createMetric(payload);
            const message = isEdit ? "updated successfully" : "created successfully";
            notification.success({ message: `${dataSource.data.name} ${message}` });
            onClose();
        } catch (err) {
            console.error(err);
            notification.error({ message: "Something went wrong" });
        }
    }

    async function onCancelBtnClick() {
        if (isLastTab) {
            setActiveTab(formConfig.tabs[formConfig.tabs.length - 2].key);
        } else {
            onClose();
        }
    }

    function onTabClick(tabkey: string) {
        setActiveTab(tabkey);
    }

    useEffect(() => form.resetFields(), [form, initialValues]);

    return (
        <FormBuilder className={style.createForm} form={form} initialValues={initialValues} onFinish={onSubmit}>
            <Tabs activeKey={activeTab} onTabClick={onTabClick}>
                {formConfig.tabs.map((tab) => (
                    <Tabs.TabPane key={tab.key} tab={tab.title} className={style.formTab}>
                        <FormBuilder.Items meta={tab} form={form} />
                    </Tabs.TabPane>
                ))}
            </Tabs>
            <div className={style.footerBtns}>
                <Button size="large" type="primary" className={style.footerBtn} onClick={onSaveBtnClick}>
                    {isLastTab ? (isEdit ? "Save" : "Add Metric") : "Next"}
                </Button>
                <Button size="large" className={style.footerBtn} onClick={onCancelBtnClick}>
                    {isLastTab ? "Back" : "Cancel"}
                </Button>
            </div>
        </FormBuilder>
    );
}

export default function MetricCreateDrawer({ isEdit = false }: { isEdit?: boolean }) {
    const history = useHistory();
    const { path } = useRouteMatch();
    const { urn } = useParams<{ urn: string }>();

    function onClose() {
        goBackOrReplace(history, removePath(path, "create"));
    }

    const title = isEdit ? "Metric" : "New Metric";
    return (
        <Drawer open onClose={onClose}>
            <Header title={title} />
            <QueryBuilder
                cubejsApi={cubejsApi}
                render={(renderProps) => (
                    <MetricCreateForm onClose={onClose} isEdit={isEdit} urn={urn} {...renderProps} />
                )}
            ></QueryBuilder>
        </Drawer>
    );
}
