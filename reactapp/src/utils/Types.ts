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

type UserState = {
    authUserId: string;
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
};

export type { FetchData, FetchResults, UserState };
