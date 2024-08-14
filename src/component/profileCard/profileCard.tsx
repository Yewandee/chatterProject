

import React, { useContext, useEffect, useState } from "react";
import Cover from "../../assets/images/cover.jpg";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../AppContext/AppContext";
import { doc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import "./profileCard.css";
import { Link } from "react-router-dom";
import { BsBookmarkFill } from "react-icons/bs";

const ProfileCard: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [friendsCount, setFriendsCount] = useState(0);
  const [postsCount, setPostsCount] = useState(0);


  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user } = authContext;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user?.email) {
          const q = doc(db, "Users", user?.uid);
          const docSnap = await getDoc(q);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const friends = userData.friends || [];

            setFriendsCount(friends.length);
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    const fetchPostsCount = async () => {
      if (!user) return;

      try {
        const postsQuery = query(
          collection(db, "posts"),
          where("uid", "==", user.uid)
        );
        const querySnapshot = await getDocs(postsQuery);
        setPostsCount(querySnapshot.size);
      } catch (error) {
        console.error("Error fetching number of posts:", error);
      }
    };


  
    fetchUserData();
    fetchPostsCount();
  }, [user?.email, user?.uid]);

  const ProfilePage = true;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="Cover" />

        {user?.photoURL ? (
          <img src={user.photoURL} alt="Profile" />
        ) : (
          <FaUser />
        )}
      </div>

      <div className="ProfileName">
        <span>{user?.displayName}</span>
        <span>Front-End Web Developer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{friendsCount}</span>
            <span>Friends</span>
          </div>
          <div className="vl"></div>
          {ProfilePage && (
            <>
              <div className="follow">
                <span>{postsCount}</span>
                <span>Posts</span>
              </div>
            </>
          )}
          <div className="vl"></div>

          <Link to="/bookmarks" className="text-decoration-none">
            <div className="follow text-dark ">
              <span><BsBookmarkFill /></span>
              <span>Bookmarks</span>
            </div>
          </Link>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default ProfileCard;
