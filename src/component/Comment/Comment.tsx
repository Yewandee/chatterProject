import React from "react";
import { FaUser } from "react-icons/fa";


interface CommentProps {
  name: string;
  comment: string;
  image?: string;
}

const Comment: React.FC<CommentProps> = ({ name, comment, image }) => {
  return (
    <div className="d-flex align-items-center mt-2 rounded-pill ">
      <div className="mx-2 ">
        {image ? (
          <img alt="avatar" src={image} className="rounded-circle w-50" />
        ) : (
          <FaUser />
        )}
      </div>
      <div className="bg-light  mw-50 mh-50 p-2 rounded">
        <p className="">
          {name}
        </p>
        <p className="">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default Comment;
