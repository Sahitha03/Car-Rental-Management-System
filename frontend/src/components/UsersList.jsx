import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6" style={{paddingTop:"100px"}}>
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Users List</h1>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">ID</th>
              <th className="border p-3">Username</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Role</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className="text-center"> {/* FIXED `_id` */}
                  <td className="border p-3">{user._id}</td>
                  <td className="border p-3">{user.username}</td>
                  <td className="border p-3">{user.email}</td>
                  <td className="border p-3">{user.role}</td>
                  <td className="border p-3">
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <button
          onClick={() => navigate("/admin")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default UsersList;
