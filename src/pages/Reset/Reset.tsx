import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import {  useNavigate } from "react-router-dom";
import {auth} from "../../firebase/firebase"
import './Reset.css'

const Reset: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
      await sendPasswordResetEmail(auth, email);
      console.log("Password reset email sent successfully");
      alert("New password sent to your email");
      navigate("/login");

    }catch(error: any){
      alert(error.message);
      console.log("Reset Password failed");
    }
  }

 

  return (
    <section className="reset d-flex justify-content-center">
      <form onSubmit={handlePasswordReset}>
        <h4>Reset Password</h4>

        <div className="mb-3">
          <h6>
            Enter the email address associated with your account and we 'll send
            you a link to reset your password
          </h6>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </div>
      </form>
    </section>
  );
};

export default Reset;
