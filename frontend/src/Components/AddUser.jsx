import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion"; // Import framer-motion

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
    <motion.div
      className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen flex items-center justify-center"
      initial={{ opacity: 0 }} // Animation starts with 0 opacity
      animate={{ opacity: 1 }} // Animates to full opacity
      transition={{ duration: 0.5 }} // Duration of the transition
    >
      <motion.div
        className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8"
        initial={{ y: -50 }} // Starts off-screen
        animate={{ y: 0 }} // Animates to its natural position
        transition={{ duration: 0.5 }} // Duration of the transition
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-center mb-6 font-Work-Sans">
          Add New User
        </h1>

        {/* Form */}
        <form className="space-y-6" onSubmit={submitForm}>
          {/* Back Button */}
          <div className="flex justify-end">
            <Link to="/">
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-500 text-white font-Work-Sans px-4 py-2 rounded-lg shadow-md transition duration-300"
              >
                Back
              </button>
            </Link>
          </div>

          {/* Name Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }} // Starts invisible
            animate={{ opacity: 1 }} // Becomes visible
            transition={{ duration: 0.3, delay: 0.1 }} // Slight delay for a staggered effect
          >
            <label
              htmlFor="name"
              className="font-medium text-sm mb-1 font-Work-Sans"
            >
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
              className="font-Work-Sans border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <label
              htmlFor="email"
              className="font-medium text-sm mb-1 font-Work-Sans"
            >
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
              className="font-Work-Sans border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </motion.div>

          {/* Address Field */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <label
              htmlFor="address"
              className="font-medium text-sm mb-1 font-Work-Sans"
            >
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
              className="font-Work-Sans border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400 focus:ring focus:ring-blue-200"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-green-400" : "bg-green-600 hover:bg-green-500"
              } text-white px-8 py-2 rounded-lg shadow-md transition duration-300 font-Work-Sans`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddUser;
