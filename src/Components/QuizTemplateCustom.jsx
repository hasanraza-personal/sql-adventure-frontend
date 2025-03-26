/* eslint-disable react/display-name */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

/* eslint-disable react/prop-types */
const QuizTemplateCustom = forwardRef((props, ref) => {
  const [newQuestion, setNewQuestion] = useState();
  const [newSelectedOptions, setNewSelectedOptions] = useState(
    props.quizData[props.index]["selectedOption"]
  );
  const [newRemainingOptions, setNewRemainingOptions] = useState(
    props.quizData[props.index].remainingOption
  );

  useEffect(() => {
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    setNewRemainingOptions(
      shuffleArray(props.quizData[props.index].remainingOption)
    );
  }, []);

  // Expose newSelectedOptions to parent via a getter function.
  // eslint-disable-next-line no-undef
  useImperativeHandle(
    ref,
    () => ({
      getNewSelectedOptions: () => newSelectedOptions,
    }),
    [newSelectedOptions]
  );

  const newHandleRemoveOption = (option) => {
    setNewSelectedOptions(newSelectedOptions.filter((opt) => opt !== option));
    setTimeout(() => {
      setNewRemainingOptions([...newRemainingOptions, option]);
    }, 300);
  };

  // For normal mcq
  const handleOptionClick = (option) => {
    props.setWrongOption(null);
    setNewSelectedOptions([option]);
  };

  // For query mcq
  const newHandleOptionClick = (option) => {
    setNewRemainingOptions(newRemainingOptions.filter((opt) => opt !== option));
    setNewSelectedOptions([...newSelectedOptions, option]);
  };

  // Set new question
  useEffect(() => {
    setNewQuestion(props.quizData[props.index].question);
  }, [props]);

  return (
    <>
      <div className="bg-black w-[90%] mx-auto max-w-full relative h-max">
        <div className="w-[90%] mx-auto lg:w-[900px] max-w-max min-w-fit  relative p-7  rounded-[15px] bg-darkorchid-200 box-border min-h-[18.938rem]  text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
          <div className="absolute top-[-4.875rem] left-[49.75rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-100 w-[11.688rem] h-[11.688rem]" />
          {/* Questions */}
          <div className="w-[90%] lg:w-[49.125rem] max-w-full relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-left inline-block">
            {props.index + 1 + ") " + newQuestion}
          </div>
          {/* Questions */}

          {/* Selected options */}
          <div>
            <p className="my-4">Your Answer:</p>
            <div className="flex gap-5 flex-wrap items-center h-12 my-5">
              {newSelectedOptions.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer bg-white hover:opacity-70 hover:scale-105  text-black p-1 transition-opacity duration-300"
                  onClick={() => {
                    if (props.quizData[props.index].type === "a") {
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
          </div>
          {/* Selected options */}

          {/* Options */}
          <div className="flex flex-wrap gap-4 mb-5">
            {/* normal mcq */}
            <div className="flex flex-wrap gap-2">
              {props.quizData[props.index].type === "b" &&
                newRemainingOptions.map((option, index) => (
                  <div
                    className={`bg-black cursor-pointer p-3 hover:opacity-70 hover:scale-105 transition-all duration-200 h-[47px] relative rounded flex items-center justify-center box-border overflow-hidden text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid ${
                      // Only highlight the clicked wrong option with a red border.
                      props.wrongOption === option
                        ? "border-red-500 bg-red-500"
                        : "border-darkorchid-100"
                    }`}
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
            </div>
            {/* normal mcq */}

            {/* SQL mcq */}
            <div className="flex flex-wrap gap-2">
              {props.quizData[props.index].type === "a" &&
                newRemainingOptions.map((option, index) => (
                  <div
                    className="w-[131px] bg-black cursor-pointer p-3 hover:opacity-70 hover:scale-105 transition-all duration-200 min-w-max h-[47px] relative rounded flex items-center justify-center  box-border overflow-hidden text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100"
                    key={index}
                    onClick={() => newHandleOptionClick(option)}
                  >
                    <span className=" bg-black text-center flex rounded-xl">
                      {option}
                    </span>
                  </div>
                ))}
            </div>
            {/* SQL mcq */}
          </div>
        </div>
      </div>
    </>
  );
});

export default QuizTemplateCustom;
