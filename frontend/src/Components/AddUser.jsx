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
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7000/api/user", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Add New User</h1>
        <form action="" className="space-y-4" onSubmit={submitForm}>
          {/* BACK BUTTON */}
          <div className="flex justify-end">
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full shadow-md transition duration-300">
                Back
              </button>
            </Link>
          </div>
          {/* NAME */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-sm mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={inputHandler}
              placeholder="Enter your Name"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          {/* EMAIL */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-sm mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={inputHandler}
              placeholder="Enter your Email"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          {/* ADDRESS */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium text-sm mb-1">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              onChange={inputHandler}
              placeholder="Enter your Address"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-400 text-white px-8 py-2 rounded-full shadow-md transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
