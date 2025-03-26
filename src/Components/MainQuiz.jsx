import React, { useState } from "react";
import Navbar from "./Navbar";
import QuizTemplate from "./QuizTemplate";
import { Context } from "../context/ContextProvider";
import RadioButtons from "./RadioButton";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Feedback from "./Feedback";
// import TimeModal from "./TimeModal";

const MainQuiz = () => {
  const {
    isLogin,
    setLoginModal,
    feedbackModal,
    setFeedbackModal,
    feedbackText,
    quizData,
    checkQuiz,
    qMinutes,
    qSeconds,
    attemptedQuestions,
    setAttemptedQuestions,
  } = React.useContext(Context);

  const navigate = useNavigate();
  const TOTAL_TIME = 10; // Total time in minutes for the user to complete the test
  const [indexQuiz, setIndexQuiz] = React.useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [setshowLoader, setSetshowLoader] = useState(false);
  const [minutes, setMinutes] = useState(TOTAL_TIME); // Initial minutes
  const [seconds, setSeconds] = useState(0); // Initial seconds
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [quizMenu, setQuizMenu] = useState(false);
  const [quizMenuImg, setQuizMenuImg] = useState(0);

  const quizMenuModalImgLink = [
    "https://i.imgur.com/2n92mPX.png",
    "https://i.imgur.com/SsxHBl5.png",
  ];

  function handleQuizMenu() {
    setQuizMenu(!quizMenu);
    setQuizMenuImg(quizMenuImg === 0 ? 1 : 0);
  }

  const options = Array.from(
    { length: quizData.length },
    (_, index) => index + 1
  );

  const handleOptionChange = (value) => {
    console.log("value", typeof value);
    setIndexQuiz(value);
  };

  const handleNextButtonClick = () => {
    const temp = end;
    setStart(temp);
    setEnd(temp + 20);
  };

  const handlePrevButtonClick = () => {
    if (start !== 0) {
      const temp = start;
      setStart(temp - 20);
      setEnd(temp);
    }
  };

  function submitQuiz() {
    const tempMin = minutes;
    const tempSec = seconds;
    const tempCal = tempMin * 60 + tempSec;
    const tempTotal = TOTAL_TIME * 60;
    const finMin = Math.floor((tempTotal - tempCal) / 60);
    const finSec = Math.ceil((tempTotal - tempCal) % 60);
    const time = `${finMin} : ${finSec}`;

    const currentDate = new Date();

    // Format date as DD-MM-YYYY
    const formattedDate = `${("0" + currentDate.getDate()).slice(-2)}-${(
      "0" +
      (currentDate.getMonth() + 1)
    ).slice(-2)}-${currentDate.getFullYear()}`;

    // Format time as HH:MM
    const formattedTime = `${("0" + currentDate.getHours()).slice(-2)}:${(
      "0" + currentDate.getMinutes()
    ).slice(-2)}`;
    checkQuiz(
      setSetshowLoader,
      time,
      formattedDate,
      formattedTime,
      quizData.length
    );
  }

  function calculatePercentage(part, whole) {
    return Math.floor((part / whole) * 100);
  }

  React.useEffect(() => {
    if (isLogin === false) {
      setLoginModal(true);
      navigate("/");
    } else if (isLogin === true) {
      setLoginModal(false);
    }
  }, []);

  // Function to handle timer expiration
  const handleTimerExpiration = () => {
    setShowTimeModal(true);
  };
  // Countdown timer logic
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timer);
          handleTimerExpiration();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div className="bg-black relative overflow-x-hidden  min-h-screen h-auto">
      {/* feedback */}
      {feedbackModal && <Feedback />}
      {/* loader */}
      {setshowLoader && <Loader />}
      {/* time modal */}
      {showTimeModal && (
        <div className="absolute top-1/2 flex items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-filter backdrop-blur-sm   w-full h-full">
          <div className="w-[723px] min-w-fit p-2 flex flex-col items-center justify-center relative rounded-[15px] bg-midnightblue box-border h-max overflow-hidden text-left text-[1.25rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100">
            <div className="absolute top-[-3.312rem] left-[36.375rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-200 w-[11.688rem] h-[11.688rem]" />
            <div className="mb-10 leading-[166.21%]">{`Time's Up !!!!!!`}</div>
            <div className="flex hover:opacity-80 cursor-pointer items-center justify-center rounded bg-darkorchid-200 box-border min-w-max p-2 w-[8.688rem] h-[2.938rem] overflow-hidden text-[1rem] border-[1px] border-solid border-darkorchid-100">
              <div
                onClick={() => {
                  const time = `${TOTAL_TIME} : 00`;
                  const currentDate = new Date();
                  // Format date as DD-MM-YYYY
                  //  const formattedDate = `${('0' + currentDate.getDate()).slice(-2)}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${currentDate.getFullYear()}`;
                  const options = {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  };
                  const formattedDate = currentDate.toLocaleDateString(
                    "en-US",
                    options
                  );

                  // Format time as HH:MM
                  const formattedTime = `${("0" + currentDate.getHours()).slice(
                    -2
                  )}:${("0" + currentDate.getMinutes()).slice(-2)}`;

                  checkQuiz(
                    setSetshowLoader,
                    time,
                    formattedDate,
                    formattedTime,
                    quizData.length
                  );
                  setShowTimeModal(false);
                }}
                className=""
              >
                Submit Quiz
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <Navbar />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex w-[90%] mx-auto gap-1 justify-around items-center md:items-start  md:px-24 flex-row  lg:flex-col md:gap-0">
          <div className="w-[70%] lg:w-[277px] p-2 top-20  md:min-w-max flex items-center justify-center relative rounded bg-darkorchid-300 box-border h-[2.938rem] overflow-hidden text-justify text-[0.75rem] sm:text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
            <div className="absolute top-[-2.375rem] left-[17rem] [filter:blur(100px)] rounded-[50%] bg-darkorchid-200 w-[6.438rem] h-[6.438rem]" />
            <div className="">
              Total time spend: {qMinutes} : {qSeconds} minutes
            </div>
          </div>

          <div
            key={quizMenuImg}
            onClick={handleQuizMenu}
            className="max-w-[73px] cursor-pointer hover:opacity-70 transition-all duration-200 h-[47px] lg:hidden top-20 relative "
          >
            <img
              className="w-full h-full object-cover "
              src={quizMenuModalImgLink[quizMenuImg]}
              alt="arrow down"
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap-reverse lg:flex-nowrap gap-7 flex-col-reverse md:flex-row pt-20 items-center justify-around p-2 bg-black h-auto">
          <QuizTemplate
            key={indexQuiz}
            index={indexQuiz}
            funcIndex={setIndexQuiz}
            submit={submitQuiz}
            quizLength={quizData.length - 1}
          />

          <div
            className={`w-[95%] min-w-[170px] md:max-w-[600px] flex p-4 items-center md:justify-start flex-col relative rounded-[15px] bg-darkorchid-200 box-border h-[22.938rem] overflow-hidden text-left text-[1.125rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
              quizMenu ? "" : "hidden lg:block"
            }`}
          >
            <div className="absolute top-[-3.312rem] left-[14.313rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-100 w-[9.688rem] h-[9.688rem]" />
            <RadioButtons
              options={options.slice(start, end)}
              selectedOption={indexQuiz}
              onChange={handleOptionChange}
            />
            <div className="flex gap-10 mt-5 items-center justify-around">
              {start > 1 && (
                <img
                  onClick={handlePrevButtonClick}
                  className=" hover:opacity-40 w-8 cursor-pointer h-8 object-cover"
                  src="https://i.imgur.com/OZAUImT.png"
                />
              )}

              {end < options.length && (
                <img
                  className="w-8 hover:opacity-40 cursor-pointer h-8 object-cover"
                  src="https://i.imgur.com/Ecf5kKx.png"
                  onClick={handleNextButtonClick}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex pb-12 justify-center items-center gap-12">
          {/* removed previous button */}
          {/* <div
            onClick={() => {
              if (indexQuiz > 0) {
                setIndexQuiz(indexQuiz - 1);
              }
            }}
            className={`w-[119px] flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
              indexQuiz === 0 ? "hidden" : ""
            }`}
          >
            <div className=" ">PREVIOUS</div>
          </div> */}

          <div
            onClick={() => {
              if (indexQuiz < quizData.length - 1) {
                setAttemptedQuestions((prevItems) => [...prevItems, indexQuiz]);
                setIndexQuiz(indexQuiz + 1);
              }
            }}
            className={`w-[119px] cursor-pointer hover:opacity-85 transition-all duration-300 flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
              indexQuiz === quizData.length - 1 ? "hidden" : ""
            }`}
          >
            <div className=" ">NEXT</div>
          </div>
          <div
            onClick={() => {}}
            className={`w-[119px] flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
              indexQuiz === quizData.length - 1 ? "" : "hidden"
            }`}
          >
            <div onClick={submitQuiz} className=" ">
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainQuiz;
