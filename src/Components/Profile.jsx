import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import AvatarGen from "./AvatarGen";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import axios from "axios";

// const server = "http://localhost:3000";
const server = "https://sql-adventure-backend.onrender.com";

const Profile = () => {
  const { isLogin, isLoggedIn, user, logout, setIsLogin } =
    React.useContext(Context);
  const navigate = useNavigate();
  const [gameData, setGameData] = useState([]);
  console.log("gameData: ", gameData);

  function handleLogout() {
    console.log("Clicked");
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  }

  // console.log("isLogin: ", isLogin);
  useEffect(() => {
    // console.log("userdata in profile", user, isLogin);
    isLoggedIn();

    if (!user) {
      isLoggedIn();
    }
  }, []);

  async function getGameData() {
    try {
      const response = await axios.post(`${server}/getGameQuestion`, {
        userId: user._id,
      });
      console.log("response: ", response);
      setGameData(response.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getGameData();
  }, [user]);

  return (
    <div className="bg-[#1a1a1a] min-h-screen w-full overflow-hidden py-10">
      {/* Navbar */}
      <div onClick={() => navigate("/")}>
        <Navbar />
      </div>

      {/* Profile Section */}
      <div className="mt-10 flex flex-col items-center">
        {/* Profile Card */}
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col items-center">
          <div className="relative w-[150px] h-[150px] rounded-full bg-gray-700 flex items-center justify-center border-[3px] border-blue-400">
            {isLogin && <AvatarGen />}
          </div>

          <h2 className="mt-4 text-3xl font-semibold text-white">
            {user?.name}
          </h2>
          <p className="text-lg text-gray-400">SQL Enthusiast</p>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 hover:bg-red-600 transition-all duration-300 px-6 py-3 text-lg font-semibold text-white rounded-lg shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quiz History */}
      <div className="w-full flex flex-col items-center mt-12">
        <h3 className="text-2xl font-semibold text-blue-300">Quiz History</h3>
        <div className="grid w-[92%] md:grid-cols-2 lg:grid-cols-3 place-items-center justify-items-center gap-8 p-5 mx-auto">
          {gameData?.length > 0 ? (
            gameData.map((quiz, index) => (
              <ProfileCard
                key={index}
                quiz={quiz}
                index={gameData.length - index - 1}
              />
            ))
          ) : (
            <p className="text-blue-300 text-lg">No quizzes attempted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
