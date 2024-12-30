"use client";

import { X } from "lucide-react";

const Modal = ({ showModal, setShowModal, generatedNotes }) => {
  console.log(generatedNotes);
  return showModal ? (
    <div className=" flex flex-col fixed inset-0 bg-black bg-opacity-90 z-50 items-center justify-center w-[450px] min-h-screen ">
      <div className="border-[#321c43] bg-[#0f0e13]  border-2 rounded-lg h-24">
        <div className="flex justify-between px-4  w-full h-12 items-center">
          <p className="text-lg font-semibold">Do you want a file</p>

          <div className="flex justify-between w-20 pl-14">
            <X
              className="w-5 h-5 text-gray-400 cursor-pointer "
              onClick={() => setShowModal(false)}
            />
          </div>
        </div>
        <div className="flex justify-around items-center w-full">
          <button className="w-20  cursor-pointer h-8 bg-gradient-to-r from-purple-700 to-violet-800 rounded-lg">
            Yes
          </button>
          <button className="w-20  cursor-pointer h-8 bg-gradient-to-r from-purple-700 to-violet-800 rounded-lg">
            No
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Modal;
