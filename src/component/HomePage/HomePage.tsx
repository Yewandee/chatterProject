import React from "react";
import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import AboutImg from "../../assets/images/blog-about.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="">
      <Header />

      <section className="HeroBanner">
        <div
          className="LandingBanner_text text-white"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <h1 className="display-1 fw-bolder">Welcome to Chatter</h1>
          <p className="fs-5">A Haven for Text Lovers in a World of Pictures</p>
          <p></p>
          <div className="mt-5 ">
            <button
              className="btn btn-primary mx-2 bg-dark border-dark"
              data-aos="fade-up"
              data-aos-duration="3000"
              onClick={() => navigate("/blog")}
            >
              Start Creating Posts
            </button>
          </div>
        </div>
      </section>

      <section className="About">
        <div className="container-fluid py-5 my-5">
          <div className="row align-">
            <div className="col-12 col-md-6">
              <div className="about-img">
                <img
                  src={AboutImg}
                  alt="Blog"
                  style={{ objectFit: "cover", width: "100%", height: "100vh" }}
                />
             </div>
            </div>
            <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
              <div className="container ">
                <h2>About Chatter</h2>
                <p className="lead">
                  Chatter is a multi-functional platform designed for authors
                  and readers who crave text-based content. Whether you're
                  looking to write or explore, Chatter provides an unparalleled
                  experience tailored to your interests.
                </p>

                <Link to="/blog">
                  <button
                    className="btn btn-primary mx-2 bg-dark border-dark"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    Start Creating Posts
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="features">
        <div className="row mt-4">
          <div className="col-md-4 card" data-aos="fade-up">
            <h4>User Registration & Authentication</h4>
            <p>
              Sign up using your email or social accounts, and join a community
              of like-minded readers and writers.
            </p>
          </div>
          <div className="col-md-4 card" data-aos="fade-up">
            <h4>Content Creation</h4>
            <p>
              Create and publish content effortlessly with our rich text editor.
              Save drafts in Markdown and display them beautifully in HTML.
            </p>
          </div>
          <div className="col-md-4 card" data-aos="fade-up">
            <h4>Content Discovery</h4>
            <p>
              Explore a personalized feed based on your interests. Search,
              filter, and discover content that resonates with you.
            </p>
          </div>
        </div>
      </section> */}
    </section>
  );
};

export default HomePage;
