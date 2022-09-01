import { History } from "history";

export function goBackOrReplace(history: History, route: string) {
    return history.length === 2 ? history.replace(route) : history.goBack();
}

export const removePath = (url = "", path = "") => {
    return url.replace(`/${path}`, "").replace(`/${path}/`, "");
};
