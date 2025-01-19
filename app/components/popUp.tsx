import { Drawer } from "vaul";
import React, { useState, useEffect } from "react";
import { BpmControl } from "./bpm";
import MooglogoPopUp from "./icons/Board/logos/moogboardlogoPopUp";

interface popUpProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
}

const PopUp: React.FC<popUpProps> = ({ handleClick, animate, bpm, setBpm }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (animate) {
      setOpen(false);
    }
  }, [animate]);

  return (
    <div className="flex flex-col justify-self-center">
      <MooglogoPopUp></MooglogoPopUp>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="z-40 fixed inset-0 bg-black/40" />
          <Drawer.Content
            aria-describedby="controls for application"
            className="z-40 bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none"
          >
            <div className="p-4 bg-white rounded-t-[10px] flex-1">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 " />
              <div className="max-w-[750px] mx-auto">
                <Drawer.Title className="font-medium mb-12 text-gray-900">
                  MoogBoard by 7akoda
                </Drawer.Title>
                <BpmControl
                  handleClick={handleClick}
                  animate={animate}
                  bpm={bpm}
                  setBpm={setBpm}
                ></BpmControl>
              </div>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
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
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default PopUp;
