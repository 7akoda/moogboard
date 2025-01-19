import React, { useState, useEffect } from "react";
import { BpmControl } from "./bpm";
import MooglogoPopUp from "./icons/Board/logos/moogboardlogoPopUp";
import { Drawer } from "vaul";

interface popOutProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
}

export const PopOut: React.FC<popOutProps> = ({
  handleClick,
  animate,
  bpm,
  setBpm,
}) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (animate) {
      setOpen(false);
    }
  }, [animate]);

  return (
    <>
      <MooglogoPopUp></MooglogoPopUp>
      <Drawer.Root open={open} onOpenChange={setOpen} direction="right">
        <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">
          Open Drawer
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-2 bottom-2  fixed z-10 outline-none w-[310px] flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            <div className="bg-zinc-50 p-5 h-full w-full grow flex flex-col rounded-[16px]">
              <div className="max-w-[100px]">
                <Drawer.Title className="  justify-self-start font-medium mb-12 text-gray-900">
                  MoogBoard by 7akoda
                </Drawer.Title>
                <BpmControl
                  handleClick={handleClick}
                  animate={animate}
                  bpm={bpm}
                  setBpm={setBpm}
                ></BpmControl>
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
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
};
