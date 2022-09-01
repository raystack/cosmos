import { useEffect, useState } from "react";

const asyncEmptyFn = async () => Promise.resolve();
export default function useNetworkCall<T>(promise: () => Promise<any> = asyncEmptyFn, conditionalFetch = []) {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isRequesting, setIsRequesting] = useState(true);
    useEffect(() => {
        setData(null);
        setError(null);
        setIsRequesting(true);
        promise()
            .then(setData)
            .catch(setError)
            .finally(() => {
                setIsRequesting(false);
            });
    }, [promise, ...conditionalFetch]);

    return { data, setData, error, isRequesting };
}
