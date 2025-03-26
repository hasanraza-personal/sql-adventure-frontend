/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./css/QuizTemplate.css";
import { Context } from "../context/ContextProvider";

const QuizTemplate = (props) => {
  const {
    quizData,
    setQuizData,
    qMinutes,
    qSeconds,
    setQSeconds,
    setQMinutes,
    attemptedQuestions,
    setAttemptedQuestions,
  } = React.useContext(Context);

  // const newOption = props.option;
  const [newSelectedOptions, setNewSelectedOptions] = useState(
    quizData[props.index]["selectedOption"]
  );
  const [newRemainingOptions, setNewRemainingOptions] = useState(
    quizData[props.index].remainingOption
  );
  const [newQuestion, setNewQuestion] = useState(
    quizData[props.index].question
  );

  const handleOptionClick = (option) => {
    console.log("insideOptionClick", option);
    setNewSelectedOptions([option]);
  };
  // console.log("index", typeof props.index);
  function checkAnswer() {
    const temp = [...quizData];
    temp[props.index]["selectedOption"] = newSelectedOptions;
    temp[props.index]["remainingOption"] = newRemainingOptions;
    setQuizData(temp);
    if (
      JSON.stringify(newSelectedOptions) ===
      JSON.stringify(temp[props.index]["correctOption"])
    ) {
      temp[props.index]["score"] = 1;
    } else {
      temp[props.index]["score"] = 0;
    }
  }

  const shuffleArray = (array) => {
    const shuffledArray = [...array].sort(() => Math.random() - 0.5);
    setNewRemainingOptions(shuffledArray);
  };
  React.useEffect(() => {
    checkAnswer();
    console.log("new quidata", quizData);
  }, [newSelectedOptions]);

  React.useEffect(() => {
    shuffleArray(newRemainingOptions);
    setQMinutes(1);
    setQSeconds(0);
  }, []);

  const newHandleOptionClick = (option) => {
    console.log("insideOptionClick", option);
    console.log("remaining", newRemainingOptions);
    setNewRemainingOptions(newRemainingOptions.filter((opt) => opt !== option));
    setNewSelectedOptions([...newSelectedOptions, option]);
  };

  const newHandleRemoveOption = (option) => {
    setNewSelectedOptions(newSelectedOptions.filter((opt) => opt !== option));
    // setRemainingOptions([...remainingOptions, option]);
    setTimeout(() => {
      setNewRemainingOptions([...newRemainingOptions, option]);
    }, 300);
  };

  return (
    <div className="bg-black w-[90%] mx-auto max-w-full relative h-max">
      <div className="w-[90%] mx-auto lg:w-[900px] max-w-max min-w-fit  relative p-7  rounded-[15px] bg-darkorchid-200 box-border min-h-[18.938rem]  text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
        <div className="absolute top-[-4.875rem] left-[49.75rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-100 w-[11.688rem] h-[11.688rem]" />
        <div className="w-[90%] lg:w-[49.125rem] max-w-full relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-left inline-block">
          {/* question
           */}
          {props.index + 1 + ") " + newQuestion}
        </div>

        {/* options */}
        <p className="my-4">Your Answer:</p>
        <div className="flex gap-5 flex-wrap items-center h-12 my-5">
          {newSelectedOptions.map((option, index) => (
            <div
              key={index}
              className="cursor-pointer bg-white hover:opacity-70 hover:scale-105  text-black p-1 transition-opacity duration-300"
              onClick={() => {
                if (quizData[props.index].type === "a") {
                  newHandleRemoveOption(option);
                }
              }}
            >
              <span className="txt">{option}</span>
            </div>
          ))}
          <br />
        </div>
        {newSelectedOptions.length === 0 && (
          <p className="text-red-500">Please select atleast one option</p>
        )}
        {newRemainingOptions.length > 0 && (
          <p className="mb-5">Select From the Following :</p>
        )}
        <div className="flex flex-wrap gap-4 mb-5">
          {/* complex mcq */}
          {quizData[props.index].type === "a" &&
            newRemainingOptions.map((option, index) => (
              <div
                className="w-[131px] bg-black cursor-pointer p-3 hover:opacity-70 hover:scale-105 transition-all duration-200 min-w-max h-[47px] relative rounded flex items-center justify-center  box-border overflow-hidden text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100"
                key={index}
                onClick={() => newHandleOptionClick(option)}
              >
                <span className=" bg-black text-center   rounded-xl">
                  {option}
                </span>
              </div>
            ))}
          {/* complex mcq  end*/}

          {/* normal mcq */}
          {quizData[props.index].type === "b" &&
            newRemainingOptions.map((option, index) => (
              <div
                className="bg-black cursor-pointer p-3 hover:opacity-70 hover:scale-105 transition-all duration-200 h-[47px] relative rounded flex items-center justify-center  box-border overflow-hidden text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100"
                key={index}
              >
                <input
                  className="hidden input-btn"
                  type="radio"
                  id={`valueIs-${index}`}
                  name="valueIs-radio"
                  value={option}
                  onChange={() => handleOptionClick(option, index)}
                />
                <label className="w-auto" htmlFor={`valueIs-${index}`}>
                  {/* <span className="span"></span> */}
                  <span className="txt w-max">{option}</span>
                </label>
              </div>
            ))}
          {/* normal mcq end */}
        </div>

        {/* for checking answer */}
        {/* <div>{quizData[props.index]["score"]}</div>  */}
      </div>
    </div>
  );
};

export default QuizTemplate;
