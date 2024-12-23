import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Loader2, ChevronDown } from "lucide-react";
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
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:7000/api/delete/user/${userId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete user");
      const result = await response.json();
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success(result.message || "User deleted successfully", {
        position: "top-right",
      });
    } catch (err) {
      toast.error(err.message || "Error deleting user", {
        position: "top-right",
      });
      console.error(err);
    }
  };

  const toggleRow = (index) => {
    setExpandedRows((prev) => {
      const updatedRows = new Set(prev);
      updatedRows.has(index) ? updatedRows.delete(index) : updatedRows.add(index);
      return updatedRows;
    });
  };

  const rowStyles = "px-4 py-3 text-sm text-gray-500";

  const UserRow = ({ user, index }) => (
    <motion.tr
      className="hover:bg-gray-50 transition-colors"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <td className={`${rowStyles} hidden md:table-cell`}>{index + 1}</td>
      <td className={`${rowStyles} text-gray-900`}>{user.name}</td>
      <td className={rowStyles}>{user.email}</td>
      <td className={`${rowStyles} hidden lg:table-cell`}>{user.address}</td>
      <td className="px-4 py-3 text-right space-x-2">
        <Link
          to={`/update-user/${user._id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
          aria-label="Edit user"
        >
          <Pencil className="w-4 h-4" />
        </Link>
        <button
          onClick={() => deleteUser(user._id)}
          className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50"
          aria-label="Delete user"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </motion.tr>
  );

  const UserCard = ({ user, index }) => (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => toggleRow(index)}
      >
        <div>
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform ${
            expandedRows.has(index) ? "transform rotate-180" : ""
          }`}
        />
      </div>
      {expandedRows.has(index) && (
        <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
          <div>
            <p className="text-sm font-medium text-gray-500">Address</p>
            <p className="text-sm text-gray-900">{user.address}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <Link
              to={`/update-user/${user._id}`}
              className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors rounded-md hover:bg-blue-50"
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Link>
            <button
              onClick={() => deleteUser(user._id)}
              className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors rounded-md hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <header className="p-4 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            User Management
          </h1>
          <Link
            to="/add-user"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <UserPlus className="w-5 h-5 mr-2" />
            Add User
          </Link>
        </header>
        <main className="p-4 sm:p-6">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
                    <th className={`${rowStyles} hidden md:table-cell`}>#</th>
                    <th className={rowStyles}>Name</th>
                    <th className={rowStyles}>Email</th>
                    <th className={`${rowStyles} hidden lg:table-cell`}>Address</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <UserRow key={user._id || index} user={user} index={index} />
                  ))}
                </tbody>
              </table>
              <div className="sm:hidden space-y-4">
                {users.map((user, index) => (
                  <UserCard key={user._id || index} user={user} index={index} />
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
