import React, { useState, useContext, useEffect, useReducer } from "react";
import "./Post.css";
import { AuthContext } from "../AppContext/AppContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
  getDoc,
  DocumentReference,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

import { formatTime } from "../Utils/FormatDate";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import CommentCard from "../Comment/CommentCard";

interface PostType {
  logo: string;
  documentId: string;
  uid: string;
  name: string;
  email: string;
  image?: string;
  video?: string ;
  file?: string ;
  fileName?: string;
  text?: string;
  id: string;
  timestamp: {
    toDate: () => Date;
  };
}

const Post: React.FC<PostType> = ({
  logo,
  documentId,
  uid,
  name,
  email,
  image,
  video,
  file,
  fileName,
  text,
  timestamp,
}) => {
  const postDate = timestamp.toDate();
  const formattedTime = formatTime(postDate);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading..</div>;
  }
  const { user } = authContext;
  const [isFriend, setIsFriend] = useState(false);
  const [open, setOpen] = useState(false);

 
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkCount, setBookmarkCount] = useState(0);

  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const likesRef = doc(collection(db, "posts", documentId, "likes"));
  const likesCollection = collection(db, "posts", documentId, "likes");
  const bookmarksCollection = collection(db, "posts", documentId, "bookmarks");
  const singlePostDocument = doc(db, "posts", documentId);
  const { ADD_LIKE, HANDLE_ERROR } = postActions;

  const handleOpen = (e: React.FormEvent) => {
    e.preventDefault();

    setOpen(true);
  };

  const addUser = async () => {
    console.log("User Added");
    console.log("Current user UID:", user?.uid);
    try {
      const q = query(
        collection(db, "Users"),
        where("email", "==", user?.email)
      );
      const docSnap = await getDocs(q);

      console.log("Document found: ", docSnap);
      if (!docSnap.empty) {
        const data = docSnap.docs[0].ref as DocumentReference;
        console.log("Document found: ", data);

        await updateDoc(data, {
          friends: arrayUnion({
            id: uid,
            image: logo,
            name: name,
          }),
        });

        const updatedDocSnap = await getDoc(data);
        console.log("Updated Document Data:", updatedDocSnap.data());
      } else {
        console.log("No document found for the current user.");
      }
    } catch (err: any) {
      alert(err.message);
      console.log("Error updating document: ", err.message);
    }
  };

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = querySnapshot.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", documentId, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (err: any) {
      alert(err.message);
      console.log(err.message);
    }
  };

  const deletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
        alert("Post Deleted!");
        window.location.reload();
      } else {
        alert("You can't delete other users' posts!");
      }
    } catch (err: any) {
      alert(err.message);
      console.log(err.message);
    }
  };

 
  const handleBookmark = async () => {
    const q = query(bookmarksCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const bookmarkDocId = querySnapshot.docs[0]?.id;

    try {
      if (bookmarkDocId !== undefined) {
        const deleteId = doc(
          db,
          "posts",
          documentId,
          "bookmarks",
          bookmarkDocId
        );
        await deleteDoc(deleteId);
        setIsBookmarked(false);
      } else {
        await setDoc(doc(bookmarksCollection), {
          id: user?.uid,
        });
        setIsBookmarked(true);
      }
    } catch (err: any) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", documentId, "likes");
        const unsubscribe = onSnapshot(q, (snapshot) => {
          dispatch({
            type: ADD_LIKE,
            likes: snapshot.docs.map((item) => item.data().id as number),
          });
        });
        return () => unsubscribe();
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };

    const checkFriendStatus = async () => {
      if (!user?.uid) {
        return;
      }
      try {
        const q = query(
          collection(db, "Users"),
          where("email", "==", user.email)
        );
        const docSnap = await getDocs(q);
        if (!docSnap.empty) {
          const userData = docSnap.docs[0].data();
          const friends = userData.friends || [];
          const isAlreadyFriend = friends.some(
            (friend: any) => friend.id === uid
          );
          setIsFriend(isAlreadyFriend);
        
        }
      } catch (err: any) {
        alert(err.message);
        console.log(err.message);
      }
    };

    const getBookmarks = async () => {
      try {
        const q = collection(db, "posts", documentId, "bookmarks");
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setBookmarkCount(snapshot.docs.length);
          const isUserBookmarked = snapshot.docs.some(
            (doc) => doc.data().id === user?.uid
          );
          setIsBookmarked(isUserBookmarked);
        });
        return () => unsubscribe();
      } catch (err: any) {
        console.log(err.message);
      }
    };

    getLikes();
    checkFriendStatus();
    getBookmarks();
  }, [documentId, user?.uid, uid, ADD_LIKE, HANDLE_ERROR]);

  return (
    <div className="Post">
      <div className="post-logo-username d-flex">
        <div className="logo">
          <img src={logo} alt={`${name}'s logo`} />
        </div>
        <div className="user-detail p-3">
          <span>
            <b>{name}</b>
          </span>
        </div>

        {user?.uid !== uid && !isFriend && (
          <button
            onClick={addUser}
            className="adduser cursor-pointer bg-white border-0"
          >
            <IoPersonAddSharp />
          </button>
        )}
      </div>

      <div className="post-detail">
        {text && <p>{text}</p>}
        {image && (
          <div className="post-media">
            <img src={image} alt="Post media" className="post-image" />
          </div>
        )}

        {video && (
          <div className="post-media">
            <video src={video} controls className="post-video" />
          </div>
        )}
        {file && (
          <div className="post-media">
            <a href={file} target="_blank" rel="noopener noreferrer">
              {fileName || "Download File"}
            </a>
          </div>
        )}
      </div>

      <div className="postReact">
        <button className="bg-white border-0 likes" onClick={handleLike}>
          {state.likes?.length > 0 ? <BsHeartFill color="red" /> : <BsHeart />}
          <span>{state.likes?.length > 0 && state?.likes?.length}</span>
        </button>

        <button className="bg-white border-0" onClick={handleOpen}>
          <FaRegComment />
        </button>

        {user?.uid === uid && (
          <button className="bg-white border-0" onClick={deletePost}>
            <RiDeleteBinLine />
          </button>
        )}

        <button className="bg-white border-0" onClick={handleBookmark}>
          {isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
          <span>{bookmarkCount > 0 && bookmarkCount}</span>
        </button>
      </div>

      <div className="timeposted">
        <small>{formattedTime}</small>
      </div>

      {open && <CommentCard postId={documentId} />}
    </div>
  );
};

export default Post;