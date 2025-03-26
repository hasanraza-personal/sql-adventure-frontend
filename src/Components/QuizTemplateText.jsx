/* eslint-disable react/display-name */
import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
const QuizTemplateText = (props) => {
  const [newQuestion, setNewQuestion] = useState();

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
            <div className="flex gap-5 flex-wrap items-center h-40 my-5">
              <textarea
                className="w-full p-4 bg-darkorchid-200 text-white font-prosto-one rounded-[15px] border border-darkorchid-100 focus:outline-none focus:ring-2 focus:ring-darkorchid-100 
             h-40 md:h-32 lg:h-40 xl:h-48 resize-none overflow-y-auto"
                placeholder="Type your answer here..."
                value={props.queryText}
                onChange={props.onChange}
              />
              <br />
            </div>
          </div>
          {/* Selected options */}
        </div>
      </div>
    </>
  );
};

export default QuizTemplateText;
