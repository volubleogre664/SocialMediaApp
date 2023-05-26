type FetchData = {
    url: string;
    method: string;
    body: object;
};

type FetchResults = {
    response: any;
    error: string | null;
    loading: boolean;
    fetchData: () => void;
};

export type { FetchData, FetchResults };
