import React, {
  useContext,
  useRef,
  useReducer,
  useEffect,
  FormEvent,
} from "react";
import { AuthContext } from "../AppContext/AppContext";
import { addDoc } from "firebase/firestore";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import Comment from "./Comment";
import { FaUser } from "react-icons/fa";

interface CommentSectionProps {
  postId: string;
}

const CommentCard: React.FC<CommentSectionProps> = ({ postId }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading..</div>;
  }
  const { user, userData } = authContext;
  const comment = useRef<HTMLInputElement>(null);

  const commentRef = doc(collection(db, "posts", postId, "comments"));
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("addComment", e.target);
    if (comment.current?.value !== "") {
      try {
        await setDoc(commentRef, {
          id: commentRef.id,
          comment: comment.current?.value,
          image: user?.photoURL,
          name:
            userData?.name?.charAt(0)?.toUpperCase() +
              userData?.name?.slice(1) || user?.displayName?.split(" ")[0],
          timestamp: serverTimestamp(),
        });
        if (comment.current) comment.current.value = "";
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postId}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (snapshot) => {
          dispatch({
            type: ADD_COMMENT,
            comments: snapshot.docs.map((item) => item.data() as any),
          });
        });
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    getComments();
    return () => {};
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  return (
    <div className="d-flex flex-column bg-white w-100 py-2 rounded-pill">
      <div className="d-flex items-center">
        <div className="mx-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="Profile"
              className="rounded-circle w-50"
            />
          ) : (
            <FaUser />
          )}
        </div>
        <div className="w-100">
          <form className="flex align-items-center w-100" onSubmit={addComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="w-100 outline-none border-0 p-2 bg-light rounded-pill"
              ref={comment}
            />
          </form>
        </div>
      </div>
      {state?.comments?.map((comment) => (
        <Comment
          key={comment.id}
          image={comment?.image}
          name={comment?.name}
          comment={comment?.comment}
        />
      ))}
    </div>
  );
};

export default CommentCard;
