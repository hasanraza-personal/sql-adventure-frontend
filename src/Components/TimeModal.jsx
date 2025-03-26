import React from 'react'

const TimeModal = () => {
  return (
    <div className='absolute top-1/2 flex items-center justify-center left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 backdrop-filter backdrop-blur-sm   w-full h-full'>
    <div className="w-[723px] min-w-fit p-2 flex flex-col items-center justify-center relative rounded-[15px] bg-midnightblue box-border h-max overflow-hidden text-left text-[1.25rem] text-white font-press-start-2p border-[1px] border-solid border-darkorchid-100">
<div className="absolute top-[-3.312rem] left-[36.375rem] [filter:blur(241.6px)] rounded-[50%] bg-darkorchid-200 w-[11.688rem] h-[11.688rem]" />
<div className="mb-10 leading-[166.21%]">{`Time's Up !!!!!!`}</div>
<div className="flex hover:opacity-80 cursor-pointer items-center justify-center rounded bg-darkorchid-200 box-border w-[8.688rem] h-[2.938rem] overflow-hidden text-[1rem] border-[1px] border-solid border-darkorchid-100">
<div className="">Submit Quiz</div>

      </div>
    </div>  
    </div>
  )
}

export default TimeModal
