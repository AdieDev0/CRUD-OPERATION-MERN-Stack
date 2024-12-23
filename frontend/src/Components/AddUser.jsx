import React from "react";
import { Link } from "react-router-dom";

const AddUser = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Add New User</h1>
        <form action="" className="space-y-6">
          {/* BACK BUTTON */}
          <div className="flex justify-end">
            <Link to="/">
              <button className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
                Back
              </button>
            </Link>
          </div>
          {/* NAME */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-semibold text-lg mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your Name"
              required
              className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* EMAIL */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold text-lg mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              required
              className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* ADDRESS */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-semibold text-lg mb-2">
              Address:
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter your Address"
              required
              className="border-2 border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div className="flex justify-center">
            <button className="bg-green-600 hover:bg-green-500 text-white px-10 py-3 rounded-full shadow-md transition duration-300">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
