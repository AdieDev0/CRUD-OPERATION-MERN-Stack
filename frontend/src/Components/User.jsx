import React from "react";

const User = () => {
  return (
    <div className="flex flex-col items-center p-20 bg-white rounded-3xl">
      <h1 className="text-3xl font-semibold mb-10">
        CRUD OPERATION MERN STACK
      </h1>
      <button className="bg-blue-700 w-32 h-12 mb-6 rounded-2xl text-white font-medium hover:bg-blue-600 transition duration-150">
        Add Person
      </button>
      <table className="table-auto w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-700 text-white">
            <th scope="col" className="px-4 py-2">
              S.No
            </th>
            <th scope="col" className="px-4 py-2">
              Name
            </th>
            <th scope="col" className="px-4 py-2">
              Email
            </th>
            <th scope="col" className="px-4 py-2">
              Address
            </th>
            <th scope="col" className="px-4 py-2">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 hover:bg-gray-200 transition duration-150">
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">John</td>
            <td className="border px-4 py-2">John@gmail.com</td>
            <td className="border px-4 py-2">Philippines</td>
            <td className="border px-4 py-2">
              <button className="text-blue-500 hover:text-blue-700 transition duration-150">
                Update
              </button>{" "}
              |
              <button className="text-red-500 hover:text-red-700 transition duration-150">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
