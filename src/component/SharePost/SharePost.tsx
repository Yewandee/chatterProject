import React, {
  useState,
  useRef,
  useReducer,
  ChangeEvent,
  useContext,
} from "react";
import { FaImage, FaVideo, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import "./SharePost.css";
import { AuthContext } from "../AppContext/AppContext";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

interface ImageState {
  image: string | null;
}

interface PostType {
  logo: string;
  documentId: string;
  uid: string;
  name: string;
  email: string;
  image: string;
  text: string;
  timestamp: {
    toDate: () => Date;
  };
}

const SharePost: React.FC = () => {
  const [image, setImage] = useState<ImageState>({ image: null });
  const [file, setFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collectionRef);
  const documentId = postRef.id;
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState<number>(0);

  const authContext = useContext(AuthContext);
  if (!authContext) {
    return <div>Loading...</div>;
  }
  const { user, userData } = authContext;

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const img = event.target.files[0];
      setImage({
        image: URL.createObjectURL(img),
      });
      setFile(img);
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((textRef.current && textRef.current.value !== "") || file) {
      try {
        if (file) {
          await submitImage();
        } else {
          await setDoc(postRef, {
            documentId: documentId,
            uid: user?.uid || userData?.uid,
            logo: user?.photoURL || "",
            name: user?.displayName || userData?.name,
            email: user?.email || userData?.email,
            text: textRef.current?.value || "",
            image: image.image,
            timestamp: serverTimestamp(),
          });
          textRef.current!.value = "";
          setImage({ image: null });
          setFile(null);
          window.location.reload();
        }
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    if (!file) return;
    const fileType = metadata.contentType.includes(file.type);
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error.message);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await setDoc(postRef, {
              documentId: documentId,
              uid: user?.uid || userData?.uid,
              logo: user?.photoURL || "",
              name: user?.displayName || userData?.name,
              email: user?.email || userData?.email,
              text: textRef.current?.value || "",
              image: downloadURL,
              timestamp: serverTimestamp(),
            });
            textRef.current!.value = "";
            setImage({ image: null });
            setFile(null);
            setProgressBar(0);
            window.location.reload();
          }
        );
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  return (
    <div className="PostShare">
      <div>
        <form onSubmit={handleSubmitPost}>
          <textarea
            name="text"
            placeholder={`What's happening ${
              user?.displayName?.split(" ")[0] ||
              userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)
            }?`}
            ref={textRef}
            className="w-100"
            rows={3}
            maxLength={2000}
          />
          <div className="postOptions mt-2">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => imageRef.current?.click()}
            >
              <FaImage />
              Photo
            </div>
            <div className="option" style={{ color: "var(--video)" }}>
              <FaVideo />
              Video
            </div>
            <div className="option" style={{ color: "var(--location)" }}>
              <FaMapMarkerAlt />
              Location
            </div>

            <button className="button ps-button" type="submit">
              Share
            </button>
            <div style={{ display: "none" }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>
          {image.image && (
            <div className="previewImage">
              <FaTimes onClick={() => setImage({ image: null })} />
              <img src={image.image} alt="Preview" />
            </div>
          )}
        </form>
        {progressBar > 0 && (
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progressBar}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;
