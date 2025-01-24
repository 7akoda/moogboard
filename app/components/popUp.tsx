import { Drawer } from "vaul";
import React, { useState, useEffect } from "react";
import { BpmControl } from "./bpm";

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
    <>
      <div className="flex flex-col justify-self-center">
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger className=" m-6 relative flex h-7 flex-shrink-0 items-center justify-center gap-8 overflow-hidden rounded-full px-4 text-sm font-medium shadow-sm transition-all  bg-[#313638]">
            <svg
              width="20px"
              height="20px"
              viewBox="10 0 24 24"
              fill="#e8e9eb"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.46967 10.0303C6.17678 9.73744 6.17678 9.26256 6.46967 8.96967L11.4697 3.96967C11.7626 3.67678 12.2374 3.67678 12.5303 3.96967L17.5303 8.96967C17.8232 9.26256 17.8232 9.73744 17.5303 10.0303C17.2374 10.3232 16.7626 10.3232 16.4697 10.0303L12.75 6.31066L12.75 14.5C12.75 15.2133 12.9702 16.3 13.6087 17.1868C14.2196 18.0353 15.2444 18.75 17 18.75C17.4142 18.75 17.75 19.0858 17.75 19.5C17.75 19.9142 17.4142 20.25 17 20.25C14.7556 20.25 13.2804 19.298 12.3913 18.0632C11.5298 16.8667 11.25 15.4534 11.25 14.5L11.25 6.31066L7.53033 10.0303C7.23744 10.3232 6.76256 10.3232 6.46967 10.0303Z"
                fill="#e8e9eb"
              />
            </svg>

            <svg
              width="20px"
              height="20px"
              viewBox="-10 0 24 24"
              fill="#e8e9eb"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5303 10.0303C17.8232 9.73744 17.8232 9.26256 17.5303 8.96967L12.5303 3.96967C12.2374 3.67678 11.7626 3.67678 11.4697 3.96967L6.46967 8.96967C6.17678 9.26256 6.17678 9.73744 6.46967 10.0303C6.76256 10.3232 7.23744 10.3232 7.53033 10.0303L11.25 6.31066L11.25 14.5C11.25 15.2133 11.0298 16.3 10.3913 17.1868C9.7804 18.0353 8.75556 18.75 7 18.75C6.58579 18.75 6.25 19.0858 6.25 19.5C6.25 19.9142 6.58579 20.25 7 20.25C9.24444 20.25 10.7196 19.298 11.6087 18.0632C12.4702 16.8667 12.75 15.4534 12.75 14.5L12.75 6.31066L16.4697 10.0303C16.7626 10.3232 17.2374 10.3232 17.5303 10.0303Z"
                fill="#e8e9eb"
              />
            </svg>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="z-40 fixed inset-0 bg-black/40" />
            <Drawer.Content className="z-40 bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
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
    </>
  );
};

export default PopUp;
