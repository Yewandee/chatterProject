type Post = {
    id: number;
    title: string;
    content: string;
    author: string;
    dateCreated: Date;
    dateModified?: Date;
    likes: number;
    comments: Comment[];
  };
  
  type Comment = {
    comment: string;
    name: string;
    image: string | undefined;
    id: number;
    author: string;
    content: string;
    dateCreated: Date;
  };
  
  type Action =
    | { type: 'SUBMIT_POST'; posts: Post[] }
    | { type: 'HANDLE_ERROR' }
    | { type: 'ADD_LIKE'; likes: number[] }
    | { type: 'ADD_COMMENT';  comments: Comment[] };
  
  type State = {
    error: boolean;
    posts: Post[];
    likes: number[];
    comments: Comment[];
  };
  
  export const postActions = {
    SUBMIT_POST: "SUBMIT_POST",
    HANDLE_ERROR: "HANDLE_ERROR",
    ADD_LIKE: "ADD_LIKE",
    ADD_COMMENT: "ADD_COMMENT",
  } as const;
  
  export const postsStates: State = {
    error: false,
    posts: [],
    likes: [],
    comments: [],
  };
  
  export const PostsReducer = (state: State, action: Action): State => {
    switch (action.type) {
      case postActions.SUBMIT_POST:
        return {
          ...state,
          error: false,
          posts: action.posts,
        };
      case postActions.ADD_LIKE:
        return {
          ...state,
          error: false,
          likes: action.likes,
        };
      case postActions.ADD_COMMENT:
        return {
          ...state,
          error: false,
          comments: action.comments,
        };

      // case postActions.ADD_COMMENT:
      // return {
      //   ...state,
      //   error: false,
      //   posts: state.posts.map((post) =>
      //     post.id === action.postId
      //       ? { ...post, comments: [...post.comments, action.comments] }
      //       : post
      //   ),
      // };

      case postActions.HANDLE_ERROR:
        return {
          ...state,
          error: true,
          posts: [],
        };
      default:
        return state;
    }
  };
  