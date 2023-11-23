// Modal.js
import React from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr";

Modal.setAppElement("#root");

const InstructModal = ({ isOpen, closeModal, imageUrl }) => {
  const overlayStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 1000,
    },
  };

  const contentStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
      border: "none",
      borderRadius: "10px",
      overflow: "hidden",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Image Preview"
      style={{ ...overlayStyle, ...contentStyle }}
    >
      <div className="relative bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">
            Some Important Instructions
          </h2>
          <ul className="list-disc pl-4">
            <li className="mb-2">
              Please wait for 4-5 minutes until all the images get generated.
            </li>
            <li className="mb-2">Please give feedback after using the app.</li>
            <li className="mb-2">
              Try to provide a detailed description in the prompt for a better
              comic result.
            </li>
          </ul>
        </div>
        <button
          onClick={closeModal}
          className="absolute top-0 right-0 m-4 text-white"
        >
          <GrClose className="text-3xl bg-gray-700 hover:bg-red-500 hover:text-white rounded-full p-1" />
        </button>
      </div>
    </Modal>
  );
};

export default InstructModal;
