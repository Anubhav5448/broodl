"use client";

import { auth } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState();
  const [loading, setLoading] = useState(true);

  //   Auth handlers
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj({});
    setCurrentUser(null);
    return signOut();
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        // Set the user to out local context state
        setLoading(true);
        setCurrentUser(user);
        if (!user) {
          return;
        }
        // if user exist, fetch data from firestore database
        
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
