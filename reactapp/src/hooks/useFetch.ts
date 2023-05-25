import { useState } from "react";
import { FetchData } from "../utils/Types";
import API_ENDPOINTS from "../utils/ApiRoutes";

function useFetch<T>(data: FetchData) {
    const { url, method, body } = data;

    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);

        try {
            const res = await fetch(API_ENDPOINTS[url] as string, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("token") ?? "",
                },
                body: JSON.stringify(body),
            });

            const json = await res.json();

            setResponse(json);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData };
}

export default useFetch;
