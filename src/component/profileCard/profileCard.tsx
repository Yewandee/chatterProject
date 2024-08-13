import React, { useContext } from "react";
import Cover from "../../assets/images/cover.jpg";
import { FaUser } from "react-icons/fa";

import "./profileCard.css";

import { AuthContext } from "../AppContext/AppContext";

const ProfileCard: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <div>Loading...</div>;
  }

  const { user, userData } = authContext;

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
        <span>{user?.displayName} </span>
        <span>Front-End Web Developer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Followings</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>1</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {/* {ProfilePage ? "" : <span>My Profile</span>} */}
    </div>
  );
};

export default ProfileCard;
