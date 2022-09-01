import React from "react";
import styles from "./style.module.css";

interface ContainerProps {
    children: React.ReactNode;
}
export default function Container({ children }: ContainerProps) {
    return <div className={styles.container}>{children}</div>;
}
