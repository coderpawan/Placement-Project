import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import RatingModal from "./Rating";
import InstructModal from "./instruct";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [instructopen, setInstructopen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleRatingModal = () => {
    setRatingModalOpen(!isRatingModalOpen);
  };
  const toggleInstructModal = () => {
    setInstructopen(!instructopen);
  };

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={process.env.PUBLIC_URL + "/dashtoon.png"} // Replace with the path to your logo image
            alt="Logo"
            className="h-8 w-auto"
          />
        </div>

        {/* Navigation buttons for desktop */}
        <div className="hidden md:flex items-center">
          <button
            onClick={toggleInstructModal}
            className="text-white mr-4 hover:text-gray-400 focus:outline-none"
          >
            Instructions
          </button>
          <button
            onClick={toggleRatingModal}
            className="bg-blue-500 text-white hover:text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none"
          >
            Give Rating
          </button>
        </div>

        {/* Menu icon for mobile */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 right-0 bg-gray-800 p-4">
            <button
              onClick={toggleInstructModal}
              className="text-white mb-2 block hover:text-gray-400"
            >
              Instructions
            </button>
            <button
              onClick={toggleRatingModal}
              className="bg-blue-500 hover:text-white text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Give Rating
            </button>
          </div>
        )}
        <RatingModal
          isOpen={isRatingModalOpen}
          closeModal={toggleRatingModal}
        />
        <InstructModal isOpen={instructopen} closeModal={toggleInstructModal} />
      </div>
    </nav>
  );
};

export default Navbar;
