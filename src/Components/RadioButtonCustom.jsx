/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const RadioButtonCustom = (props) => {
  return (
    <>
      <div className="flex flex-col items-start justify-start ">
        <div className=" flex flex-wrap mx-auto gap-4 w-[95%] p-2">
          {props.options.map((option, index) => (
            <label key={index} className="inline-flex items-center ">
              <input
                type="radio"
                className="form-radio hidden h-5 w-5 text-indigo-600"
                name="radio-buttons"
                value={option - 1}
                content={option}
                checked={props.selectedOption === option - 1}
                onChange={() => {
                  if (!props.attemptedQuestions.includes(option - 1)) {
                    if (props.selectedOption != 4) {
                      props.setAttemptedQuestions([
                        ...props.attemptedQuestions,
                        props.selectedOption,
                      ]);
                    }
                    props.onChange(option - 1);
                  }
                }}
              />
              <span
                className={`${
                  props.attemptedQuestions.includes(option - 1)
                    ? ""
                    : " transition-all duration-300 hover:opacity-85 cursor-pointer"
                } w-12 relative  rounded-[88px]  box-border h-[2.813rem] overflow-hidden text-center flex items-center justify-center text-[1.125rem] text-white font-prosto-one border-[1px] border-solid border-[#964ae8] ${
                  props.selectedOption === option - 1
                    ? "bg-[#964ae8]"
                    : props.attemptedQuestions.includes(option - 1)
                    ? "bg-black"
                    : "bg-gray"
                } `}
              >
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};

export default RadioButtonCustom;
