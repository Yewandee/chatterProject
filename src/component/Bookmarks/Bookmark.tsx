import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Post from "../Post/Post";

type PostType = {
    logo: string;
    documentId: string;
    uid: string;
    name: string;
    email: string;
    image?: string;
    text?: string;
    id: string;
    timestamp: {
      toDate: () => Date;
    };
 
};


const Bookmarks: React.FC = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<PostType[]>([]);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;
  

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        if (user?.uid) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnap = await getDoc(userDocRef);
          console.log("UserDocSnap DeTAILSS", userDocSnap);

          if (userDocSnap.exists()) {
            const bookmarks = userDocSnap.data().bookmarks || [];
            const postPromises = bookmarks.map((bookmarks :string) =>
              getDoc(doc(db, "posts", bookmarks))
            );
                console.log("PostedPromises", postPromises);
            const postDocs = await Promise.all(postPromises);
            const posts = postDocs
              .filter((docSnap) => docSnap.exists())
              .map((docSnap) => ({
                id: docSnap.id,
                ...docSnap.data(),
              }) as PostType);
              
            setBookmarkedPosts(posts);
          }
        }
      } catch (err: any) {
        console.error("Error fetching bookmarks:", err.message);
      }
    };

    fetchBookmarks();
  }, [user?.uid]);

  return (
    <div className="bookmarks-page">
      <h2>Your Bookmarked Posts</h2>
      {bookmarkedPosts.length > 0 ? (
        bookmarkedPosts.map((post) => <Post key={""} {...post} />)
      ) : (
        <p>No bookmarks yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;