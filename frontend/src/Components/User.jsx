import React from "react";

const User = () => {
  return (
    <div className="flex justify-center p-20">
      <table className="table-auto w-full max-w-4xl shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-500 text-white">
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
          <tr className="bg-gray-100 hover:bg-gray-200">
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">John</td>
            <td className="border px-4 py-2">John@gmail.com</td>
            <td className="border px-4 py-2">Philippines</td>
            <td className="border px-4 py-2">
              <button className="text-blue-500 hover:underline">Update</button>{" "}
              | <button className="text-red-500 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default User;
