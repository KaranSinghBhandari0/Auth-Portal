import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

import { auth, db, googleProvider } from '../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { setDoc, doc, getDoc, query, where, getDocs, collection } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [updatingProfile, setUpdatingProfile] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [image, setImage] = useState(null);

    // Check authentication
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                // Fetch user data from Firestore
                const userData = await fetchUserById(currentUser.uid);
                if (userData) {
                    setUser(userData);
                } else {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setCheckingAuth(false);
        });

        // When this component is done (unmounted or cleaned up), please stop listening to authentication changes.
        return () => unsubscribe();
    }, []);

    // Sign Up function
    const signUp = async (email, password) => {
        try {
            setIsSigningUp(true);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Create user profile in Firestore
            const userData = {
                userId: userCredential.user.uid,
                email: email,
                username: "",
                phoneNumber: "",
                DOB: "",
                image: "",
                accountCreatedAt: userCredential.user.metadata.creationTime,
            };
            await addData(userData);
            setUser(userData);
            toast.success("Signup successful!");
            navigate("/profile");
        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    toast.error("E-mail already in use");
                    break;
                case "auth/weak-password":
                    toast.error("Password should contain at least 6 characters");
                    break;
                default:
                    toast.error("Signup failed. Please try again later.");
                    break;
            }
        } finally {
            setIsSigningUp(false);
        }
    };

    // Login function
    const login = async (email, password) => {
        try {
            setIsLoggingIn(true);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Fetch user data from Firestore
            const userData = await fetchUserById(userCredential.user.uid);

            setUser(userData);
            toast.success("Login successful!");
            navigate('/profile');
        } catch (error) {
            console.log(error);
            switch (error.code) {
                case "auth/invalid-credential":
                    toast.error("Invalid credentials");
                    break;
                default:
                    toast.error("Login failed. Please try again later.");
                    break;
            }
        } finally {
            setIsLoggingIn(false);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            console.log(error);
            toast.error("Failed to logout. Try again.");
        }
    };

    // Add or update user data in Firestore
    const addData = async (userData) => {
        try {
            const userRef = doc(db, "Auth-Portal", userData.userId);
            await setDoc(userRef, userData, { merge: true });
        } catch (e) {
            console.log(error);
        }
    };

    // Fetch user data from Firestore
    const fetchUserById = async (userId) => {
        try {
            const userRef = doc(db, "Auth-Portal", userId);
            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such user found!");
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    // Update user profile in Firestore
    const updateUserProfile = async (formData) => {
        try {
            setUpdatingProfile(true);
            const imgUrl = await uploadImage();

            const updatedUserData = {
                userId: user.userId,
                email: user.email,
                username: formData.username.trim(),
                phoneNumber: formData.mobile,
                DOB: formData.DOB,
                image: imgUrl || user.image,
                accountCreatedAt: user.accountCreatedAt,
            };

            await addData(updatedUserData);

            setUser(updatedUserData);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update profile.");
        } finally {
            setUpdatingProfile(false);
        }
    };

    // upload image to cloudinary
    const uploadImage = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

        try {
            console.log('uploading image...');
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`, formData);

            console.log('image uploaded');
            setImage(null);
            return response.data.secure_url;
        } catch (error) {
            toast.error('Failed to upload image');
            console.error(error);
            return null;
        }
    };

    // google login / signup
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userRef = doc(db, "Auth-Portal", result.user.uid);
            const userSnap = await getDoc(userRef);

            // User already exists, load their data
            if (userSnap.exists()) {
                setUser(userSnap.data());
            } else {
                // New user, create a profile
                const userData = {
                    userId: result.user.uid,
                    email: result.user.email,
                    username: "",
                    phoneNumber: "",
                    DOB: "",
                    image: "",
                    accountCreatedAt: result.user.metadata.creationTime,
                };

                await addData(userData);
                setUser(userData);
            }

            toast.success("Signup successful!");
            navigate("/profile");
        } catch (error) {
            console.error("Error during Google Sign-In:", error);
        }
    };

    // password reset using email
    const resetPassword = async (email) => {
        try {
            // Check if the user exists in Firestore
            const user = await getUserByEmail(email);

            if (!user) {
                toast.error("No user found with this email.");
                return;
            }

            // If the user exists, send the password reset email
            await sendPasswordResetEmail(auth, email);
            toast.success("Password reset email sent! Check your inbox.");
        } catch (error) {
            console.error("Error resetting password:", error);
            if (error.code === "auth/user-not-found") {
                toast.error("No user found with this email.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email address.");
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    // Checking for user in Firestore by email
    const getUserByEmail = async (email) => {
        try {
            // Reference to the 'Auth-Portal' collection
            const usersRef = collection(db, "Auth-Portal");
            const q = query(usersRef, where("email", "==", email)); // Query to find user by email

            // Execute the query and get the documents
            const querySnapshot = await getDocs(q);

            // Check if there is at least one matching document
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data();
            }

            // If no user found
            return null;
        } catch (error) {
            console.error("Error getting user by email:", error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{
            signUp, login, logout, updateUserProfile,
            user, isSigningUp, isLoggingIn, checkingAuth, updatingProfile,
            setImage,
            handleGoogleSignIn, resetPassword,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
