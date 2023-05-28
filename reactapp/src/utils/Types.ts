type FetchData = {
    url: string;
    method: string;
    body?: object;
    query?: string;
};

type FetchResults = {
    response: any;
    error: string | null;
    loading: boolean;
    fetchData: () => void;
};

export type { FetchData, FetchResults };
