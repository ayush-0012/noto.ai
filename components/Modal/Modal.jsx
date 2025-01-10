"use client";

import { X } from "lucide-react";
import TopicNameModal from "./TopicNameModal";

const Modal = ({
  showModal,
  setShowModal,
  setFileNameModal,
  setTopicModal,
}) => {
  const handleYes = () => {
    setShowModal(false);
    setFileNameModal(true);
  };

  const handleNo = () => {
    setShowModal(false);
    setTopicModal(true);
  };

  return (
    <>
      {showModal ? (
        <div className="flex flex-col fixed inset-0 bg-black bg-opacity-90 z-40 items-center justify-center w-full min-h-screen">
          <div className=" bg-[#1a1a1a] rounded-lg w-[90%]">
            <div className="flex justify-between px-4 w-full items-center mt-4">
              <p className="text-lg font-bold ">Generate File</p>
              <div className="flex justify-between w-20 pl-14">
                <X
                  className="w-5 h-5 text-gray-500 cursor-pointer"
                  onClick={() => setShowModal(false)}
                />
              </div>
            </div>
            <p className="text-gray-300 pl-4 mt-2">
              Would you like to generate a file for your notes?
            </p>
            <div className="flex justify-end items-center w-full my-4 pr-4">
              <button
                className="w-16 cursor-pointer h-10 bg-[#1a1a1a] border border-[#321c43] rounded-lg mx-2 hover:bg-[#321c43]/50"
                onClick={handleNo}
              >
                No
              </button>
              <button
                className="w-16 cursor-pointer h-10 bg-gradient-to-r from-purple-700 to-violet-800 rounded-lg"
                onClick={handleYes}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TopicNameModal />
      )}
    </>
  );
};

export default Modal;
