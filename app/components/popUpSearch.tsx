import { Drawer } from "vaul";
import React, { useEffect } from "react";
import { Search } from "./search";

interface Climb {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}

interface popUpProps {
  animate: boolean;
  handleClick: () => void;
  setClimb: React.Dispatch<React.SetStateAction<Climb | null>>;
  climb: Climb | null;
}

const PopUpSearch: React.FC<popUpProps> = ({
  handleClick,
  animate,
  climb,
  setClimb,
}) => {
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
          <Drawer.Trigger className="absolute  left-[44dvw] overflow-hidden rounded-md px-4  transition-all">
            <svg width="50px" height="50px" viewBox="0 0 76 76">
              <path
                fill="#e8e9eb"
                d="M 22,19L 24,19L 24,57L 22,57L 22,19 Z M 26,57L 26,19.0001L 53.9999,19.0001L 53.9999,57L 26,57 Z M 30,24L 30,27L 50,27L 50,24L 30,24 Z M 30,32L 30,35L 33,35L 33,32L 30,32 Z M 36,32L 36,35L 49,35L 49,32L 36,32 Z M 30,40L 30,43L 33,43L 33,40L 30,40 Z M 36,40L 36,43L 48,43L 48,40L 36,40 Z M 30,48L 30,51L 33,51L 33,48L 30,48 Z M 36,48L 36,51L 50,51L 50,48L 36,48 Z "
              />
            </svg>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Overlay className="z-40 fixed inset-0 bg-black/40" />
            <Drawer.Content className="z-40 bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
              <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 " />
                <div className="max-w-[750px] mx-auto">
                  <Drawer.Title className="font-medium mb-12 text-gray-900">
                    MoogBoard by 7akoda
                  </Drawer.Title>
                  <Search setClimb={setClimb} climb={climb} />
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

export default PopUpSearch;
