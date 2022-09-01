import { Provider } from "@odpf/apsara";
import Router from "./pages/Router";

export default function App() {
    return (
        <Provider>
            <Router />
        </Provider>
    );
}
