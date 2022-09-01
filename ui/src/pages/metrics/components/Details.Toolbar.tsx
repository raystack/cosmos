import { Title, Button } from "@odpf/apsara";
import { useHistory, useLocation } from "react-router-dom";
import { Metric } from "types";

import styles from "../styles/style.module.css";

interface ToolBarProps {
    metric: Metric;
}

export default function ToolBar({ metric }: ToolBarProps) {
    const history = useHistory();
    const { pathname } = useLocation();
    function onEditClick() {
        history.push(`${pathname}/edit`);
    }
    return (
        <div className={styles.detailsHeader}>
            <div>
                <Title title={metric.name} />
            </div>
            <div>
                <Button
                    className={styles.actionBtn}
                    size="small"
                    type="barebone"
                    iconProps={{ name: "edit" }}
                    onClick={onEditClick}
                >
                    Edit
                </Button>
                <Button className={styles.actionBtn} size="small" type="barebone" iconProps={{ name: "deleteFilled" }}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
