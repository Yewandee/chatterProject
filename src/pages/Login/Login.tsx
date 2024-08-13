import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import SignWithGoogle from "./signWithGoogle";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      alert("User logged in Successfully");
      navigate("/home");
    } catch (error: any) {
      console.log("Login failed");
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <section
          style={{ margin: "50px auto" }}
          className="d-flex justify-content-center"
        >
          <ClipLoader
            color="#367fd6"
            loading={loading}
            speedMultiplier={0.5}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </section>
      ) : (
        <section className="login">
          <form onSubmit={handleLoginSubmit}>
            <h3>Login</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>

            <SignWithGoogle />

            <div className="forgot_signup">
              <Link to="/reset">
                <p className="forgot-password text-left">Forgot password?</p>
              </Link>

              <p className="forgot-password text-right ">
                Don't Have an account?{" "}
                <Link to="/register"> Register Here</Link>
              </p>
            </div>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
