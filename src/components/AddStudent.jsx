import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

const AddStudent = () => {
  const [currentUser, setcurrentUser] = useState(null);
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    branch: "",
  });

  const studentRef = collection(db,"students");
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
    });

    return () => unsubscribe();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();    
    try {
        console.log({...formData,userId:auth?.currentUser?.uid});
      
        await addDoc(studentRef,{...formData,userId:auth?.currentUser?.uid})
        alert("Student information submitted successfully!");
    } catch (error) {
        console.log(error)        
    } finally {
    setFormData({
      name: "",
      enrollment: "",
      branch: "",
    }) 
    navigate('/list-students')
    }
    
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter student name"
          />
        </div>

        {/* Enrollment Field */}
        <div className="mb-4">
          <label
            htmlFor="enrollment"
            className="block text-gray-700 font-medium mb-2"
          >
            Enrollment
          </label>
          <input
            type="text"
            id="enrollment"
            name="enrollment"
            value={formData.enrollment}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter enrollment number"
          />
        </div>

        {/* Branch Field */}
        <div className="mb-6">
          <label
            htmlFor="branch"
            className="block text-gray-700 font-medium mb-2"
          >
            Branch
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter branch"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 shadow-md outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
