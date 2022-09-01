import { Route, Switch, useRouteMatch } from "react-router-dom";
import { States } from "@odpf/apsara";
import TablesList from "./containers/TablesList";

const Router = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} render={(props) => <TablesList {...props} activePath={path} />} />
            <Route render={() => <States type="unknown" />} />
        </Switch>
    );
};

export default Router;
