import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { auth, db, onAuthStateChanged } from "../../firebase/firebase";
import { signOut, User as FirebaseUser } from "firebase/auth";
import {
  query,
  where,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  signOutUser: () => void;
  user: FirebaseUser | null;
  userData: DocumentData | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AppContextProps {
  children: ReactNode;
}

const AppContext: FC<AppContextProps> = ({ children }) => {
  const collectionUsersRef = collection(db, "users");
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<DocumentData | null>(null);

  const navigate = useNavigate();

  const signOutUser = async () => {
    await signOut(auth);
  };

  const userStateChanged = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(collectionUsersRef, where("uid", "==", user?.uid));
        const snapshot = await getDocs(q);
        const userData = snapshot.docs[0]?.data();
        setUserData(userData);
        setUser(user);
        if (window.location.pathname !== "/") {
          navigate("/");
        }
      } else {
        setUser(null);
        if (
          window.location.pathname !== "/" &&
          window.location.pathname !== "/register"
        ) {
          navigate("/login");
        }
      }
    });
  };

  useEffect(() => {
    userStateChanged();
  }, []);

  const initialState: AuthContextType = {
    signOutUser,
    user,
    userData,
  };

  return (
    <AuthContext.Provider value={initialState}>{children}</AuthContext.Provider>
  );
};

export default AppContext;
