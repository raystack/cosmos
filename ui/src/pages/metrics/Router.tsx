import { Route, Switch, useRouteMatch } from "react-router-dom";
import { States } from "@odpf/apsara";
import MetricsList from "./containers/MetricsList";
import MetricDetails from "./containers/MetricDetails";
import MetricCreate from "./containers/MetricCreate";
import React from "react";

const Router = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} render={(props) => <MetricsList {...props} activePath={path} />} />
            <Route
                exact
                path={`${path}/create`}
                render={(props) => (
                    <React.Fragment>
                        <MetricsList {...props} activePath={path} />
                        <MetricCreate />
                    </React.Fragment>
                )}
            />
            <Route exact path={`${path}/:urn`} render={(props) => <MetricDetails {...props} activePath={path} />} />
            <Route
                exact
                path={`${path}/:urn/edit`}
                render={(props) => (
                    <React.Fragment>
                        <MetricDetails {...props} activePath={path} />
                        <MetricCreate isEdit />
                    </React.Fragment>
                )}
            />
            <Route render={() => <States type="unknown" />} />
        </Switch>
    );
};

export default Router;
