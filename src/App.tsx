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
// import BlogLayout from "./component/Blog/BlogLayout";
import PostContent from "./component/PostContents/postContent";
// import SideNav from "./component/sidenav/sidenav";

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
    return <div>Loading...</div>;
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

          {/* <Route path="*" element={<Navigate to="/landing" />} /> */}
        </Routes>

        <ToastContainer />
      </AppContext>
    </Router>
  );
};

export default App;
