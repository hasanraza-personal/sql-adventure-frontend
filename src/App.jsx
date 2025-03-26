// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import RegistrationForm from './Components/RegistrationForm';
// import Login from './Components/Login';
import { QuizProvider } from "./context/ContextProvider";
// import Dashboard from "./Components/Dashboard";
import MainPage from "./Components/MainPage";
// import AuthForm from "./Components/AuthForm";
// import MainQuiz from "./Components/MainQuiz";
// import Feedback from "./Components/Feedback";
import Profile from "./Components/Profile";
import AboutUs from "./Components/AboutUs";
import HowToPlay from "./Components/HowToPlay";
import MainQuizCustom from "./Components/MainQuizCustom";
import ContextProviderCustom from "./context/ContextProviderCustom";
import { SocketProvider } from "./context/SocketContext";

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <ContextProviderCustom>
          <SocketProvider>
            <Routes>
              <Route path="/" element={<MainPage /*state = {state}*/ />} />
              {/* <Route path="/login" element={<Login />} /> */}
              {/* <Route path="/dash" element={<MainQuiz />} /> */}
              <Route path="/dash" element={<MainQuizCustom />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/howtoplay" element={<HowToPlay />} />
            </Routes>
          </SocketProvider>
        </ContextProviderCustom>
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;
