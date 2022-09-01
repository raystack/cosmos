import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { States } from "@odpf/apsara";

import DataSources from "./datasources/Router";
import Tables from "./tables/Router";
import Metrics from "./metrics/Router";
import Explore from "./explore/Router";

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/datasources" component={DataSources} />
                <Route path="/tables" component={Tables} />
                <Route path="/metrics" component={Metrics} />
                <Route path="/explore" component={Explore} />
                <Route render={() => <States type="unknown" />} />
            </Switch>
        </BrowserRouter>
    );
}
