import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { NavLink, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <section>
      <section className="header">
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark p-3">
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
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <Navbar.Collapse className={isMenuOpen ? "show" : ""}>
                <ul className="navbar-nav ms-auto">
                  <div className="d-flex">
                    <button
                      className="btn btn-primary mx-2 me-md-2 bg-dark btn-outline-light"
                      onClick={() => navigate("/register")}
                    >
                      Get Started
                    </button>
                    <button
                      className="btn btn-secondary mx-2 bg-dark btn-outline-light"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </button>
                  </div>
                </ul>
              </Navbar.Collapse>
            </div>
          </div>
        </nav>
      </section>

      <section className="LandingHero">
        <section className="LandingBanner">
          <div className="LandingBanner_text text-light">
            <h1>Welcome to Chatter</h1>
            <p>Your platform for writing and creating content.</p>
            <div className="mt-5">
              <button
                className="btn btn-primary mx-2"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
};

export default LandingPage;
