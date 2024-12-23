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
        {
          method: "DELETE",
        }
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
      updatedRows.has(index) ? updatedRows.delete(index) : updatedRows.add(index);
      return updatedRows;
    });
  };

  const UserRow = ({ user, index }) => (
    <motion.tr
      className="hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <td className="px-4 py-3 hidden md:table-cell">{index + 1}</td>
      <td className="px-4 py-3 text-gray-900">{user.name}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className="px-4 py-3 hidden lg:table-cell">{user.address}</td>
      <td className="px-4 py-3 text-right space-x-2">
        <Link
          to={`/update-user/${user._id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
          aria-label="Edit user"
        >
          ✏️
        </Link>
        <button
          onClick={() => deleteUser(user._id)}
          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50"
          aria-label="Delete user"
        >
          🗑️
        </button>
      </td>
    </motion.tr>
  );

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
            <div className="overflow-x-auto">
              <table className="w-full border-collapse hidden sm:table">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-3 hidden md:table-cell">#</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3 hidden lg:table-cell">Address</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <UserRow key={user._id || index} user={user} index={index} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default User;
