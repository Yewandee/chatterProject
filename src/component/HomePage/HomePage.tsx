import React from "react";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";

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

      <section className="features">
        <div className="row mt-4">
          <div className="col-md-4" data-aos="fade-up">
            <h4>User Registration & Authentication</h4>
            <p>
              Sign up using your email or social accounts, and join a community
              of like-minded readers and writers.
            </p>
          </div>
          <div className="col-md-4" data-aos="fade-up">
            <h4>Content Creation</h4>
            <p>
              Create and publish content effortlessly with our rich text editor.
              Save drafts in Markdown and display them beautifully in HTML.
            </p>
          </div>
          <div className="col-md-4" data-aos="fade-up">
            <h4>Content Discovery</h4>
            <p>
              Explore a personalized feed based on your interests. Search,
              filter, and discover content that resonates with you.
            </p>
          </div>
        </div>
      </section>
    </section>
    // <div className="container mt-5">
    //   <nav className="navbar navbar-expand-lg navbar-light bg-light">
    //     <Link className="navbar-brand" to="/home">Chatter</Link>
    //     <div className="collapse navbar-collapse">
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/home">Home</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/about">About Us</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/blog">Blog</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to="/contact">Contact Us</Link>
    //         </li>
    //       </ul>
    //       <div className="navbar-nav ml-auto">
    //         <button className="btn btn-danger mx-2" onClick={handleLogout}>Logout</button>
    //         <Link to="/profile" className="nav-link">Profile</Link>
    //       </div>
    //     </div>
    //   </nav>
    //   <div className="mt-4">
    //     <h2>Welcome to Chatter's Home Page</h2>
    //     Add more content here
    //   </div>
    // </div>
  );
};

export default HomePage;
