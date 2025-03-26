/* eslint-disable react/prop-types */
import "./css/AuthForm.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';
import { Context } from "../context/ContextProvider";

// const server = "http://localhost:3000";
const server = "https://sql-adventure-backend.onrender.com";

const AuthForm = (props) => {
  // const server = "https://quiz-v2.onrender.com";
  const { setLoginModal, Login, setIsLogin, setUser } =
    React.useContext(Context);
  const history = useNavigate();
  // State variables for input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleRegister = async () => {
    // e.preventDefault();
    try {
      if (name.trim().length === 0) {
        return props.errorPopup(
          "Name cannot be blank",
          "Please try again with a name"
        );
      } else if (email.trim().length === 0) {
        return props.errorPopup(
          "Email cannot be blank",
          "Please try again with a email"
        );
      } else if (password.trim().length === 0) {
        return props.errorPopup(
          "Password cannot be blank",
          "Please try again with a password"
        );
      } else if (password1.trim().length === 0) {
        return props.errorPopup(
          "Confirm password cannot be blank",
          "Please try again with a password"
        );
      }

      // Make POST request using Axios
      const response = await axios.post(`${server}/register`, {
        name,
        email,
        password,
      });
      console.log(response.data);
      if (response.data == 1) {
        // eslint-disable-next-line react/prop-types
        props.errorPopup(
          "Email already exists",
          "Please try again with a different email"
        );
      } else {
        // alert("Registration Successful");
        props.successPopup(
          "Registration Successful, You can now login to continue"
        );

        setName("");
        setEmail("");
        setPassword("");
        history("/");

        console.log("Registration successful:", response.data);
      }
    } catch (error) {
      props.errorPopup(error);
      console.error("Error registering user:", error);
    }
  };

  const handleLogin = async () => {
    // e.preventDefault();
    console.log("email: ", loginEmail);
    console.log("password: ", loginPassword);

    try {
      if (loginEmail.trim().length === 0) {
        return props.errorPopup(
          "Email cannot be blank",
          "Please try again with a email"
        );
      } else if (loginPassword.trim().length === 0) {
        return props.errorPopup(
          "Password cannot be blank",
          "Please try again with a password"
        );
      }

      const res = await Login(loginEmail, loginPassword, props.errorPopup);

      // Reset input values after successful registration
      if (res === true) {
        setEmail("");
        setPassword("");
        console.log("Login successful:", res);
        setLoginModal(false);
        props.successPopup("Login Successful");
        // setIsLogin(true);
        // setUser(res);
      }
    } catch (error) {
      props.errorPopup(error);
      console.error("Error registering user:", error);
    }
  };

  function handleCloseForm() {
    setName("");
    setEmail("");
    setPassword("");
    setLoginModal(false);
  }

  return (
    <div className=" ">
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input type="checkbox" className="toggle" />

            <span className="slider"></span>
            <span className="card-side"></span>
            <div className="flip-card__inner">
              <div className="flip-card__front w-[500px] rounded-[15px] bg-midnightblue box-border  overflow-hidden text-left text-[1rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100">
                <div className="flex items-center  justify-center mt-10 mb-8 mx-[180px] text-[1.25rem] leading-[166.21%] font-press-start-2p text-white text-left ">
                  LOGIN
                </div>
                <div
                  // onSubmit={handleLogin}
                  className="flip-card__form "
                  // action=""
                >
                  <input
                    id="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    type="email"
                  />
                  <input
                    id="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    name="password"
                    placeholder="PASSWORD"
                    type="password"
                  />
                  <div className="flex gap-10">
                    <button
                      onClick={handleCloseForm}
                      className="flip-card__btn rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-center text-[1rem] text-white p-2 font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleLogin}
                      className="flip-card__btn rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-center text-[1rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    >
                      LOGIN
                    </button>
                  </div>
                </div>
              </div>

              <div className="flip-card__back w-max rounded-[15px] bg-midnightblue box-border overflow-hidden text-left text-[1rem] text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100">
                <div className="flex items-center  justify-center mt-10 mb-8 mx-[180px] text-[1.25rem] leading-[166.21%] font-press-start-2p text-white text-left ">
                  Sign up
                </div>
                <div
                  // onSubmit={handleRegister}
                  className="flip-card__form"
                  // action=""
                >
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    placeholder="Name"
                    type="name"
                  />
                  <input
                    id="email1"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    name="email"
                    placeholder="Email"
                    type="email"
                  />
                  <input
                    id="password1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <input
                    id="password2"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    className="flip-card__input rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white placeholder:text-gray font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    name="password"
                    placeholder="Confirm Password"
                    type="password"
                  />
                  <div className="flex gap-10">
                    <button
                      onClick={handleCloseForm}
                      className="flip-card__btn rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-center text-[1rem] text-white p-2 font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleRegister}
                      className="flip-card__btn rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-center text-[1rem] text-white p-2 font-press-start-2p border-[1px] border-solid border-darkorchid-100"
                    >
                      Signup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
