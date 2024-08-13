import React, { useContext, useState } from "react";
import "./LogoSearch.css";
import Logo from "../../assets/images/chatterlogo.png";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface Friend {
  id: string;
  name: string;
  image: string;
}

const LogoSearch: React.FC = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading..</div>;
  }
  const { user, userData } = authContext;

  const [input, setInput] = useState<string>("");

  const friendList: Friend[] = userData?.friends || [];

  const searchFriends = (data: Friend[]): Friend[] => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend = async (id: string, name: string, image: string) => {
    if (!user?.uid) {
      console.error("User not logged in");
      return;
    }

    try {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const getDoc = await getDocs(q);

      if (getDoc.empty) {
        console.error("No document found for the current user.");
        return;
      }

      const userDocumentId = getDoc.docs[0].id;

      await updateDoc(doc(db, "users", userDocumentId), {
        friends: arrayRemove({ id, name, image }),
      });
      console.log(`Friend removed: ${name}`);
    } catch (err: any) {
      console.error("Error removing friend:", err.message);
    }
  };

  return (
    <div className="LogoSearch">
      <div className="d-flex">
        <p className="pt-4 pe-2">Friends:</p>

        <div className="search">
          <input
            type="text"
            placeholder="Search Friends"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-100"
          />
        </div>
      </div>

      {friendList.length > 0 ? (
        searchFriends(friendList).map((friend) => (
          <div
            className="d-flex items-center justify-content-between"
            key={friend.id}
          >
            <Link to={`/profile/${friend.id}`}>
              <div className="d-flex align-items-center my-2 cursor-pointer">
                <div className="d-flex align-items-center">
                  {friend.image ? (
                    <img
                      src={friend.image}
                      alt="Profile"
                      className="rounded-circle w-50"
                    />
                  ) : (
                    <FaUser />
                  )}
                  <p className="">{friend.name}</p>
                </div>
              </div>
            </Link>
            <div className="mr-4">
              <button
                className="bg-white border-0"
                onClick={() =>
                  removeFriend(friend.id, friend.name, friend.image)
                }
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="">Add friends to check their profile</p>
      )}
    </div>
  );
};

export default LogoSearch;
