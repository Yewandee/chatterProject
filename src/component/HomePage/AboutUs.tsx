import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import interaction from "../../assets/images/interactions.webp";
import Header from "./Header";
import './HomePage.css'

const AboutUs: React.FC = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <section className="AboutUs">
      <Header />
      <div className="about-us bg-light py-5">
        <div className="container text-center about-text">
          <h2>About Chatter</h2>
          <p className="lead">
            Chatter is a multi-functional platform designed for authors and
            readers who crave text-based content. Whether you're looking to
            write or explore, Chatter provides an unparalleled experience
            tailored to your interests.
          </p>
        </div>
      </div>

      <div className="container-fluid py-5 my-5">
        <div className="row align-">
          <div className="col-12 col-md-6">
            <div className="about-img">
              <img
                src={interaction}
                alt="Blog"
                style={{ objectFit: "cover", width: "100%", height: "100vh" }}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="container">
              <h2>About Chatter</h2>
              <p className="lead">
                Chatter is a multi-functional platform designed for authors and
                readers who crave text-based content. Whether you're looking to
                write or explore, Chatter provides an unparalleled experience
                tailored to your interests.
              </p>

              <Link to="/blog">
                <button
                  className="btn btn-primary mx-2 bg-dark border-dark"
                  data-aos="fade-up"
                  data-aos-duration="3000"
                >
                  Start Creating Posts
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
