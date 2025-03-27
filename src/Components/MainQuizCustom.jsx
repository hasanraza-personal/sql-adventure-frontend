/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import QuizTemplateCustom from "./QuizTemplateCustom";
import RadioButtonCustom from "./RadioButtonCustom";
import { MCQContext } from "../context/ContextProviderCustom";
import QuizTemplateText from "./QuizTemplateText";
import axios from "axios";
import WrongChoiceModal from "./WrongChoiceModal";
import DynamicTable from "./DynamicTable";
import StarRating from "./StarRating";
import CongratsModal from "./CongratsModal";
import { Context } from "../context/ContextProvider";
import { OrbitProgress } from "react-loading-indicators";
import { SocketContext } from "../context/SocketContext";
import { CustomURL, reviewObject } from "../utils/helper";
import Playlist from "./PlayList";
import { useNavigate } from "react-router-dom";
import PDFViewer from "./PDFView";

// const server = "http://localhost:3000";
// const server = "https://sql-adventure-backend.onrender.com";
const server = CustomURL;
const skipLevel = [];

const MainQuizCustom = () => {
  const navigate = useNavigate();
  const { quizData, setQuizData } = useContext(MCQContext);
  const displayRef = useRef(null);
  const timerRef = useRef(null);
  const questionTimerRef = useRef(null);
  const questionTimeRef = useRef(null);
  const totalTime = useRef(null);
  const [quizMenu, setQuizMenu] = useState(false);
  const [quizMenuImg, setQuizMenuImg] = useState(0);
  const [indexQuiz, setIndexQuiz] = useState(0);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(20);
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [incorrectQuery, setIncorrentQuery] = useState(false);
  const [queryText, setQueryText] = useState("");
  const quizTemplateRef = useRef(null);
  const quizMenuModalImgLink = [
    "https://i.imgur.com/2n92mPX.png",
    "https://i.imgur.com/SsxHBl5.png",
  ];
  // New state for showing the wrong choice modal
  const [showWrongModal, setShowWrongModal] = useState(false);
  const [wrongMessage, setWrongMessage] = useState("");
  const [sqlResponse, setSQLResponse] = useState([]);
  const [tableVisible, setTableVisible] = useState(false);
  const [wrongOption, setWrongOption] = useState(null);
  // New state for the congratulatory modal.
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  // This will hold the level that was just cleared.
  const [clearedLevel, setClearedLevel] = useState(null);
  const prevLevelRef = useRef(quizData[indexQuiz].level);
  const [isInitialGoogleFormCompleted, setInitialGoogleFormCompleted] =
    useState(false);
  const [isFinalGoogleFormCompleted, setIsFinalGoogleFormCompleted] =
    useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const { user, isLogin } = useContext(Context);
  const { socket, isSocketConnected } = useContext(SocketContext);
  const [vidoes, setVideos] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [SQLCourselink, setSQLCourseLink] = useState("");
  // const [certificate, setCertificate] = useState("");
  const [level, setLevel] = useState("Advanced");
  // const [skipLevel, setSkipLevel] = useState([]);

  // useEffect to detect level changes.
  useEffect(() => {
    const currentLevel = quizData[indexQuiz].level;
    if (prevLevelRef.current !== currentLevel) {
      console.log(
        "Level changed from",
        prevLevelRef.current,
        "to",
        currentLevel
      );
      // Perform any additional actions here when the level changes.
      setClearedLevel(prevLevelRef.current);
      setShowCongratsModal(true);
    }
    // Update the ref with the current level.
    prevLevelRef.current = currentLevel;
  }, [quizData, indexQuiz]);

  // Function to close the congrats modal
  const closeCongratsModal = () => {
    setShowCongratsModal(false);
  };

  // Function to close the modal
  const closeWrongModal = () => {
    setShowWrongModal(false);
  };

  function handleQuizMenu() {
    setQuizMenu(!quizMenu);
    setQuizMenuImg(quizMenuImg === 0 ? 1 : 0);
  }

  const options = Array.from(
    { length: quizData.length },
    (_, index) => index + 1
  );

  const handleOptionChange = (value) => {
    return;
    // eslint-disable-next-line no-unreachable
    setIndexQuiz(value);
  };

  // const handleNextButtonClick = () => {
  //   const temp = end;
  //   setStart(temp);
  //   setEnd(temp + 20);
  // };

  // const handlePrevButtonClick = () => {
  //   if (start !== 0) {
  //     const temp = start;
  //     setStart(temp - 20);
  //     setEnd(temp);
  //   }
  // };

  const handleExecuteSQLQuery = async (selectedOptions) => {
    try {
      const result = await axios.post(`${server}/executeSqlQuery`, {
        query: selectedOptions.toLowerCase(),
      });
      return result.data;
    } catch (error) {
      console.log(
        "Something went wrong while tryring to execute the SQL query on in MySQL"
      );
      console.log("error: ", error);
    }
  };

  const handleNextButton = async (indexQuiz, data1, data2) => {
    console.log("data2: ", data2);
    console.log("data1: ", data1);
    const currentQuizData = quizData[indexQuiz];
    currentQuizData.attempt += 1;

    if (data1 === "skip" && data2 === null) {
      setAttemptedQuestions((prevItems) => [...prevItems, indexQuiz]);
      setIndexQuiz(indexQuiz + 1);
      currentQuizData.time = questionTimeRef.current;

      setWrongOption(null);
      setWrongMessage("");
      setIncorrentQuery(false);
      setQueryText("");
      setShowWrongModal(false);

      skipLevel.push(indexQuiz);
      return;
    }

    if (data1 === "skip" && data2 === "last") {
      skipLevel.push(indexQuiz);
      // setSkipLevel((prev) => [...prev, indexQuiz]);

      setWrongOption(null);
      setWrongMessage("");
      setIncorrentQuery(false);
      setQueryText("");
      setShowWrongModal(false);

      currentQuizData.time = questionTimeRef.current;
      submitQuiz();
      return;
    }

    if (quizTemplateRef.current && queryText.length === 0) {
      const selectedOptions = quizTemplateRef.current.getNewSelectedOptions();

      // For normal MCQ
      if (currentQuizData.type === "b") {
        if (selectedOptions.length === 0) {
          setWrongMessage("Please select any one option to continue");
          setShowWrongModal(true);
          return;
        }

        if (
          selectedOptions[0].toLowerCase() !==
          currentQuizData.correctOption[0].toLowerCase()
        ) {
          setWrongMessage("Wrong choice");
          // setShowWrongModal(true);
          setWrongOption(selectedOptions[0]);
          return;
        }
        setWrongOption(null);
      }

      // For SQL MCQ
      if (currentQuizData.type === "a") {
        console.log("Inside");
        if (currentQuizData.remainingOption.length !== selectedOptions.length) {
          setWrongMessage("Please complete the query");
          setShowWrongModal(true);
          return;
        }

        if (
          selectedOptions.join(" ").toLowerCase() !==
          currentQuizData.correctOption.join(" ").toLowerCase()
        ) {
          console.log(currentQuizData.correctOption.join(" ").toLowerCase());
          console.log(selectedOptions.join(" ").toLowerCase());
          setIncorrentQuery(true);
          setQueryText(selectedOptions.join(" "));

          setWrongMessage("Your query is incorrect");
          setShowWrongModal(true);
          return;
        }

        const response = await handleExecuteSQLQuery(
          selectedOptions.join(" ").toLowerCase()
        );
        console.log("response: ", response);

        if (response.type === "array") {
          setSQLResponse(response.data);
          setTableVisible(true);
        } else if (response.type === "error") {
          setWrongMessage(response.data);
          setShowWrongModal(true);
        } else if (response.type === "string") {
          setWrongMessage("Query executed successfully");
          setShowWrongModal(true);
        }
      }
    }

    if (queryText !== 0 && incorrectQuery === true) {
      // return str1.replace(/\s+/g, '') === str2.replace(/\s+/g, '');
      if (
        queryText.toLowerCase().trim().replace(/\s+/g, "") !==
        currentQuizData.correctOption
          .join(" ")
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "")
      ) {
        setIncorrentQuery(true);
        setWrongMessage("Your query is incorrect");
        setShowWrongModal(true);
        return;
      } else {
        const response = await handleExecuteSQLQuery(queryText);

        if (response.type === "array") {
          setSQLResponse(response.data);
          setTableVisible(true);
        } else if (response.type === "error") {
          setWrongMessage(response.data);
          setShowWrongModal(true);
        } else if (response.type === "string") {
          setWrongMessage("Query executed successfully");
          setShowWrongModal(true);
        }

        setIncorrentQuery(false);
        setQueryText("");
      }
    }

    if (indexQuiz < quizData.length - 1) {
      setAttemptedQuestions((prevItems) => [...prevItems, indexQuiz]);
      setIndexQuiz(indexQuiz + 1);
      currentQuizData.time = questionTimeRef.current;
    }

    // console.log("indexQuiz: ", indexQuiz);
    // console.log("quizData.length: ", quizData.length);

    if (indexQuiz === quizData.length - 1) {
      currentQuizData.time = questionTimeRef.current;
      submitQuiz();
    }
  };

  const handleQueryText = (e) => {
    setQueryText(e.target.value);
  };

  const submitQuiz = async () => {
    console.log("Submit quiz");
    setLoadingState(true);

    const fourthLevel = skipLevel.some((num) => num >= 15 && num <= 19);
    if (fourthLevel) {
      setLevel("Intermediate");
    }

    const thirdLevel = skipLevel.some((num) => num >= 10 && num <= 14);
    if (thirdLevel) {
      setLevel("Beginner");
    }

    let gameRes = null;
    try {
      gameRes = await axios.post(`${server}/saveGameResult`, {
        userId: user._id,
        email: user.email,
        name: user.name,
        totalTime: totalTime.current,
      });
    } catch (error) {
      console.log("Error occured while save saveGameResult: ", error);
      console.log("error: ", error);
    }

    try {
      let attempt = false;
      let suggestion = [];
      let videoArr = [];

      for (let i = 0; i < quizData.length; i++) {
        await axios.post(`${server}/saveGameQuestion`, {
          gameId: gameRes.data,
          level: quizData[i].level,
          questionNo: i + 1,
          questionTime: quizData[i].time,
          attempt: quizData[i].attempt,
        });
        // console.log("quizData[i]: ", quizData[i]);

        if (attempt == false && quizData[i].attempt > 1) {
          for (let j = 0; j < reviewObject.length; j++) {
            if (reviewObject[j].level == quizData[i].level) {
              if (reviewObject[j].questionNo == 0) {
                suggestion.push(reviewObject[j]);

                if (reviewObject[j].linkType == "video") {
                  videoArr.push(reviewObject[j].link);
                  setLevel(reviewObject[j].levelType);
                }

                setSQLCourseLink(reviewObject[j].link);
              }

              if (reviewObject[j].questionNo == i + 1) {
                suggestion.push(reviewObject[j]);

                if (reviewObject[j].linkType == "video") {
                  videoArr.push(reviewObject[j].link);
                }
              }
            }
          }

          await axios.post(`${server}/saveSuggestion`, {
            email: user.email,
            data: suggestion,
          });
          attempt = true;

          setVideos(videoArr);
        }
      }

      // console.log("suggestion: ", suggestion);

      await generatePDF();
      setGameCompleted(true);
      setLoadingState(false);

      setTimeout(() => {
        alert(
          "Your certificate is ready and has been downloaded. Please check your downloads"
        );
      }, 2000);
    } catch (error) {
      console.log("Error occured while save saveGameQuestion: ", error);
      console.log("error: ", error);
    }
  };

  async function generatePDF() {
    try {
      // POST to the backend endpoint and expect the PDF as a Blob
      console.log(user);

      const response = await axios.post(
        `${server}/generateCertificate`,
        { name: user.name, email: user.email },
        { responseType: "blob" }
      );

      // Create a Blob from the PDF data
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf");
      document.body.appendChild(link);
      link.click();

      // Clean up the link and object URL
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating certificate:", error);
    }
  }

  // Question timer
  useEffect(() => {
    if (!isInitialGoogleFormCompleted) {
      return;
    }

    let currentTime = 0;
    questionTimerRef.current = setInterval(() => {
      currentTime += 1;
      if (currentTime > 3600) {
        // Stop at 60:00 (3600 seconds)
        clearInterval(questionTimerRef.current);
        return;
      }

      // Format time to mm:ss
      const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
      const seconds = String(currentTime % 60).padStart(2, "0");

      questionTimeRef.current = `${minutes}:${seconds}`;
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(questionTimerRef.current);
  }, [attemptedQuestions, isInitialGoogleFormCompleted]);

  // Timer
  useEffect(() => {
    if (!isInitialGoogleFormCompleted) {
      return;
    }

    let currentTime = 0;
    timerRef.current = setInterval(() => {
      currentTime += 1;
      if (currentTime > 3600) {
        clearInterval(timerRef.current);
        return;
      }

      // Format time to mm:ss
      const minutes = String(Math.floor(currentTime / 60)).padStart(2, "0");
      const seconds = String(currentTime % 60).padStart(2, "0");

      // Update the DOM element directly
      if (displayRef.current) {
        displayRef.current.textContent = `Total time spend ${minutes}:${seconds} minutes`;
        totalTime.current = `${minutes}:${seconds}`;
      }
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(timerRef.current);
  }, [isInitialGoogleFormCompleted]);

  async function checkGoogleFormStatus() {
    skipLevel.length = 0;
    try {
      const response = await axios.post(`${server}/getGoogleFormStatus`, {
        email: user.email,
      });
      const data = response.data;
      // console.log("data: ", data);

      if (data?.initialGoogleFormCompleted == true) {
        setInitialGoogleFormCompleted(true);
      }

      setTimeout(() => {
        setLoadingState(false);
      }, 2000);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    checkGoogleFormStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // console.log("isSocketConnected: ", isSocketConnected);
    // console.log("user: ", user);
    if (!isSocketConnected || !user) {
      return;
    }

    // console.log("user: ", user);
    socket.emit("register", { email: user.email });

    socket.on("initialGoogleFormSubmitted", (payload) => {
      console.log("payload: ", payload.emailFound);
      if (payload.emailFound == true) {
        setInitialGoogleFormCompleted(true);
      }
    });
  }, [socket, isSocketConnected, user, isLogin]);

  if (loadingState) {
    return (
      <>
        <div className="mb-14">
          <Navbar />
        </div>
        {/* <div className="flex justify-center mt-60">
          <OrbitProgress variant="disc" dense color="#2c362c" size="medium" />
        </div> */}
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          // The overlay intercepts all clicks, so nothing below is clickable.
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="bg-white rounded-lg p-6"
            // Prevent clicks inside the modal from propagating to the overlay.
            onClick={(e) => e.stopPropagation()}
          >
            <OrbitProgress variant="disc" dense color="#2c362c" size="medium" />
          </div>
        </div>
      </>
    );
  }

  if (gameCompleted) {
    return (
      <>
        <div className="mb-14">
          <Navbar />
        </div>
        <div className="bg-black min-h-screen relative overflow-x-hidden">
          <div className="container mx-auto p-4">
            {/* Info Card */}
            <div className="bg-gray-800 shadow-lg rounded-lg p-6">
              <h1 className="text-3xl font-bold text-center text-white">
                Congratulations!
              </h1>
              <p className="mt-4 text-xl text-center text-white">
                You have completed the game.
              </p>
              <p className="mt-2 text-lg text-center text-white">
                You are at the <span className="font-semibold">{level}</span>{" "}
                level.
              </p>
            </div>

            <div>
              <PDFViewer pdfUrl="https://ddlypxwpahwjzazfywmb.supabase.co/storage/v1/object/public/sql-adventure//certificate_dfe0c9b6-b494-4299-b17b-76df2a324828.pdf" />
            </div>

            {/* Playlist Title and Component */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-center text-white mb-4">
                Video Recommendations for Enhancing Your SQL Skills Based on
                Your Gameplay
              </h2>
              <Playlist videos={vidoes} />
            </div>

            {/* Additional Professional Link */}
            <div className="mt-8 text-center">
              <a
                href={SQLCourselink} // Replace with your desired URL
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-400 hover:text-blue-600 underline"
              >
                Discover More SQL Courses and Resources
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => {
                  navigate("/profile");
                }}
                className="px-6 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isInitialGoogleFormCompleted == false) {
    return (
      <div className="w-full h-screen p-4">
        {/* Navbar */}
        <div className="mb-14">
          <Navbar />
        </div>

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeNvxSr4L1PwPczlVYXIdJNqap1Si0ZDWKd0ktOhUdSJkOMVg/viewform"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          title="Google Form"
        >
          Loading…
        </iframe>
      </div>
    );
  } else {
    return (
      <>
        {showWrongModal && (
          <WrongChoiceModal message={wrongMessage} onClose={closeWrongModal} />
        )}

        {/* Congrats Modal */}
        {showCongratsModal && (
          <CongratsModal
            level={clearedLevel}
            onClose={closeCongratsModal}
            quizLevel={quizData[indexQuiz].level}
          />
        )}

        <div className="bg-black relative overflow-x-hidden min-h-screen h-auto">
          {tableVisible ? (
            <>
              <DynamicTable
                data={sqlResponse}
                setTableVisible={setTableVisible}
                setSQLResponse={setSQLResponse}
              />
            </>
          ) : (
            <>
              {/* Navbar */}
              <div>
                <Navbar />
              </div>

              {/* Body */}
              <div className="flex flex-col gap-5">
                {/* Quiz head */}
                <div className="flex w-[90%] mx-auto gap-1 justify-around items-center md:items-start  md:px-24 flex-row  lg:flex-col md:gap-0">
                  {/* Quiz time spend */}
                  <div className="w-[70%] lg:w-[277px] p-2 top-20  md:min-w-max flex items-center justify-center relative rounded bg-darkorchid-300 box-border h-[2.938rem] overflow-hidden text-justify text-[0.75rem] sm:text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
                    <div className="absolute top-[-2.375rem] left-[17rem] [filter:blur(100px)] rounded-[50%] bg-darkorchid-200 w-[6.438rem] h-[6.438rem]" />
                    <div ref={displayRef} className="">
                      Total time spend: 00:00 minutes
                    </div>
                  </div>
                  {/* Quiz time spend */}

                  {/* Quiz question number track dropdown icon */}
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
                  {/* Quiz question number track dropdown icon */}
                </div>
                {/* Quiz head */}

                {/* Level */}
                <div className="flex items-center justify-center gap-3 pt-20">
                  <span className="text-white text-lg font-semibold">
                    Level: {quizData[indexQuiz].level}
                  </span>
                  <StarRating level={quizData[indexQuiz].level} />
                </div>
                {/* Level */}

                <div className="w-full flex flex-wrap-reverse lg:flex-nowrap gap-7 flex-col-reverse md:flex-row pt-2 items-center justify-around p-2 bg-black h-auto">
                  {!incorrectQuery ? (
                    <>
                      {/* Quiz options */}
                      <QuizTemplateCustom
                        ref={quizTemplateRef}
                        quizLength={quizData.length - 1}
                        key={indexQuiz}
                        index={indexQuiz}
                        funcIndex={setIndexQuiz}
                        quizData={quizData}
                        setQuizData={setQuizData}
                        wrongOption={wrongOption}
                        setWrongOption={setWrongOption}
                      />
                      {/* Quiz options */}
                    </>
                  ) : (
                    <>
                      {/* Quiz TextArea for SQL  */}
                      <QuizTemplateText
                        index={indexQuiz}
                        quizData={quizData}
                        queryText={queryText}
                        onChange={handleQueryText}
                      />
                    </>
                  )}
                  {/* Quiz TextArea for SQL  */}

                  {/* Quiz Question no track */}
                  <div
                    className={`w-[95%] min-w-[170px] md:max-w-[600px] flex p-4 items-center md:justify-start flex-col relative rounded-[15px] bg-darkorchid-200 box-border h-[22.938rem] overflow-hidden text-left text-[1.125rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
                      quizMenu ? "" : "hidden lg:block"
                    }`}
                  >
                    <div className="absolute top-[-3.312rem] left-[14.313rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-100 w-[9.688rem] h-[9.688rem]" />
                    <RadioButtonCustom
                      options={options.slice(start, end)}
                      selectedOption={indexQuiz}
                      onChange={handleOptionChange}
                      attemptedQuestions={attemptedQuestions}
                      setAttemptedQuestions={setAttemptedQuestions}
                    />
                  </div>
                  {/* Quiz Question no track */}
                </div>

                {/* Next and Submit button */}
                <div className="flex pb-12 justify-center items-center gap-12">
                  {/* Next */}
                  <div
                    onClick={() => handleNextButton(indexQuiz, null, null)}
                    className={`w-[119px] cursor-pointer hover:opacity-85 transition-all duration-300 flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
                      indexQuiz === quizData.length - 1 ? "hidden" : ""
                    }`}
                  >
                    <div className=" ">NEXT</div>
                  </div>

                  {/* Skip */}
                  {indexQuiz > 9 && (
                    <div
                      onClick={() => handleNextButton(indexQuiz, "skip", null)}
                      className={`w-[119px] cursor-pointer hover:opacity-85 transition-all duration-300 flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
                        indexQuiz === quizData.length - 1 ? "hidden" : ""
                      }`}
                    >
                      <div className=" ">SKIP</div>
                    </div>
                  )}

                  {/* Submit */}
                  <div
                    onClick={() => handleNextButton(indexQuiz, null, null)}
                    className={`w-[119px] flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
                      indexQuiz === quizData.length - 1 ? "" : "hidden"
                    }`}
                  >
                    <div>Submit</div>
                  </div>

                  {/* Skip */}
                  {indexQuiz > 18 && (
                    <div
                      onClick={() =>
                        handleNextButton(indexQuiz, "skip", "last")
                      }
                      className={`w-[119px] cursor-pointer hover:opacity-85 transition-all duration-300 flex justify-center items-center relative rounded bg-darkorchid-200 box-border h-[2.938rem] overflow-hidden text-left text-[1rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100 ${
                        indexQuiz === quizData.length - 1 ? "" : "hidden"
                      }`}
                    >
                      <div>SKIP</div>
                    </div>
                  )}
                </div>
                {/* Next and Submit button */}
              </div>
            </>
          )}
        </div>
      </>
    );
  }
};

export default MainQuizCustom;
