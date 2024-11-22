import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { auth } from "../config/firebase";

const Nav = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [currentUser, setcurrentUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      if(user) setisLoggedIn(true)
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logout successful!");
    } catch (e) {
      console.error(e);
    } finally {
      setisLoggedIn(false)
      setcurrentUser(null)
      navigate("/");
    }
  };


  return (
    <nav className="bg-blue-500 text-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1
              className="text-2xl font-bold cursor-pointer"
              onClick={() => navigate("/")}
            >
              {currentUser?.displayName.split(" ")[0] || "Student"}App
            </h1>
          </div>

          {/* Navigation Links */}
          <div className={`${!isLoggedIn && 'hidden' }  space-x-8`}>
                      
            <Link to="/dashboard"  className="hover:underline">
              Dashboard
            </Link>            
            <button
              className="hover:underline"
              onClick={() => navigate("/add-student")}
            >
              Add Student
            </button>          
            <button
              className="hover:underline"
              onClick={() => navigate("/list-students")}
            >
              List All Students
            </button>
          </div>

          {isLoggedIn ? (
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-md"
              onClick={()=>navigate('/')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
