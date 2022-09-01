import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import DataSourcesList from "./container/DataSourcesList";
import DataSourceCreate from "./container/DataSourceCreate";

import { States } from "@odpf/apsara";

const Router = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} render={(props) => <DataSourcesList {...props} activePath={path} />} />
            <Route
                exact
                path={`${path}/create`}
                render={(props) => (
                    <React.Fragment>
                        <DataSourcesList {...props} activePath={path} />
                        <DataSourceCreate />
                    </React.Fragment>
                )}
            />
            <Route
                exact
                path={`${path}/:urn`}
                render={(props) => (
                    <React.Fragment>
                        <DataSourcesList {...props} activePath={path} />
                        <DataSourceCreate isEdit />
                    </React.Fragment>
                )}
            />
            <Route render={() => <States type="unknown" />} />
        </Switch>
    );
};

export default Router;
