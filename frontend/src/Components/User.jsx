import React, { useEffect, useState } from "react";
import { Pencil, Trash2, UserPlus, Loader2, ChevronDown } from "lucide-react";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:7000/api/users");
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggleRow = (index) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-auto p-4">
        <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
          <div className="text-center text-red-500">
            <p className="text-lg font-semibold">Error loading users</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
              User Management
            </h1>
            <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <UserPlus className="w-5 h-5 mr-2" />
              <span>Add User</span>
            </button>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <table className="w-full border-collapse hidden sm:table">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 hidden md:table-cell">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 hidden lg:table-cell">
                        Address
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user, index) => (
                      <tr
                        key={user._id || index}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-4 py-3 text-sm text-gray-500 hidden md:table-cell">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {user.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                          {user.address}
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-50"
                            aria-label="Edit user"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-50"
                            aria-label="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Mobile Card View */}
                <div className="sm:hidden space-y-4">
                  {users.map((user, index) => (
                    <div
                      key={user._id || index}
                      className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <div
                        className="p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleRow(index)}
                      >
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-500 transition-transform ${
                            expandedRows.has(index)
                              ? "transform rotate-180"
                              : ""
                          }`}
                        />
                      </div>

                      {expandedRows.has(index) && (
                        <div className="px-4 pb-4 space-y-3 border-t border-gray-200">
                          <div className="pt-3">
                            <p className="text-sm font-medium text-gray-500">
                              Address
                            </p>
                            <p className="text-sm text-gray-900">
                              {user.address}
                            </p>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <button className="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors rounded-md hover:bg-blue-50">
                              <Pencil className="w-4 h-4 mr-1" />
                              Edit
                            </button>
                            <button className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors rounded-md hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
