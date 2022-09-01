import { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

const emptyFn = () => null;

interface useTabChangeArgs {
    defaultActiveKey: string;
    onChange?: (key: string) => void;
}

const useTabChange = ({ defaultActiveKey, onChange = emptyFn }: useTabChangeArgs) => {
    const [currentTab, setCurrentTab] = useState("");
    const location = useLocation();
    const history = useHistory();
    function handleTabChange(key: string) {
        history.replace({
            ...location,
            hash: key,
        });
        setCurrentTab(key);
        onChange(key);
    }

    useEffect(() => {
        const key = location.hash;
        const tab = key.substr(1);
        if (tab) {
            setCurrentTab(tab);
            onChange(tab);
        } else {
            setCurrentTab(defaultActiveKey);
        }
    }, []);

    return { currentTab, handleTabChange };
};

export default useTabChange;
