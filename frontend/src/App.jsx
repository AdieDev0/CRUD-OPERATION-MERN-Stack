import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./Components/User";
import AddUser from "./Components/AddUser";
import UpdateUser from "./Components/UpdateUser";

const App = () => {
  return (
    <Router>
      <div className="min-w-full min-h-screen bg-blue-200 p-5 md:p-10 lg:p-20">
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/update-user/:id" element={<UpdateUser />} /> {/* Updated */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
