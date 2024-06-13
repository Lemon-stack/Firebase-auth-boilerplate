/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { auth } from '../client/client';
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         onAuthStateChanged, 
         signInWithPopup, GoogleAuthProvider, 
         reauthenticateWithCredential, 
         EmailAuthProvider, 
         updatePassword
        } from 'firebase/auth';


export const AuthContext = React.createContext();


export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password){
    return createUserWithEmailAndPassword(auth,email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth,email, password);
  }

  function logout() {
    return signOut(auth);
  }
  function googleSignin() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  const reauthenticate = async (currentPassword) => {
    const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
    return reauthenticateWithCredential(currentUser, credential);
  };

  const updatePasswordHandler = async (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(!user){
        setCurrentUser(null);
        setLoading(false);
       
      }
      setCurrentUser(user);
      setLoading(false);
      });
      
      console.log(currentUser, "current user ");
    return () => unsubscribe();
  }, [currentUser]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth,user => {
  //     setCurrentUser(user);
  //       console.log(currentUser, "current user ")
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    googleSignin,
    reauthenticate,
    updatePasswordHandler,
  };

  if(loading){
    return <h2> loading.....</h2>
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
