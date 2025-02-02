import React, { useState, useEffect } from "react";
import { BpmControl } from "./bpm";
import { Search } from "./search";

interface Climb {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}

interface popOutProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  setClimb: React.Dispatch<React.SetStateAction<Climb | null>>;
  climb: Climb | null;
}

export const SideBar: React.FC<popOutProps> = ({
  handleClick,
  animate,
  bpm,
  setBpm,
  setClimb,
  climb,
}) => {
  return (
    <>
      <div className="right-2 top-2 bottom-2  fixed z-10 outline-none w-[310px] flex">
        <div className="bg-zinc-50 p-5 h-full w-full grow flex flex-col rounded-[16px]">
          <div className="max-w-[300px] overflow-hidden z-10">
            <p className="  justify-self-start font-medium mb-12 text-gray-900">
              MoogBoard by 7akoda
            </p>
            <div className="flex flex-row justify-self-center ">
              <BpmControl
                handleClick={handleClick}
                animate={animate}
                bpm={bpm}
                setBpm={setBpm}
              ></BpmControl>
            </div>
            <Search setClimb={setClimb} climb={climb} />
            <div className="mt-[81.3dvh] p-4 bg-gray-100 border-t border-gray-200 rounded-[16px] ">
              <div className=" pt-100 flex flex-row justify-end align-bottom gap-6 max-w-[100px] mx-auto">
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://github.com/7akoda"
                  target="_blank"
                >
                  GitHub
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
                <a
                  className="text-xs text-gray-600 flex items-center gap-0.25"
                  href="https://www.linkedin.com/in/takoda-godin-a18a84199/"
                  target="_blank"
                >
                  Linkedin
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
