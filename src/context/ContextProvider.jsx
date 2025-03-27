/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
// import jwt from "jsonwebtoken";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomURL } from "../utils/helper";

export const Context = React.createContext();

export const QuizProvider = ({ children }) => {
  // const server = "https://quiz-v2.onrender.com";
  // const server = "http://localhost:3000";
  const server = CustomURL;

  const navigate = useNavigate();
  const [fetchLeaderboardArr, setFetchLeaderboardArr] = useState([]);
  const TOTAL_TIME = 1; // Total time in qMinutes for the user to complete the question
  const [attemptedQuestions, setAttemptedQuestions] = useState([]);
  const [qMinutes, setQMinutes] = useState(TOTAL_TIME); // Initial qMinutes
  const [qSeconds, setQSeconds] = useState(0);

  const originalQuiz = [
    {
      type: "b",
      question:
        "Which of the following is a characteristic of a relational database?",
      option: [
        "Hierarchical structure",
        "Tables with rows and columns",
        "No structured format",
        "File-based storage",
      ],
      selectedOption: [],
      correctOption: ["Tables with rows and columns"],
      remainingOption: [
        "Hierarchical structure",
        "Tables with rows and columns",
        "No structured format",
        "File-based storage",
      ],
      score: 0,
    },
    {
      type: "a",
      question:
        "What SQL query retrieves all columns from the 'employees' table where the employee's age is greater than 30?",
      options: ["FROM", "employees", "WHERE", "age", ">", "30", "SELECT", "*"],
      selectedOption: [],
      correctOption: [
        "SELECT",
        "*",
        "FROM",
        "employees",
        "WHERE",
        "age",
        ">",
        "30",
      ],
      remainingOption: [
        "FROM",
        "employees",
        "WHERE",
        "age",
        ">",
        "30",
        "SELECT",
        "*",
      ],
      score: 0,
    },

    {
      type: "b",
      question: 'Who wrote "To Kill a Mockingbird"?',
      options: [
        "Harper Lee",
        "J.K. Rowling",
        "Stephen King",
        "Charles Dickens",
      ],
      selectedOption: [],
      correctOption: ["Harper Lee"],
      remainingOption: [
        "Harper Lee",
        "J.K. Rowling",
        "Stephen King",
        "Charles Dickens",
      ],
      score: 0,
    },
    {
      type: "b",
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Hg"],
      selectedOption: [],
      correctOption: ["Au"],
      remainingOption: ["Au", "Ag", "Fe", "Hg"],
      score: 0,
    },
    {
      type: "b",
      question: "What is the largest planet in our solar system?",
      options: ["Mercury", "Venus", "Earth", "Jupiter"],
      selectedOption: [],
      correctOption: ["Jupiter"],
      remainingOption: ["Mercury", "Venus", "Earth", "Jupiter"],
      score: 0,
    },
  ];
  // const [quizData, setQuizData] = useState([
  //   {
  //     type: "a",
  //     question: "some question",
  //     option: ["a", "b", "c", "d"],
  //     selectedOption: [],
  //     correctOption: ["c", "d", "b", "a"],
  //     remainingOption: ["a", "b", "c", "d"],
  //     score: 0,
  //   },
  //   {
  //     type: "a",
  //     question:
  //       "What SQL query retrieves all columns from the 'employees' table where the employee's age is greater than 30?",
  //     options: ["FROM", "employees", "WHERE", "age", ">", "30", "SELECT", "*"],
  //     selectedOption: [],
  //     correctOption: [
  //       "SELECT",
  //       "*",
  //       "FROM",
  //       "employees",
  //       "WHERE",
  //       "age",
  //       ">",
  //       "30",
  //     ],
  //     remainingOption: [
  //       "FROM",
  //       "employees",
  //       "WHERE",
  //       "age",
  //       ">",
  //       "30",
  //       "SELECT",
  //       "*",
  //     ],
  //     score: 0,
  //   },
  //   {
  //     type: "b",
  //     question: 'Who wrote "To Kill a Mockingbird"?',
  //     options: [
  //       "Harper Lee",
  //       "J.K. Rowling",
  //       "Stephen King",
  //       "Charles Dickens",
  //     ],
  //     selectedOption: [],
  //     correctOption: ["Harper Lee"],
  //     remainingOption: [
  //       "Harper Lee",
  //       "J.K. Rowling",
  //       "Stephen King",
  //       "Charles Dickens",
  //     ],
  //     score: 0,
  //   },
  //   {
  //     type: "b",
  //     question: "What is the chemical symbol for gold?",
  //     options: ["Au", "Ag", "Fe", "Hg"],
  //     selectedOption: [],
  //     correctOption: ["Au"],
  //     remainingOption: ["Au", "Ag", "Fe", "Hg"],
  //     score: 0,
  //   },
  //   {
  //     type: "b",
  //     question: "What is the largest planet in our solar system?",
  //     options: ["Mercury", "Venus", "Earth", "Jupiter"],
  //     selectedOption: [],
  //     correctOption: ["Jupiter"],
  //     remainingOption: ["Mercury", "Venus", "Earth", "Jupiter"],
  //     score: 0,
  //   },
  // ]);
  const [quizData, setQuizData] = useState(originalQuiz);
  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [user, setUser] = useState("");
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [questions, setQuestions] = useState("");
  const [token, setToken] = useState("");

  const [question, setQue] = useState("");
  const [count, setCount] = useState("");
  const [arr, setArr] = useState("");
  // const [pass, setPass] = useState('');
  const [corr, setCorr] = useState("");

  // quiz related
  // const [quizFinalScore, setQuizFinalScore] = useState(0)
  const [unattemptedQuiz, setUnattemptedQuiz] = useState(0);
  const [correctQuiz, setCorrectQuiz] = useState(0);
  const quizLength = quizData.length;

  function calculatePercentage(part, whole) {
    return Math.floor((part / whole) * 100);
  }

  // Function to handle form submission
  const checkQuiz = async (loader, _timeTaken, _date, _time, _quizLength) => {
    loader(true);
    var tempUnattempted = 0;
    var tempCorrect = 0;
    // e.preventDefault();
    // console.log(email);
    quizData.forEach((quiz) => {
      // console.log("in Quiz:", quiz);
      if (quiz.selectedOption.length === 0) {
        // setUnattemptedQuiz(prevUnattemptedQuiz => prevUnattemptedQuiz + 1)
        tempUnattempted = tempUnattempted + 1;
        // console.log("out in 1st Quiz:", quiz,typeof(quiz.score));
      } else {
        // console.log("out 2nd Quiz:", quiz);

        // setCorrectQuiz(prevCorrectQuiz => prevCorrectQuiz + Number(quiz.score))
        tempCorrect = tempCorrect + quiz.score;
        // console.log("out in 1st Quiz:", quiz,typeof(quiz.score));
      }
    });
    // console.log(
    //   "Correct Quiz:",
    //   tempCorrect,
    //   "Unattempted Quiz:",
    //   tempUnattempted
    // );
    setCorrectQuiz(() => tempCorrect);
    setUnattemptedQuiz(() => tempUnattempted);
    const percentage = calculatePercentage(tempCorrect, _quizLength);
    const feedbackMessages = [
      `Oops! It looks like there's room for growth, but that's okay! Every question is a chance to learn and improve. Keep pushing forward with determination, and you'll see progress. You've achieved ${percentage}% of your potential!`,
      `Not bad at all! You're definitely on the right track. Keep up the good work! Consistency is key, and your efforts will surely pay off. You've reached ${percentage}% of your potential!`,
      `Great effort! You're steadily progressing towards mastery. Stay focused, keep up the momentum, and trust in your abilities. Remember, every step forward counts. You've achieved ${percentage}% of your potential!`,
      `Excellent job! You're doing exceptionally well. Your dedication and hard work are truly paying off. Keep challenging yourself, and aim even higher. You've reached ${percentage}% of your potential!`,
      `Wow! You're almost there! Your knowledge and skills are remarkable. Keep up the outstanding work, and nothing can stop you from reaching your goals. You've achieved ${percentage}% of your potential!`,
      `Congratulations! You've aced it by answering all the questions correctly! 🎉 Your commitment and expertise shine brightly. Keep up the amazing work, and let's continue this journey of learning with more victories ahead! You've reached ${percentage}% of your potential!`,
    ];

    function determineFeedback(percentage) {
      if (percentage === 0) {
        return feedbackMessages[0];
      } else if (percentage > 0 && percentage < 40) {
        return feedbackMessages[1];
      } else if (percentage >= 40 && percentage < 60) {
        return feedbackMessages[2];
      } else if (percentage >= 60 && percentage < 80) {
        return feedbackMessages[3];
      } else if (percentage >= 80 && percentage < 100) {
        return feedbackMessages[4];
      } else {
        return feedbackMessages[5];
      }
    }

    const feedback = determineFeedback(percentage);
    setFeedbackText(feedback);
    // console.log("Feedback:", feedback);

    try {
      if (isLoggedIn) {
        // console.log(
        //   "Correct Quiz actuall:",
        //   correctQuiz,
        //   "Unattempted Quiz:",
        //   unattemptedQuiz
        // );

        const res = await axios.post(
          `${server}/updateQuizHistory`,
          {
            email: user.email,
            score: tempCorrect,
            feedback: feedback,
            totalQuiz: _quizLength,
            timeTaken: _timeTaken,
            ddate: _date,
            dtime: _time,
          },
          { headers: { "x-access-token": token } }
        );

        const res1 = await axios.post(
          `${server}/updateLeaderboard`,
          { email: user.email, name: user.name, score: tempCorrect },
          { headers: { "x-access-token": token } }
        );
        // console.log(res.data);
        // console.log(res1.data);
        setQuizData(originalQuiz);
      }
      loader(false);
      setFeedbackModal(true);
    } catch (err) {
      loader(false);
      console.log("Error in checkQuiz", err);

      alert("Error in checkQuiz", err);
    }
  };

  async function isLoggedIn() {
    const token = localStorage.getItem("token");
    if (token) {
      //   const user = jwt.decode(token);
      //   if (!user) {
      //     localStorage.removeItem("token");
      //     setIsLogin(false);
      //     return false;
      //   } else {
      try {
        const response = await axios.post(
          `${server}/api/checkToken`,
          { some: "data" },
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token,
            },
          }
        );

        // console.log("Response: isloggedin", response.data);
        if (response.data.status === "ok") {
          setUser(response.data.user);
          fetchLeaderboard();
          setIsLogin(true);
        }
        // navigate('/dash') //enable it later
        // alert('Logged in')

        return true;
      } catch (error) {
        navigate("/");
        console.log("Error:", error);
      }

      //   }
    }
  }

  async function fetchLeaderboard() {
    try {
      const response = await axios.get(
        `${server}/leaderboard`,
        { some: "data" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Leaderboard data", response.data);

      setFetchLeaderboardArr(response.data);
      // console.log("ussssss", fetchLeaderboardArr);
      return true;
    } catch (error) {
      // navigate("/");
      console.log("Error:", error);
    }

    //   }
  }

  async function Login(email, password, errorPopup) {
    try {
      // console.log("Email:", email, "Password:", password);
      const response = await axios.post(`${server}/login`, {
        email,
        password,
      });
      // console.log("login", response.data);
      if (response.data == 1) {
        errorPopup("User does not Exist, Please Register first");
        return false;
      } else if (response.data == 2) {
        errorPopup("Incorrect Password");
        return false;
      } else {
        // localStorage.setItem("token", JSON.stringify(response.data));
        console.log("response.data: ", response.data);
        localStorage.setItem("token", response.data);
        // window.location.href='http://localhost:3001/quiz';
        // alert("Login Successful");
        // navigate("/dash");
        // console.log("Login successful:", response.data);

        const userResponse = await axios.post(`${server}/getUserData`, {
          email,
        });

        setUser(userResponse.data);
        setIsLogin(true);

        return true;
      }
    } catch (error) {
      alert(error);
      console.error("Error Logging user:", error);
    }
  }

  async function Logout() {
    try {
      localStorage.removeItem("token");

      setIsLogin(false);
      setUser("");

      alert("Logout Successful");
    } catch (error) {
      console.error("Error Logging out:", error);
    }
  }

  useEffect(() => {
    const func = async () => {
      await isLoggedIn();
      await fetchLeaderboard();
    };
    func();
  }, []);

  useEffect(() => {
    // console.log("isLogin:", isLogin);
    if (isLogin === true) {
      // checkQuiz();
    }
  }, [isLogin]);
  return (
    <Context.Provider
      value={{
        isLogin,
        user,
        loginModal,
        quizData,
        unattemptedQuiz,
        correctQuiz,
        fetchLeaderboardArr,
        feedbackModal,
        feedbackText,
        qMinutes,
        qSeconds,
        attemptedQuestions,
        setQuizData,
        Login,
        Logout,
        checkQuiz,
        setLoginModal,
        setIsLogin,
        setFeedbackModal,
        setFeedbackText,
        isLoggedIn,
        setQSeconds,
        setQMinutes,
        setAttemptedQuestions,
      }}
    >
      {children}
    </Context.Provider>
  );
};
