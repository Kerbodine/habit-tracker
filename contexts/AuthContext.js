import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, app } from "../config/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const db = getFirestore(app);

  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userHabits, setUserHabits] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createSignupDoc = async (cred) => {
    const photoURL = cred.user.photoURL ? cred.user.photoURL : null;
    const userDoc = {
      displayName: cred.user.displayName,
      firstName: cred.user.displayName.split(" ")[0],
      lastName: cred.user.displayName.split(" ")[1],
      email: cred.user.email,
      photoURL,
      createdAt: new Date(),
    };
    await setDoc(doc(db, "Users", cred.user.uid), userDoc);
  };

  const signup = async (email, password, firstName, lastName) => {
    try {
      let cred = await createUserWithEmailAndPassword(auth, email, password);
      cred.user.displayName = `${firstName} ${lastName}`;
      await createSignupDoc(cred);
    } catch (err) {
      console.log(err);
    }
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateDisplayName = async (displayName) => {
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, provider);
      const { isNewUser } = getAdditionalUserInfo(cred);
      if (isNewUser) {
        await createSignupDoc(cred);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userData,
        setUserData,
        userHabits,
        setUserHabits,
        login,
        signup,
        resetPassword,
        logout,
        updateDisplayName,
        signInWithGoogle,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
