import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import PropTypes from "prop-types";
import Skeleton from "../pages/Skeleton";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = async () => {
    await axios.post(`${import.meta.env.VITE_SERVER}/logout`, {
      withCredentials: true,
    });
    setLoading(true);
    return signOut(auth);
  };
  const updateUserProfile = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [reload, user]);

  const authInfo = {
    loading,
    setLoading,
    user,
    createUser,
    logOut,
    signIn,
    googleLogin,
    reload,
    setReload,
    updateUserProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>
      {loading ? <Skeleton></Skeleton> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
