import React from "react";
import { Context } from "../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  const { setFeedbackModal, feedbackText, quizData, setFeedbackText } =
    React.useContext(Context);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("hello i am under water");
  
   
  }, [])
  

  return (
    <div className="absolute top-1/2 flex items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-filter backdrop-blur-sm   w-full h-full">
      <div className="w-[80%] max-w-[723px] p-2 flex flex-col items-center justify-center relative rounded-[15px] bg-midnightblue box-border min-h-[22.063rem] overflow-hidden text-left text-[1.25rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100">
        <div className="absolute top-[-3.312rem] left-[36.375rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-200 w-[11.688rem] h-[11.688rem]" />
        <div className="mb-10 leading-[166.21%]">FEEDBACK</div>
        <div className="mb-8 text-[1.125rem] leading-[166.21%] font-prosto-one text-justify inline-block  max-w-[38.5rem]">
          {feedbackText}
        </div>
        <div className="flex hover:opacity-80 cursor-pointer items-center justify-center rounded bg-darkorchid-200 box-border w-[8.688rem] h-[2.938rem] overflow-hidden text-[1rem] border-[1px] border-solid border-darkorchid-100">
          <div
            onClick={() => {
              setFeedbackModal(false);
              setFeedbackText("");
              navigate("/");
            }}
            className=""
          >
            OKAY
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
