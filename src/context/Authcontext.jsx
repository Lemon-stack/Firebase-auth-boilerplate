/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { auth, provider } from '../client/client';
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         signOut, 
         onAuthStateChanged, 
         sendPasswordResetEmail,
         signInWithRedirect
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
    
    return signInWithRedirect(auth, provider);
  }
  const sendPasswordReset = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // useEffect(() => {
  //   const checkRedirectResult = async () => {
  //     try {
  //       const result = await getRedirectResult(auth);
  //       if (result) {
  //         setCurrentUser(result.user);
  //       }
  //     } catch (error) {
  //       console.error('Error getting redirect result:', error);
  //     }
  //   };

  //   checkRedirectResult();
  // }, [currentUser]);

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
    sendPasswordReset,
  };

  if(loading){
    return <div>Loading......</div>
  
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
