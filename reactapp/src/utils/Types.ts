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

type Comment = {
    authorFirstName: string;
    authorLastName: string;
    commentId: number;
    postId: number;
    userId: number;
    text: string;
    date: Date;
};

type Like = {
    likeId: number;
    postId: number;
    userId: number;
};

type PostType = {
    postId: number;
    userId: number;
    text: string;
    dateTimePosted: Date;
    mediaUrl?: string;
};

type PostState = {
    post: PostType;
    postOwner: UserState;
    comments: Comment[];
    likes: Like[];
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
    chatId?: number;
    authUserId: string;
    recievingAuthUserId: string;
    text: string;
    date: Date;
};

export type {
    FetchData,
    FetchResults,
    UserState,
    PostState,
    Comment,
    Like,
    PostType,
    ChatState
};

