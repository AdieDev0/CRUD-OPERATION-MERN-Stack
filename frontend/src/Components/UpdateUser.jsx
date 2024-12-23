import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/user/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:7000/api/update/user/${id}`, user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.", { position: "top-right" });
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Update User</h1>
        <form className="space-y-4" onSubmit={submitForm}>
          <div className="flex justify-end">
            <Link to="/">
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-full shadow-md transition duration-300">
                Back
              </button>
            </Link>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-sm mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={user.name}
              name="name"
              onChange={inputHandler}
              placeholder="Enter your Name"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-sm mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={user.email}
              name="email"
              onChange={inputHandler}
              placeholder="Enter your Email"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium text-sm mb-1">Address:</label>
            <input
              type="text"
              id="address"
              value={user.address}
              name="address"
              onChange={inputHandler}
              placeholder="Enter your Address"
              required
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-400"
            />
          </div>
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

export default UpdateUser;
