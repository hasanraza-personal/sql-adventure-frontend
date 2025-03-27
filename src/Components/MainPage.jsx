import React, { useState } from "react";
import Navbar from "./Navbar";
import TableRow from "./TableRow";
import "./css/Mainpage.css";
import { Context } from "../context/ContextProvider";
import AuthForm from "./AuthForm";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

const MainPage = () => {
  const { isLogin, loginModal, fetchLeaderboardArr } =
    React.useContext(Context);
  const navigate = useNavigate();

  const [isAlertSuccess, setIsAlertSuccess] = useState(false);
  const [successAlertContent, setSuccessAlertContent] = useState("");
  const [infoAlertContent, setInfoAlertContent] = useState("");
  const [isAlertInfo, setIsAlertInfo] = useState(false);
  const [errorAlertContent, setErrorAlertContent] = useState("");
  const [isAlertError, setIsAlertError] = useState(false);

  const showSuccessPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setSuccessAlertContent(successMessage);
    setIsAlertSuccess(true);
    setTimeout(() => {
      setIsAlertSuccess(false);
    }, 5000);
  };

  const showInfoPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setInfoAlertContent(successMessage);
    setIsAlertInfo(true);
    setTimeout(() => {
      setIsAlertInfo(false);
    }, 5000);
  };

  const showErrorPopup = (successMessage) => {
    console.log("ShowSuccess", successMessage);
    setErrorAlertContent(successMessage);
    setIsAlertError(true);
    setTimeout(() => {
      setIsAlertError(false);
    }, 5000);
  };

  const redirectToDash = () => {
    if (!localStorage.getItem("token")) {
      return alert("Please login first");
    }
    navigate("/dash");
  };

  React.useEffect(() => {
    // console.log('inside mainpage leaderboard',fetchLeaderboardArr[0].playerName)
    // console.log('inside mainpage leaderboard',typeof(fetchLeaderboardArr))
    // console.log('inside mainpage leaderboard',fetchLeaderboardArr.length)
    if (isLogin === false && loginModal === true) {
      showInfoPopup("Please login to continue");
    }
  }, []);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* alert info */}
      <div
        className={`absolute z-20 w-full p-3 flex justify-center mt-15 ${
          isAlertInfo ? "flex" : "hidden"
        }`}
      >
        <Alert severity="info">{infoAlertContent}</Alert>
      </div>
      {/* alert info end */}
      {/* alert success */}
      <div
        className={`absolute z-20 w-full p-3 flex justify-center mt-20 ${
          isAlertSuccess ? "flex" : "hidden"
        }`}
      >
        <Alert severity="success">{successAlertContent}</Alert>
      </div>
      {/* alert success end */}
      {/* alert error */}
      <div
        className={`absolute z-20 w-full p-3 flex justify-center mt-20 ${
          isAlertError ? "flex" : "hidden"
        }`}
      >
        <Alert severity="error">{errorAlertContent}</Alert>
      </div>
      {/* alert error end */}
      {/* login/register modal */}
      <div
        className={` top-0 left-0 w-full h-full z-10 backdrop-filter backdrop-blur-lg ${
          loginModal ? "fixed" : "hidden"
        } `}
      >
        <div className="absolute w-[90%] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 mx-auto z-10 flex flex-col items-center justify-center min-h-[70vh] ">
          <AuthForm
            successPopup={showSuccessPopup}
            infoPopup={showInfoPopup}
            errorPopup={showErrorPopup}
          />
        </div>
      </div>

      <div>
        <Navbar />
      </div>

      {/* main section */}
      <div
        id="about"
        style={{
          backgroundImage: "url('https://i.ibb.co/1f0wG57S/new.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
          backgroundRepeat: "no-repeat",
        }}
        className="flex h-screen w-full"
      >
        <div className="md:w-fit  lg:w-[57rem] mt-[13.125rem] mx-auto relative text-[1.563rem] md:text-[1.763rem] lg:text-[2.375rem] font-press-start-2p text-center inline-block [text-shadow:1px_0_0_#000,_0_1px_0_#000,_-1px_0_0_#000,_0_-1px_0_#000] text-white">
          <span>{`A GAMIFIED `}</span>
          <span className="[text-decoration:underline] text-[#ffd600]">
            QUIZ
          </span>
          <span>{` PLATFORM `}</span>
        </div>
      </div>

      {/* 2nd main section */}
      <div
        id="quiz"
        className="flex relative w-full flex-col justify-center items-center h-max bg-black pt-[8.25rem] pl-0 pr-[0.0625rem] md:pb-[7.0625rem]"
      >
        {/* absolute images */}
        <img
          className="absolute left-20 md:top-[163px] object-cover w-[58px] h-[55px]"
          src="https://i.imgur.com/XFg3f8N.png"
          alt="Gem1"
        />
        <img
          className="absolute left-[430px] top-[600px] md:top-[482px] object-cover w-[44.48px] h-[48.19px]"
          src="https://i.imgur.com/PFYOrWp.png"
          alt="Gem2"
        />
        <img
          className="absolute right-2 md:left-[576px] top-[570px] md:top-[376px] object-cover w-[45px] h-[50px]"
          src="https://i.imgur.com/5F2LBQs.png"
          alt="Gem3"
        />
        <img
          className="absolute left-3 md:left-[499px] top-[600px] md:top-[52px] object-cover w-[57px] h-[49px]"
          src="https://i.imgur.com/6TUwUlu.png"
          alt="Gem4"
        />
        <img
          className="absolute left-20 md:right-[390px] top-[800px] md:top-[52px] object-cover w-[58px] h-[49px]"
          src="https://i.imgur.com/I2OhVwD.png"
          alt="Gem5"
        />
        <img
          className="absolute right-3 md:right-[28px] top-[711px] md:top-[76px] object-cover w-[45px] h-[48px]"
          src="https://i.imgur.com/569Ft22.png"
          alt="Gem6"
        />
        <img
          className="absolute right-[61px] top-[450px] object-cover w-[48px] h-[60px]"
          src="https://i.imgur.com/c9BRGGL.png"
          alt="Gem7"
        />
        <img
          className="absolute object-cover left-[-93px] top-[20px] -z-0 w-[917px] h-[652px]"
          src="https://i.imgur.com/RNcLBCZ.png"
          alt="white bg"
        />
        <div className="flex flex-wrap-reverse relative w-full  justify-evenly items-center ">
          <div className="relative">
            <img
              className="w-[389px] object-cover relative top-10 md:right-20 min-h-[389px]"
              src="https://i.imgur.com/adg4NjP.png"
              alt="Image of Mario 2"
            />
          </div>

          <div className="w-[92%] mx-auto lg:mx-0 lg:w-[43.1875rem] flex flex-col items-center p-[25px] relative rounded-[15px] bg-darkorchid-200 box-border h-max lg:h-[18.938rem]  text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
            <div className="w-[92%] mx-auto lg:w-[40.063rem] mt-4 mb-11 relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-left inline-block">
              <p className="m-0">
                Welcome to SQL Adventure, where knowledge meets fun! Join us for
                thrilling quizzes
              </p>
              <p className="m-0">&nbsp;</p>
              <p className="m-0">{`Let's quiz and conquer together!`}</p>
            </div>

            <div
              onClick={redirectToDash}
              id="startButton"
              className=" flex items-center justify-center relative     text-[1rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100"
            >
              <div className="">Start Quiz</div>
            </div>
          </div>
        </div>
      </div>

      {/* leaderboard */}
      <div
        id="leaderboard"
        className="flex pb-[14.875rem] flex-col items-center justify-center bg-black pt-[113px]"
      >
        {/* <div
          style={{
            backgroundImage: "url('https://i.imgur.com/27Nnpoh.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="flex mb-[56px] w-[325px] h-[60px] md:h-[79px] items-center justify-center"
        >
          <div className="w-[13.75rem] relative text-[1.25rem] font-press-start-2p text-white text-left inline-block">
            LEADERBOARD
          </div>
        </div>

        <div className="w-[92%] md:w-[717px]  relative rounded-[15px] bg-darkorchid-200 box-border max-h-[35.813rem] overflow-auto  text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
          <div className="absolute top-[-10.5rem] left-[-10.437rem] [filter:blur(411.3px)] rounded-[50%] bg-darkorchid-100 w-[24.5rem] h-[24.5rem]" />
          <div className="flex flex-col gap-0 text-white font-bold">
            <div className="flex h-20 border-b">
              <div className="w-[20%] border-r flex items-center justify-center">
                Rank
              </div>
              <div className="w-[60%] border-r flex items-center justify-center">
                Name
              </div>
              <div className="w-[20%] flex items-center justify-center">
                Score
              </div>
            </div>

            {fetchLeaderboardArr &&
              fetchLeaderboardArr.map((row, index) => (
                <TableRow
                  key={index}
                  Rank={Number(index + 1)}
                  Name={row.playerName}
                  Score={row.score}
                />
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainPage;
