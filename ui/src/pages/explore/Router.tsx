import { Route, Switch, useRouteMatch } from "react-router-dom";
import { States } from "@odpf/apsara";
import Explore from "./containers/Explore";
const Router = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path} render={(props) => <Explore {...props} activePath={path} />} />
            <Route render={() => <States type="unknown" />} />
        </Switch>
    );
};

export default Router;
