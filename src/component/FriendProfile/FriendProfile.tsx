import React, { useState, useEffect } from "react";
import {
  collection,
  where,
  query,
  onSnapshot,
 
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface UserProfile {
  image?: string;
  email?: string;
  name?: string;
}
const FriendProfile: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
  const { email } = useParams<{ email: string }>();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const getUserProfile = () => {
      const q = query(collection(db, "Users"), where("email", "==", email));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          setProfile(snapshot.docs[0].data() as UserProfile);
        } else {
          console.error("No user profile found.");
        }
      });

      return () => unsubscribe();
    };

    getUserProfile();
  }, [email]);

  console.log(profile);

  return (
    <section className="FriendProfile">
      <div>
        {profile?.image ? (
          <img
            src={profile?.image}
            alt="Profile"
            className="rounded-circle w-50"
          />
        ) : (
          <FaUser />
        )}

        <p>{profile?.name}</p>
      </div>

      <div className="d-flex ">
        <div className="d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default FriendProfile;
