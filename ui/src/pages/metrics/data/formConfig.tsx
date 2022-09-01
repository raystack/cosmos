import Labels from "../components/Labels";
import { FormMetaFields } from "@odpf/apsara/lib/cjs/FormBuilder/FormBuilderItems";
import style from "../styles/style.module.css";
import { FormInstance } from "rc-field-form";
import { QueryBuilderRenderProps } from "@cubejs-client/react";
import { getDimensionsOptions } from "pages/explore/helpers";
import { useEffect, useMemo } from "react";
import Filters from "pages/explore/components/Filters";
import { Metric } from "types";
import { payloadToFormData } from "./transformers";
import QueryViewer from "../components/Details.Query";

function getInitialValues(metric?: Metric | null) {
    return metric ? payloadToFormData(metric) : {};
}

function getGeneralFields(form: FormInstance): Array<FormMetaFields> {
    return [
        {
            name: "name",
            widget: "input",
            label: "Name",
            required: true,
            className: style.formInput,
        },
        {
            name: "abbreviation",
            widget: "input",
            label: "Abbreviation",
            className: style.formInput,
            required: true,
        },
        {
            name: "description",
            widget: "textarea",
            label: "Description",
            className: style.formInput,
        },
        {
            name: ["meta", "formula"],
            widget: "textarea",
            label: "formula",
            className: style.formInput,
        },
        {
            name: "labels",
            label: "Labels",
            widget: "node",
            component: Labels,
            fieldProps: {
                form,
                name: "labels",
                initialValue: form.getFieldValue("labels"),
            },
        },
    ];
}

function useSummaryFields(
    form: FormInstance,
    queryProps: QueryBuilderRenderProps,
    initValue?: Metric | null,
): Array<FormMetaFields> {
    const {
        query,
        availableMeasures,
        updateQuery,
        availableDimensions,
        updateFilters,
        filters,
        validatedQuery,
    } = queryProps;
    const selectedMeasure = query.measures?.[0];
    const [selectedCube] = selectedMeasure ? selectedMeasure.split(".") : [""];
    const measuresOptions = availableMeasures.map((m) => ({ label: m.title, value: m.name }));

    function onMeasureSelect(measure: string) {
        updateQuery({ measures: [measure], dimensions: [], filters: [] });
    }

    useEffect(() => {
        const defaultQuery = { order: {}, measures: [] };
        updateQuery(initValue?.fields || defaultQuery);
    }, [initValue?.fields]);

    useEffect(() => {
        form.setFieldsValue({ query: validatedQuery });
    }, [validatedQuery]);

    const dimensionsOptions = useMemo(() => getDimensionsOptions(availableDimensions, selectedCube), [
        selectedCube,
        availableDimensions,
    ]);

    function onDimensionsChange(dimensions: string[]) {
        updateQuery({ ...query, dimensions });
    }

    return [
        {
            label: "Measure",
            name: ["query", "measures"],
            widget: "select",
            options: measuresOptions,
            placeholder: "Select a measure for this metric",
            className: style.formInput,
            // @ts-ignore
            onChange: onMeasureSelect,
        },
        {
            label: "Dimensions",
            name: ["query", "dimensions"],
            widget: "select",
            options: dimensionsOptions,
            mode: "multiple",
            placeholder: "Select dimension for distribution",
            className: style.formInput,
            // @ts-ignore
            onChange: onDimensionsChange,
        },
        {
            name: ["query", "filters"],
            label: "Filters",
            widget: "node",
            component: Filters,
            fieldProps: {
                dimensions: dimensionsOptions,
                updateFilters: updateFilters,
                filters: filters,
            },
        },
        {
            name: ["sql"],
            label: "SQL",
            widget: "node",
            component: QueryViewer,
            fieldProps: {
                fields: validatedQuery,
            },
        },
    ];
}

interface useFormConfigOptions {
    form: FormInstance;
    queryProps: QueryBuilderRenderProps;
    metric?: Metric;
}

export default function useFormConfig({ form, queryProps, metric }: useFormConfigOptions) {
    const initialValues = getInitialValues(metric);
    const summayFields = useSummaryFields(form, queryProps, metric);
    const formConfig = {
        tabs: [
            {
                title: "General",
                key: "general",
                fields: getGeneralFields(form),
            },
            {
                title: "SQL",
                key: "sql",
                fields: summayFields,
            },
        ],
    };
    return { formConfig, initialValues };
}
