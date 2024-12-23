import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:7000/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/delete/user/${userId}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      const result = await response.json();
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(result.message || "User deleted successfully");
    } catch (err) {
      toast.error(err.message || "Error deleting user");
    }
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) => {
      const updatedRows = new Set(prev);
      updatedRows.has(index)
        ? updatedRows.delete(index)
        : updatedRows.add(index);
      return updatedRows;
    });
  };

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <Link
            to="/add-user"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </Link>
        </header>
        <main className="p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-500">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <motion.div
              className="flex flex-col items-center justify-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-500">No users found.</p>
              <Link
                to="/add-user"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create User
              </Link>
            </motion.div>
          ) : (
            <div>
              {/* Table View for Large Screens */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 hidden md:table-cell">#</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3 hidden lg:table-cell">
                        Address
                      </th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <motion.tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <td className="px-4 py-3 hidden md:table-cell">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3">{user.name}</td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3 hidden lg:table-cell">
                          {user.address}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end space-x-3">
                            <Link
                              to={`/update-user/${user._id}`}
                              aria-label="Edit User"
                              className="text-white bg-blue-600 hover:bg-blue-400 duration-200 w-20 h-8 flex items-center justify-center text-sm rounded-lg border"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => deleteUser(user._id)}
                              aria-label="Delete User"
                              className="w-20 h-8 flex items-center justify-center text-red-600 border hover:bg-red-600 hover:text-white border-red-600 duration-200 rounded-lg text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Card View for Mobile */}
              <div className="block sm:hidden space-y-4">
                {users.map((user, index) => (
                  <motion.div
                    key={user._id}
                    className="bg-gray-50 p-4 rounded-lg shadow-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{user.name}</h3>
                      <button
                        onClick={() => toggleRow(index)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {expandedRows.has(index) ? "▲" : "▼"}
                      </button>
                    </div>
                    {expandedRows.has(index) && (
                      <div className="mt-2 text-sm text-gray-700 space-y-2">
                        <p>Email: {user.email}</p>
                        <p>Address: {user.address}</p>
                        <div className="flex justify-end space-x-2">
                          <Link
                            to={`/update-user/${user._id}`}
                            className="text-white bg-blue-500 border hover:bg-blue-400 duration-200 w-16 h-6 text-center rounded-lg"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="w-16 h-6 text-red-600 text-center border hover:text-white hover:bg-red-600 border-red-600 duration-200 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default User;
