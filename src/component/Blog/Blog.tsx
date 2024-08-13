import React from "react";
import "./Blog.css";
import SideNav from "../sidenav/sidenav";
import PostContent from "../PostContents/postContent";
// import RightSide from "../rightSide/RightSide";
import Header from "../HomePage/Header";

const Blog: React.FC = () => {
  return (
    <section>
      <Header />
      <section className="blog">
        <div className="sideNav">
          <SideNav />
        </div>

        <div className="blog-center">
          <PostContent />
        </div>
        {/* <div className="rightSide">
        <RightSide />
        </div> */}
      </section>
    </section>
  );
};

export default Blog;
