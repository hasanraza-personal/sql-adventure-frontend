import React, { useState } from "react";
import { Context } from "../context/ContextProvider";
import { Link } from "react-scroll";
import { useNavigate, Link as RLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger & Close Icons

const Navbar = () => {
  const navigate = useNavigate();
  const { isLogin, setLoginModal } = React.useContext(Context);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md shadow-md z-50">
      <div className="flex pl-6 pr-10 py-4 items-center justify-between max-w-[1200px] mx-auto">
        {/* Brand Name */}
        <div
          onClick={() => navigate("/")}
          className="text-white text-xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
        >
          SQL Adventure
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-10">
          <NavItem to="/">HOME</NavItem>
          <NavItem to="about">ABOUT</NavItem>
          <NavItem to="quiz">QUIZ</NavItem>
          <NavItem to="leaderboard">LEADERBOARD</NavItem>
          <NavItem to="howtoplay">HOW TO PLAY</NavItem>
        </div>

        {/* Profile/Login Button */}
        <div
          className="hidden md:block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200 cursor-pointer"
          onClick={() =>
            isLogin ? navigate("/profile") : setLoginModal((prev) => !prev)
          }
        >
          {isLogin ? "PROFILE" : "LOGIN/SIGNUP"}
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div
          className="md:hidden text-white text-3xl cursor-pointer"
          onClick={() => setIsSidebarOpen(true)}
        >
          <FiMenu />
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* // Sidebar Navigation (LEFT SIDE) */}
      <div
        className={`fixed top-0 left-0 w-[250px] h-full bg-gray-900 text-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <FiX
            className="text-2xl cursor-pointer hover:opacity-80"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col gap-6 text-lg text-center font-medium h-screen bg-black">
          <SidebarItem to="/" setIsSidebarOpen={setIsSidebarOpen}>
            HOME
          </SidebarItem>
          <SidebarItem to="about" setIsSidebarOpen={setIsSidebarOpen}>
            ABOUT
          </SidebarItem>
          <SidebarItem to="quiz" setIsSidebarOpen={setIsSidebarOpen}>
            QUIZ
          </SidebarItem>
          <SidebarItem to="leaderboard" setIsSidebarOpen={setIsSidebarOpen}>
            LEADERBOARD
          </SidebarItem>
          <SidebarItem to="howtoplay" setIsSidebarOpen={setIsSidebarOpen}>
            HOW TO PLAY
          </SidebarItem>

          {/* Profile/Login Button (Mobile) */}
          <div
            className="mt-8 mx-auto w-40 bg-blue-600 text-white px-4 py-2 rounded-lg text-center cursor-pointer hover:bg-blue-500 transition duration-200"
            onClick={() => {
              setIsSidebarOpen(false);
              isLogin ? navigate("/profile") : setLoginModal((prev) => !prev);
            }}
          >
            {isLogin ? "PROFILE" : "LOGIN/SIGNUP"}
          </div>
        </div>
      </div>
    </div>
  );
};

// Desktop Nav Item Component
// eslint-disable-next-line react/prop-types
const NavItem = ({ to, children }) => {
  return (
    <div
      className="cursor-pointer text-white text-lg font-semibold hover:text-blue-400 transition"
      onClick={() => console.log("hi")}
    >
      {to === "about" || to === "howtoplay" || to === "/" ? (
        <RLink to={to}>{children}</RLink>
      ) : (
        <Link to={to} smooth={true} duration={1000}>
          {children}
        </Link>
      )}
    </div>
  );
};

// Sidebar Nav Item Component
// eslint-disable-next-line react/prop-types
const SidebarItem = ({ to, children, setIsSidebarOpen }) => {
  // console.log("to: ", to);
  function handleCloseSideNarbar() {
    // console.log("CLicked");
    setIsSidebarOpen(false);
  }

  return (
    <div
      className="cursor-pointer px-4 py-3 bg-gray-800 rounded-md text-white transition duration-300 hover:bg-blue-600 hover:text-white"
      onClick={handleCloseSideNarbar}
    >
      {to === "about" || to === "howtoplay" || to === "/" ? (
        <RLink to={to}>{children}</RLink>
      ) : (
        <Link to={to} smooth={true} duration={1000}>
          {children}
        </Link>
      )}
    </div>
  );
};

export default Navbar;
