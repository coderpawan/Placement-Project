import React, { useState } from "react";
import Navbar from "./Navbar";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { IoExpand } from "react-icons/io5";
import "./App.css";
import Modal from "./Modal";
import Preloader from "./Preloader";
import RatingModal from "./Rating";
// import Noimage from "./public/noimage.jpg";

const ComicImageViewer = () => {
  const [fetching, setFetching] = useState(false);
  const [images, setImages] = useState([]);

  async function query(data) {
    try {
      const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
          headers: {
            Accept: "image/png",
            Authorization:
              "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        <RatingModal isOpen={true} />;
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.blob();
      return result;
    } catch (error) {
      console.error("Error in query:", error);
      throw error;
    }
  }

  const fetchAndDisplayImages = async () => {
    setImages([]);
    setFetching(true);
    const imageForms = document.querySelectorAll(".imageForm");
    const newImages = [];

    for (const form of imageForms) {
      const input1 = form.querySelector('input[name$="_1"]').value;
      const prompt_for_text_bubble =
        ". Add the text bubble in english saying - ";
      const input2 = form.querySelector('input[name$="_2"]').value;

      try {
        const keyword = `${input1}${
          input2 ? ` ${prompt_for_text_bubble} "${input2}"` : ""
        }`;
        const blobResult = await query({ inputs: keyword });
        newImages.push(blobResult);
      } catch (error) {
        console.error(
          `Error for form with inputs ${input1}, ${input2}:`,
          error
        );
      }
    }

    setImages(newImages);
    setFetching(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="text-center bg-cover bg-fixed bg-center bg-comic-image h-screen overflow-x-hidden">
      <Navbar />

      <div className="flex flex-wrap justify-center mt-10">
        {[...Array(10).keys()].map((index) => (
          <div
            key={index}
            className="imageForm px-3 py-2 rounded overflow-hidden shadow-lg mr-3 ml-3 mb-4 w-full lg:w-1/6 md:w-1/3 sm:w-full"
          >
            <label
              htmlFor={`input${index + 1}_1`}
              className="block font-semibold mb-2 text-black"
            >
              {`Enter prompt (page ${index + 1}):`}
            </label>
            <input
              type="text"
              id={`input${index + 1}_1`}
              name={`input${index + 1}_1`}
              className="w-full p-2 mb-2 border border-gray-300 shadow-sm  rounded"
              required
            />
            <label
              htmlFor={`input${index + 1}_2`}
              className="block font-semibold mb-2 text-black"
            >
              Enter bubble text:
            </label>
            <input
              type="text"
              id={`input${index + 1}_2`}
              name={`input${index + 1}_2`}
              className="w-full p-2 mb-4 border border-gray-300 shadow-sm rounded"
              required
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={fetchAndDisplayImages}
        className={`p-4 text-black bg-blue-200 hover:bg-blue-500 hover:text-white font-semibold rounded ${
          fetching ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {fetching ? (
          <>
            Generating... <i className="fa fa-spinner fa-spin"></i>
          </>
        ) : (
          "Generate Images"
        )}
      </button>
      {fetching ? (
        <div className="">
          <div className="flex items-center justify-center my-6">
            <p className="text-white flex bg-red-500 px-4 py-2 rounded shadow-lg animate-fadeIn">
              <TbAlertTriangleFilled className="mr-2 relative top-1" />
              Please wait after clicking the Generate button, the system takes
              4-5 mins time to generate all 10 images.
            </p>
          </div>
          <div className="flex">
            <Preloader />
            <Preloader />
            <Preloader />
            <Preloader />
            <Preloader />
          </div>
          <div className="flex">
            <Preloader />
            <Preloader />
            <Preloader />
            <Preloader />
            <Preloader />
          </div>
        </div>
      ) : (
        <p></p>
      )}

      <div id="imageContainer" className="flex flex-wrap justify-center">
        {images.map((blob, index) => (
          <div
            key={index}
            className=" mx-2 my-4 bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-md relative lg:w-1/6 md:w-1/3 sm:w-full"
          >
            <img
              src={URL.createObjectURL(blob)}
              alt={`page ${index + 1}`}
              className="w-full h-48 object-cover"
            />
            <div className=" flex text-center justify-center my-1">
              <p className="font-bold text-xl mb-2">Page {index + 1}</p>
              <button
                onClick={() => openModal(URL.createObjectURL(blob))}
                className="bg-blue-500 hover:bg-blue-700 hover:text-white text-white font-bold rounded-full relative px-2"
                style={{ left: "17%" }}
              >
                <IoExpand />
              </button>
            </div>
          </div>
        ))}
        <Modal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          imageUrl={selectedImage}
        />
      </div>
    </div>
  );
};

export default ComicImageViewer;
