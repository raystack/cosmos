import React from "react";
import styles from "./style.module.css";
import Container from "components/Container";
import { Header, Sidebar } from "@odpf/apsara";
import { IconName } from "@odpf/apsara/lib/cjs/Icon/Icon";
import { Link } from "react-router-dom";

interface AppLayoutProps {
    children?: React.ReactNode;
    title?: string;
    activePath?: string;
}

const navigationList = [
    {
        key: "/datasources",
        url: "/datasources",
        linkText: "Data Sources",
        iconProps: { name: "placeholder" as IconName },
    },
    {
        key: "/tables",
        url: "/tables",
        linkText: "Tables",
        iconProps: { name: "placeholder" as IconName },
    },
    {
        key: "/metrics",
        url: "/metrics",
        linkText: "Metrics",
        iconProps: { name: "placeholder" as IconName },
    },
    {
        key: "/explore",
        url: "/explore",
        linkText: "Explore",
        iconProps: { name: "placeholder" as IconName },
    },
];

interface LinkRenderProps {
    children: React.ReactNode;
    to: string;
}

const LinkRender = ({ children, to }: LinkRenderProps) => {
    return <Link to={to}>{children}</Link>;
};

export default function AppLayout({ children, title = "", activePath = "" }: AppLayoutProps) {
    return (
        <Container>
            <Sidebar
                headerProps={{ name: "Cosmos", iconProps: { name: "placeholder" as IconName } }}
                navigationList={navigationList}
                activePath={activePath}
                linkRender={LinkRender}
            />
            <div className={styles.main}>
                <Header title={title} />
                {children}
            </div>
        </Container>
    );
}
