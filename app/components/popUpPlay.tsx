import { Drawer } from "vaul";
import React, { useEffect } from "react";
import { BpmControl } from "./bpm";

interface popUpProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
}

const PopUpPlay: React.FC<popUpProps> = ({
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
      <div className="flex flex-col justify-self-center justify-items-center ">
        <Drawer.Root open={open} onOpenChange={setOpen}>
          <Drawer.Trigger className="fixed bottom-[25px] z-30 left-[1/2] -translate-x-1/2 rounded-md transition-all">
            <>
              <svg
                className="w-[49px] h-[49px] bottom-[-3px]  z-30 absolute"
                viewBox="2.35 2.35 19.3 19.3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#e8e9eb"
                  fill="#e8e9eb"
                  strokeWidth={1.3}
                />
                <path
                  d="M15.0015 11.3344C15.3354 11.5569 15.5023 11.6682 15.5605 11.8085C15.6113 11.9311 15.6113 12.0689 15.5605 12.1915C15.5023 12.3318 15.3354 12.4431 15.0015 12.6656L11.2438 15.1708C10.8397 15.4402 10.6377 15.5749 10.4702 15.5649C10.3243 15.5561 10.1894 15.484 10.1012 15.3674C10 15.2336 10 14.9908 10 14.5052V9.49481C10 9.00923 10 8.76644 10.1012 8.63261C10.1894 8.51601 10.3243 8.44386 10.4702 8.43515C10.6377 8.42515 10.8397 8.55982 11.2438 8.82917L15.0015 11.3344Z"
                  stroke="#313638"
                  strokeWidth={1.3}
                />
              </svg>
              <svg
                className="w-[49px] h-[49px] "
                viewBox="2.35 2.35 19.3 19.3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="#e8e9eb"
                  fill="#e8e9eb"
                  strokeWidth={1.3}
                  opacity={0.5}
                />
              </svg>
            </>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content className="z-40 bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 " />
                <div className="max-w-[750px] mx-auto">
                  <Drawer.Title className="font-medium mb-10 pt-2 text-gray-900">
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

export default PopUpPlay;
