import ReactDOM from "react-dom";

const WrongChoiceModal = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-98 z-[9999]">
      <div className="bg-darkorchid-200 rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-white text-xl font-bold mb-4">Incorrect Answer</h2>
        <p className="text-white mb-6">{message}</p>
        <button
          className="bg-white text-black font-bold py-2 px-4 rounded"
          onClick={onClose}
        >
          Try Again
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default WrongChoiceModal;
