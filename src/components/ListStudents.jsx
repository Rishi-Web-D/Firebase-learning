import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

const ListStudents = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    name: "",
    enrollment: "",
    branch: "",
  });

  const studentRef = collection(db, "students");

  const GetAllStudents = async () => {
    try {
      const data = await getDocs(studentRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setStudents(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllStudents();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (confirmDelete) {
      try {
        const specificDoc = doc(db, "students", id);
        await deleteDoc(specificDoc);
      } catch (error) {
        console.log(error);
      } finally {
        const updatedStudents = students.filter((student) => student.id !== id);
        setStudents(updatedStudents);
      }
    }
  };

  const handleUpdate = (student) => {
    setCurrentStudent(student);
    setUpdatedData({
      name: student.name,
      enrollment: student.enrollment,
      branch: student.branch,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentDoc = doc(db, "students", currentStudent.id);
      await updateDoc(studentDoc, updatedData);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === currentStudent.id ? { ...student, ...updatedData } : student
        )
      );
      alert("Student updated successfully!");
    } catch (error) {   
      console.log(error);
    } finally {
      setIsModalOpen(false);
      setCurrentStudent(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">List of Students</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">#</th>
              <th className="border-b-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Name</th>
              <th className="border-b-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Enrollment</th>
              <th className="border-b-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Branch</th>
              <th className="border-b-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-200 px-4 py-2">{index + 1}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{student.name}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{student.enrollment}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{student.branch}</td>
                  <td className="border-b border-gray-200 px-4 py-2 items-center">
                    <button
                      onClick={() => handleUpdate(student)}
                      className="text-white mr-4 bg-blue-600 px-4 py-1 rounded-lg"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="text-white bg-red-600 px-4 py-1 rounded-lg"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Update */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Student</h2>
            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Enrollment</label>
                <input
                  type="text"
                  name="enrollment"
                  value={updatedData.enrollment}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Branch</label>
                <input
                  type="text"
                  name="branch"
                  value={updatedData.branch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListStudents;
