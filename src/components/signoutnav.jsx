import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged } from "@firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOutUser = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const auth = getAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsSignedIn(!!user);
        });

        // Unsubscribe from the auth listener on unmount
        return () => unsubscribe();
    }, [auth]);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/');
            console.log('signed out');
        }).catch((error) => {
            console.log(error.message);
        });

    };

        const handleHomeClick = () => {
            navigate('/mainpage');
        }
        
    return (
        <div className={`flex justify-end bg-yellow-500 ${isSignedIn ? '' : 'hidden'}`}>
            <nav>
                <button className="text-lg font-bold mr-3" onClick={handleHomeClick} >Home</button>
                <button onClick={handleSignOut} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-1 rounded">
                    Sign Out
                </button>
            </nav>
        </div>
    );
};

export default SignOutUser;
