import { useState } from "react";
import { FetchData } from "../utils/Types";
import API_ENDPOINTS from "../utils/ApiRoutes";

function useFetch<T>(data: FetchData) {
    const { method, body, query = "" } = data;

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

            const contentType = res.headers.get("Content-Type");
            let content = null;
            if (contentType && !contentType.startsWith("application/json")) {
                content = await res.blob();
            } else {
                content = await res.json();
            }

            setResponse(content);
        } catch (error: any) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { response, error, loading, fetchData, setResponse };
}

export default useFetch;
