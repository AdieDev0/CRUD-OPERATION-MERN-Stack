import React from "react";

const AddUser = () => {
  return (
    <div>
      <div>
        <h1>Add New User</h1>
        <form action="">
          {/* NAME */}
          <div>
            <label htmlFor="">Name:</label>
            <input type="text" placeholder="Enter your Name" required />
          </div>
          {/* EMAIL */}
          <div>
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Enter your Email" required />
          </div>
          {/* ADDRESS */}
          <div>
            <label htmlFor="">Address:</label>
            <input type="text" placeholder="Enter your Address" required />
          </div>
          {/* BUTTON */}
          <div>
            <button className="bg-blue-700 hover:bg-blue-600 px-8 py-2 rounded-xl">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
