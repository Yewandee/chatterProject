import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import Post from "../Post/Post";
import "./Posts.css";

const PostsList: React.FC = () => {
  interface PostType {
    logo: string;
    documentId: string;
    uid: string;
    name: string;
    email: string;
    image: string;
    video: string;
    file: string;
    fileName: string;
    text: string;
    timestamp: {
      toDate: () => Date;
    };
  }

  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollection = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollection);
        const postsList = postsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            logo: data.logo,
            documentId: data.documentId,
            uid: data.uid,
            name: data.name,
            email: data.email,
            image: data.image,
            video: data.video,
            file: data.file,
            fileName: data.fileName,
            text: data.text,
            timestamp: data.timestamp,
          } as PostType;
        });
        setPosts(postsList);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5 w-100 h-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Posts">
      {posts.length > 0 ? (
        posts.map((post, index) => <Post id={""} key={index} {...post} />)
      ) : (
        <div>No posts available</div>
      )}
    </div>
  );
};

export default PostsList;
