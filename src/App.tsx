import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./component/HomePage/HomePage";
import LandingPage from "./component/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/SignUp/SignUp";
import { auth } from "./firebase/firebase";
import AppContext from "./component/AppContext/AppContext";
import Reset from "./pages/Reset/Reset";
import AboutUs from "./component/HomePage/AboutUs";
import Blog from "./component/Blog/Blog";
import FriendProfile from "./component/FriendProfile/FriendProfile";
import PostContent from "./component/PostContents/postContent";
import Bookmarks from "./component/Bookmarks/Bookmark";
import NotFound from "./404/404";
import ClipLoader from "react-spinners/ClipLoader";

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
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

  return (
    <Router>
      <AppContext>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route
            path="/home"
            element={user ? <Navigate to="/home" /> : <LandingPage />}
          />
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/blog" element={<Blog />}>
            <Route index element={<PostContent />} />
          </Route>
          <Route path="/profile/:id" element={<FriendProfile />} />
          <Route path="/bookmarks" element={<Bookmarks />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </AppContext>
    </Router>
  );
};

export default App;
