import { Button, Input, Text } from "@odpf/apsara";
import clsx from "clsx";
import { useEffect, useState } from "react";
import style from "../styles/style.module.css";
import { FormInstance } from "rc-field-form";

interface LabelsObj {
    key: string;
    value: string;
}

interface LabelsProps {
    form?: FormInstance;
    name: string;
    initialValue?: Array<LabelsObj>;
}

export default function Labels({ form, name, initialValue = [] }: LabelsProps) {
    const [labels, setLabels] = useState<Array<LabelsObj>>(initialValue);

    function onChange(e: React.ChangeEvent<HTMLInputElement>, type: keyof LabelsObj, i: number) {
        const newLabels = [...labels];
        newLabels[i][type] = e.target.value;
        setLabels(newLabels);
        if (form && name) {
            form?.setFieldsValue({
                [name]: newLabels,
            });
        }
    }

    useEffect(() => {
        setLabels(initialValue);
    }, [initialValue]);

    function onAddNewLabel() {
        const label = { key: "", value: "" };
        const newLabels = [...labels, label];
        setLabels(newLabels);
    }

    return (
        <div className={style.labelsWrapper}>
            <div className={style.labelRow}>
                <div className={clsx(style.labelKey, style.formInput)}>
                    <Text size={12}>Key</Text>
                </div>
                <div className={clsx(style.labelValue, style.formInput)}>
                    <Text size={12}>Value</Text>
                </div>
            </div>
            {labels.map((obj, i) => (
                <div className={style.labelRow} key={i}>
                    <div className={clsx(style.labelKey, style.formInput)}>
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, "key", i)}
                            value={obj.key}
                            placeholder="Add a Key"
                        />
                    </div>
                    <div className={clsx(style.labelValue, style.formInput)}>
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, "value", i)}
                            value={obj.value}
                            placeholder="Add a Value"
                        />
                    </div>
                </div>
            ))}
            <Button type="barebone" iconProps={{ name: "add" }} onClick={onAddNewLabel}>
                Add another Label
            </Button>
        </div>
    );
}
