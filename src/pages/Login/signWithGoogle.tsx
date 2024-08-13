import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import googleImage from "../../assets/images/google.png";

const SignWithGoogle: React.FC = () => {

  const navigate = useNavigate();

  function googleLogin (){
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      if (result.user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: "",
        });
        navigate("/home");
      }
    });
  };
  return (
    <section className="signwithgoogle">
      <div>
        <p className="continue-p">-----Or continue with-----</p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={googleLogin}
        >
          <img src={googleImage} width={"60%"} />
        </div>
      </div>

      
    </section>
  );
};

export default SignWithGoogle;
