import React, {useState} from "react";
import "./RightSide.css";
import Home from "../../assets/images/home.png"
import Noti from "../../assets/images/noti.png";
import Comment from "../../assets/images/comment.png";
import { MdOutlineSettings } from "react-icons/md";
// import TrendCard from "../TrendCard/TrendCard";
// import ShareModal from "../ShareModal/ShareModal";


const RightSide: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={Home} alt="" />
        <MdOutlineSettings />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
      </div>

      <div className="discover-content">
        
      </div>

      {/* <TrendCard />

      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>

      <ShareModal  modalOpened={modalOpened} setModalOpened={setModalOpened} /> */}
    </div>
  );
};

export default RightSide;
