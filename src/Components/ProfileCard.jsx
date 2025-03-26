/* eslint-disable react/prop-types */

import { useEffect } from "react";

// import React from "react";
const ProfileCard = (props) => {
  console.log("props: ", props);

  function calculateDate(isoString) {
    const dateObj = new Date(isoString);

    const dateOptions = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    return dateObj.toLocaleDateString("en-IN", dateOptions);
  }

  function calculateTime(isoString) {
    const dateObj = new Date(isoString);

    const timeOptions = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    };

    return dateObj.toLocaleTimeString("en-IN", timeOptions);
  }

  return (
    <div className="w-full  p-[11px] flex flex-col relative rounded-[11px] bg-darkorchid-200 box-border h-auto lg:h-[18.438rem] overflow-hidden text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
      <div className="absolute top-[-4.625rem] left-[26.375rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-200 w-[14.438rem] h-[14.438rem]" />

      <div className="w-full  mb-5 relative rounded-lg bg-darkorchid-200 box-border h-auto   text-left text-[1.25rem] text-white font-prosto-one border-[1px] border-solid border-darkorchid-100">
        {/* <div className="absolute top-[0.625rem] left-[32.938rem] rounded-22xl bg-white w-[1.688rem] h-[1.688rem] overflow-hidden" /> */}
        <div className="w-full p-[11px] h-full  grid grid-cols-2">
          <div className="w-max mx-auto relative flex items-center justify-center text-[2rem] lg:text-[2.25rem] leading-[166.21%] font-prosto-one text-white text-center ">
            {/* {props.score || 0}/{props.totalQuiz || 0} */}
            {props.index + 1}
          </div>

          <div className="flex flex-col  gap-2 items-end justify-evenly">
            <div className="flex gap-4 ">
              <div className="w-[9.563rem] relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-right inline-block">
                {calculateDate(props.quiz.createdAt) || "no date"}
              </div>
              <div>
                <img
                  className="w-[29px]  relative max-w-full overflow-hidden h-[1.813rem] object-cover"
                  src="https://i.imgur.com/6Lrg2wd.png"
                  alt=""
                />
              </div>
            </div>

            <div className="flex gap-4 ">
              <div className="w-[9.563rem] relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-right inline-block">
                {calculateTime(props.quiz.createdAt) || "no time"}
              </div>
              <div>
                <img
                  className="w-[29px]  relative max-w-full overflow-hidden h-[1.813rem] object-cover"
                  src="https://i.imgur.com/XnrfyeZ.png"
                  alt=""
                />
              </div>
            </div>

            <div className="flex gap-4  ">
              <div className="w-[9.563rem] relative text-[1.25rem] leading-[166.21%] font-prosto-one text-white text-right inline-block">
                {props.quiz.totalTime + " min" || "no duration"}
              </div>
              <div>
                <img
                  className="w-[29px]  relative max-w-full overflow-hidden h-[1.813rem] object-cover"
                  src="https://i.imgur.com/Cokd5Z1.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="max-w-[100%]  p-2  lg:p-4  relative h-auto overflow-y-scroll text-[0.8rem] md:text-[1.125rem] leading-[166.21%] font-prosto-one text-white text-justify text-wrap inline-block">
        {props.feedback || "no feedback available"}
      </div> */}
    </div>
  );
};

export default ProfileCard;
