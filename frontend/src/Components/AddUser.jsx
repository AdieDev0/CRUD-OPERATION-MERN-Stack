import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Validate form
    if (!user.name || !user.email || !user.address) {
      toast.error("All fields are required!", { position: "top-right" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:7000/api/user", user);
      toast.success(response.data.message || "User created successfully!", {
        position: "top-right",
      });
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create user. Try again!",
        { position: "top-right" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6">Add New User</h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={submitForm}>
          {/* Back Button */}
          <div className="flex justify-end">
            <Link to="/">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Back
              </button>
            </Link>
          </div>

          {/* Name Field */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-sm mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={inputHandler}
              placeholder="Enter your name"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-sm mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={inputHandler}
              placeholder="Enter your email"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Address Field */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium text-sm mb-1">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={user.address}
              onChange={inputHandler}
              placeholder="Enter your address"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-green-400" : "bg-green-500 hover:bg-green-400"
              } text-white px-8 py-2 rounded-lg shadow-md transition duration-300`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
