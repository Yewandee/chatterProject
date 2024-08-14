import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "./Blog.css";
import Header from "../HomePage/Header";
import SideNav from "../sidenav/sidenav";
import { IoMdClose } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Blog: React.FC = () => {
  const [isSideNavVisible, setSideNavVisible] = useState<boolean>(false);

  const toggleSideNav = () => {
    setSideNavVisible(!isSideNavVisible);
  };

  return (
    <section>
      <Header />
      <section className="blog">
        <div className={`sideNav ${isSideNavVisible ? "visible" : "hidden"}`}>
          <button className="close-btn" onClick={toggleSideNav}>
            <IoMdClose />
          </button>
          <SideNav />
        </div>

        <div
          className={`blog-center ${isSideNavVisible ? "hidden" : "visible"}`}
        >
            <button className="open-btn" onClick={toggleSideNav}>
            <FaUserCircle />
          </button>
          <Outlet context={{ toggleSideNav }} />
          
        </div>
      </section>
    </section>
  );
};

export default Blog;
