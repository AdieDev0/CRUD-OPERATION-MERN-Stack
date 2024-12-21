import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      {
        try {
          const response = await axios.get("http://localhost:7000/api/users");
          setUsers(response.data);
        } catch (error) {
          console.log("Error while fetching data", error);
        }
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex flex-col items-center p-20 bg-gray-50 rounded-3xl min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        CRUD Operation MERN Stack
      </h1>
      <button className="bg-blue-600 w-32 h-12 mb-8 rounded-xl text-white font-semibold hover:bg-blue-500 transition duration-150">
        Add Person
      </button>
      <table className="table-auto w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th scope="col" className="px-6 py-3">
              S.No
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Address
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr className="bg-gray-100 hover:bg-gray-200 transition duration-150">
                <td className="border px-6 py-3 text-center">{index + 1}</td>
                <td className="border px-6 py-3">{user.name}</td>
                <td className="border px-6 py-3">{user.email}</td>
                <td className="border px-6 py-3">{user.address}</td>
                <td className="border px-6 py-3 text-center">
                  <button className="text-blue-500 hover:text-blue-700 transition duration-150 mr-2">
                    <FaRegEdit size={20} />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition duration-150">
                    <TbTrash size={20} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default User;
