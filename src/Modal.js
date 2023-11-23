// Modal.js
import React from "react";
import Modal from "react-modal";
import { GrClose } from "react-icons/gr"; // Import a close icon from your preferred icon library

Modal.setAppElement("#root"); // Set the root element for accessibility

const CustomModal = ({ isOpen, closeModal, imageUrl }) => {
  const overlayStyle = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black overlay
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
      <div className="relative">
        <img
          src={imageUrl}
          alt="Preview"
          className="w-full h-full object-contain"
        />
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

export default CustomModal;
