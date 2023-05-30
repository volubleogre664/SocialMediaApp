import { useState } from "react";
import { FetchData } from "../utils/Types";
import API_ENDPOINTS from "../utils/ApiRoutes";

function useFetch<T>(data: FetchData) {
    const { method, body, query } = data;

    const url = API_ENDPOINTS[data.url] + query;

    const [response, setResponse] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("token") ?? "",
                },
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
