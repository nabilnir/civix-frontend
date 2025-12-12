import React, { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import  app  from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign in with email & password
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign in with Google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = async () => {
    setLoading(true);
    // Remove JWT token from localStorage
    localStorage.removeItem('civix-token');
    return signOut(auth);
  };

  // Update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Save user to MongoDB database
  const saveUserToDatabase = async (userData) => {
    try {
      // Get API URL from environment or use Vercel backend as fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'https://civix-backend-livid.vercel.app';
      
      const response = await axios.post(
        `${apiUrl}/api/auth/register`,
        userData
      );
      return response.data;
    } catch (error) {
      // User might already exist in database (400 error)
      if (error.response?.status === 400) {
        console.log('User already exists in database');
        return null;
      }
      console.error('Error saving user to database:', error);
      throw error;
    }
  };

  // Get JWT token from backend
  const getJWTToken = async (email) => {
    try {
      // Get API URL from environment or use Vercel backend as fallback
      const apiUrl = import.meta.env.VITE_API_URL || 'https://civix-backend-livid.vercel.app';
      
      const response = await axios.post(
        `${apiUrl}/api/auth/jwt`,
        { email }
      );
      
      if (response.data.token) {
        // Store token in localStorage
        localStorage.setItem('civix-token', response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Error getting JWT token:', error);
      // Don't throw, just return null to allow app to continue
      return null;
    }
  };

  // onAuthStateChange - Runs when user logs in/out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('CurrentUser-->', currentUser?.email);
      
      if (currentUser) {
        // Get JWT token when user is authenticated
        const token = await getJWTToken(currentUser.email);
        
        // Add token to user object
        const userWithToken = {
          ...currentUser,
          accessToken: token || localStorage.getItem('civix-token')
        };
        
        setUser(userWithToken);
      } else {
        setUser(null);
        // Remove token when logged out
        localStorage.removeItem('civix-token');
      }
      
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    saveUserToDatabase,
    getJWTToken,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;