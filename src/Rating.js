import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GrClose } from "react-icons/gr";

Modal.setAppElement("#root");

const RatingModal = ({ isOpen, closeModal }) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isFeedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    const savedRating = localStorage.getItem("userRating");
    const savedFeedback = localStorage.getItem("userFeedback");
    if (savedRating) {
      setRating(parseInt(savedRating, 10));
    }
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, []);

  const handleStarClick = (starValue) => {
    setFeedbackSubmitted(false);
    setRating(starValue);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const saveRatingAndFeedback = () => {
    const newRating = rating;
    localStorage.setItem("userRating", newRating.toString());
    const newFeedback = feedback;
    localStorage.setItem("userFeedback", newFeedback);
    setFeedbackSubmitted(true);

    console.log("submitted");
  };

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
      contentLabel="Rate the App"
      style={{ ...overlayStyle, ...contentStyle }}
    >
      <div className="relative p-4">
        <h2 className="text-center text-xl mb-4">Give Rating</h2>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((starValue) => (
            <button
              key={starValue}
              onClick={() => handleStarClick(starValue)}
              className="text-yellow-500 focus:outline-none"
            >
              {starValue <= rating ? (
                <AiFillStar size={30} />
              ) : (
                <AiOutlineStar size={30} />
              )}
            </button>
          ))}
        </div>
        {!isFeedbackSubmitted && (
          <>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Share your feedback..."
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button
              onClick={saveRatingAndFeedback}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 hover:text-white focus:outline-none flex justify-center text-center"
            >
              Submit Rating & Feedback
            </button>
          </>
        )}
        {isFeedbackSubmitted && (
          <p className="text-center text-green-500">
            Thank you for your feedback!
          </p>
        )}
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

export default RatingModal;
