import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
//   const [redirectToPetInfoForm, setRedirectToPetInfoForm] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.vaule);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
        if (!email) {
            console.error("Email is required");
            return;
        }

        if (!password) {
            console.error("Password is required");
            return;
        }

        if (password.length < 6) {
            console.error("Password must be at least 6 characters long");
            return;
        }

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/petinfoform");
                console.log("Signed up successfully");
            });
    } catch (error) {
        console.log("Sign up error", error.code, error.message);
        switch (error.code) {
            case "auth/email-already-in-use":
                console.error("Email already in use");
                break;
            case "auth/weak-password":
                console.error("Password is too weak");
                break;
            default:
                console.error("Sign up failed");
        }
    }
};

    // if(redirectToPetInfoForm){
    //     return < Navigate to="/petinfoform" />
    // };

  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password || ""}
              onChange={handlePasswordChange}
            />
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword || ""}
                onChange={handleConfirmPasswordChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
        <p>
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
