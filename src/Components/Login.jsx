import React, { useState } from "react";
import axios from "axios";
import { Context } from "../context/ContextProvider";

const Login = () => {
  const { isLogin, Login } = React.useContext(Context);
  // State variables for input values
  //   const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Email:", email, "Password:", password);

      const res = await Login(email, password);

      // Reset input values after successful registration
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error);
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Hello
          </button>
        </div>
      </form>

      {/* <button
            // onClick={checkQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Quiz
          </button>
            <p>Count : {count}</p>
            <p>Question : {question}</p>

            <p>Options : {arr}</p>
            <p>Correct Answer : {corr}</p>
             */}
    </div>
  );
};

export default Login;
