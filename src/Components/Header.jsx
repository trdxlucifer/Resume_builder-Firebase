import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import SignOut from "../SignInSignUp/SignOut";

const Header = () => {
  const [PageState, setPageState] = useState("Sign In");

  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth()

  function pathMatch(route) {
    if (route === location.pathname) {
      return true;
    }
  }

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{

      if(user){
        setPageState("Profile");}
        else{
          setPageState("Sign In");
        }

    })
  },[auth])

  return (
    <div className="bg-white border-b-0 shadow-sm sticky top-0 z-40 ">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://cdn3.careeraddict.com/uploads/article/59032/illustration-woman-laptop-cv.jpg"
            alt="logo"
            className="h-8 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10 ">
            <li
              className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
              ${pathMatch("/") && "text-black border-b-red-500"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            {/* <li
              className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent  ${
                pathMatch("/profile") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              Profile
            </li> */}

            <li
              className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent  ${
                pathMatch("/contact") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </li>

            <li
              className={` cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent 
               ${
                 (pathMatch("/sign") || pathMatch("/profile")) &&
                 "text-black border-b-red-500"
               }`}
              onClick={() => navigate("/profile")}
            >
              {PageState}
            </li>
            
          
            <li>
              <SignOut/>
              </li>    

           
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
