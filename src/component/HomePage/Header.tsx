import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Header.css";

import { IoChatboxEllipsesOutline } from "react-icons/io5";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <section>
      <section className="header">
        <nav className="navbar stickey-top navbar-expand-lg navbar-dark bg-dark p-3">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
              <IoChatboxEllipsesOutline />
              CHATTER
            </NavLink>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className={`collapse navbar-collapse justify-content-center 
                ${isMenuOpen ? "show" : ""}
                `}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/blog">
                    Blog
                  </Link>
                </li>

                <div className="d-flex">
                  <button
                    className="btn btn-primary mx-2 me-md-2 bg-dark btn-outline-light"
                    onClick={handleLogout}
                  >
                    LogOut
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </section>
  );
};

export default Header;
