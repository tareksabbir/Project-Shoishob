/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();
const auth = getAuth(app);
const API_URL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  const GoogleLogin = (provider) => {
    signInWithPopup(auth, provider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (userInfo) => {
    return updateProfile(auth.currentUser, userInfo);
  };

  const verifyEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const forgetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser === null || currentUser.emailVerified) {
      setUser(currentUser);
    }

    if (currentUser) {
      axios
        .post(`${API_URL}/api/v1/jwt`, {
          email: currentUser.email,
        })
        .then((data) => {
          localStorage.setItem("access_token", data.data.token);
          setLoading(false);
        });
    } else {
      localStorage.removeItem("access_token");
    }
    setLoading(false);
  });
  return () => unsubscribe();
}, []);

  const authInfo = {
    createUser,
    signIn,
    logOut,
    user,
    updateUserProfile,
    loading,
    verifyEmail,
    forgetPassword,
    provider,
    GoogleLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
