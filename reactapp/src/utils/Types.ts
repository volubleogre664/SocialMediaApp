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
    setResponse?: any;
};

type UserState = {
    authUserId: string;
    userId: number;
    username: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
};

type ChatState = {
    ChatId?: number;
    AuthUserId: string;
    RecievingAuthUserId: string;
    Text: string;
    Date: Date;
};

export type { FetchData, FetchResults, UserState, ChatState };
