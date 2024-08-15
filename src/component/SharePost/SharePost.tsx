import React, {
  useState,
  useRef,
  useReducer,
  ChangeEvent,
  useContext,
} from "react";
import { FaImage, FaVideo, FaTimes, FaFile } from "react-icons/fa";
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

interface MediaState {
  image: string | null;
  video: string | null;
  file: string | null;
  fileName: string | null;
}

const SharePost: React.FC = () => {
  const [media, setMedia] = useState<MediaState>({
    image: null,
    video: null,
    file: null,
    fileName: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLInputElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
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

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      const fileType = selectedFile.type;

      if (fileType.startsWith("image/")) {
        setMedia({ ...media, image: fileUrl, video: null, file: null });
      } else if (fileType.startsWith("video/")) {
        setMedia({ ...media, video: fileUrl, image: null, file: null });
      } else {
        setMedia({
          ...media,
          file: fileUrl,
          fileName: selectedFile.name,
          image: null,
          video: null,
        });
      }
    }
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((textRef.current && textRef.current.value !== "") || file) {
      try {
        if (file) {
          if (metadata.image.includes(file.type)) {
            await submitImage();
          } else if (metadata.video.includes(file.type)) {
            await submitVideo();
          } else if (metadata.file.includes(file.type)) {
            await submitFile();
          }
        } else {
          await setDoc(postRef, {
            documentId: documentId,
            uid: user?.uid || userData?.uid,
            logo: user?.photoURL || "",
            name: user?.displayName || userData?.name,
            email: user?.email || userData?.email,
            text: textRef.current?.value || "",
            image: media.image,
            video: media.video,
            file: media.file,
            fileName: media.fileName,
            timestamp: serverTimestamp(),
          });
          textRef.current!.value = "";
          setMedia({ image: null, video: null, file: null, fileName: null });
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
    image: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
    video: ["video/mp4", "video/mkv"],
    file: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  };

  const submitImage = async () => {
    await submitMedia("image");
  };

  const submitVideo = async () => {
    await submitMedia("video");
  };

  const submitFile = async () => {
    await submitMedia("file");
  };

  const submitMedia = async (mediaType: "image" | "video" | "file") => {
    if (!file) return;
    const fileType = metadata[mediaType].includes(file.type);
    if (fileType) {
      try {
        const storageRef = ref(storage, `${mediaType}s/${file.name}`);
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
              image: mediaType === "image" ? downloadURL : null,
              video: mediaType === "video" ? downloadURL : null,
              file: mediaType === "file" ? downloadURL : null,
              fileName: media.fileName,
              timestamp: serverTimestamp(),
            });
            textRef.current!.value = "";
            setMedia({ image: null, video: null, file: null, fileName: null });
            setFile(null);
            setProgressBar(0);
            window.location.reload();
          }
        );
      } catch (err: any) {
        dispatch({ type: HANDLE_ERROR });
        alert("Unsupported file");
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
            placeholder={`Create a Post ${
              user?.displayName?.split(" ")[0] ||
              userData?.name?.charAt(0).toUpperCase() + userData?.name?.slice(1)
            }?`}
            ref={textRef}
            className="w-100"
            rows={3}
            maxLength={3000}
          />
          <div className="postOptions mt-2">
            <div
              className="option"
              style={{ color: "var(--photo)" }}
              onClick={() => {
                imageRef.current?.click();
              }}
            >
              <FaImage />
              Photo
            </div>
            <div
              className="option"
              style={{ color: "var(--video)" }}
              onClick={() => {
                videoRef.current?.click();
              }}
            >
              <FaVideo />
              Video
            </div>
            <div
              className="option"
              onClick={() => {
                fileRef.current?.click();
              }}
            >
              <FaFile />
              File
            </div>

            <button className="button ps-button" type="submit">
              Share
            </button>
          </div>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onFileChange}
              accept="image/*"
            />
            <input
              type="file"
              name="myVideo"
              ref={videoRef}
              onChange={onFileChange}
              accept="video/*"
            />
            <input
              type="file"
              name="myFile"
              ref={fileRef}
              onChange={onFileChange}
              accept={metadata.file.join(",")}
            />
          </div>

      
          {media.image && (
            <div className="previewImage">
              <FaTimes
                onClick={() =>
                  setMedia({ image: null, video: null, file: null, fileName: null })
                }
              />
              <img src={media.image} alt="Preview" />
            </div>
          )}
          {media.video && (
            <div className="previewVideo">
              <FaTimes
                onClick={() =>
                  setMedia({ image: null, video: null, file: null, fileName: null })
                }
              />
              <video src={media.video} controls />
            </div>
          )}
          {media.file && (
            <div className="previewFile">
              <FaTimes
                onClick={() =>
                  setMedia({ image: null, video: null, file: null, fileName: null })
                }
              />
              <a href={media.file} target="_blank" rel="noopener noreferrer">
                {media.fileName}
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SharePost;
