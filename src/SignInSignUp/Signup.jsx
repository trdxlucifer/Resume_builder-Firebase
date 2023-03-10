import React, { useState } from "react";
import { toast } from "react-toastify";

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import OAuth from "./OAuth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../Firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const useCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      updateProfile(auth.currentUser, {
        displayName: name,
      });
      const user = useCredential.user;
      const formDataCopy = { ...formData };
      delete formData.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);
      toast.success("🙌🙌 Signed in Success");
      navigate("/");
    } catch (err) {
      toast.error("🤷‍♀️🤷‍♂️Something Went Wrong");
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 ">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto ">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8a2V5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60"
            alt="key"
            className="w-full rounded-3xl "
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange}
              placeholder="Full name"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out"
            />
            <input
              type="email"
              className=" mb-6 w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-md transition-ease-in-out"
              value={email}
              id="email"
              onChange={handleChange}
              placeholder="Email address"
            />

            <div className="relative mb-6">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 text-xl text-gray-600 bg-white border-gray-300 rounded-md transition-ease-in-out"
                value={password}
                id="password"
                onChange={handleChange}
                placeholder="Password"
              />
              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <span className="mb-6">
                Have an Account?
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to="/sign"
                >
                  Sign In{" "}
                </Link>
              </span>
              <span>
                <Link
                  to="/forgot"
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                >
                  Forgot Password?
                </Link>
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-7 py-3 text-small font-medium uppercase shadow-md rounded-xl hover:bg-blue-700 transition duration-150  ease-in-out hover:shadow-xl active:bg-blue-800"
            >
              Sign Up{" "}
            </button>
            <div className="my-4 before:border-t items-center flex before:flex-1  before:border-gray-300  after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center font-semibold mx-4"> OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
