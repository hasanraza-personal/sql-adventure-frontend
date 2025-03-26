import StarRating from "./StarRating";

/* eslint-disable react/prop-types */
const CongratsModal = ({ level, onClose, quizLevel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-98 z-50">
      <div className="bg-darkorchid-200 p-8 rounded-[15px] shadow-lg text-center border border-darkorchid-100">
        <h2 className="text-3xl font-prosto-one text-white mb-4">
          Congratulations!
        </h2>
        <div className="flex items-center justify-center gap-3 pt-2 pb-4">
          {/* <span className="text-white text-lg font-semibold">
            Level: {quizLevel}
          </span> */}
          <StarRating level={quizLevel} />
        </div>
        <p className="text-lg text-white mb-6">
          You have reached level {Number(level) + 1}!
        </p>
        <button
          onClick={onClose}
          className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-prosto-one rounded transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CongratsModal;
