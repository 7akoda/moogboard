import { Drawer } from "vaul";
export const PopUpInfo = () => {
  return (
    <>
      <div className="flex flex-col justify-self-center justify-items-center z-20">
        <Drawer.Root>
          <Drawer.Trigger className=" z-40 absolute -bottom-full right-[20%] translate-x-1/2 overflow-hidden rounded-md transition-all">
            <svg
              className="w-[10dvw] h-[5.5dvh]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.967 12.75C12.967 11.75 13.967 11.3546 13.967 10.25C13.967 9.14543 13.0716 8.25 11.967 8.25C11.0351 8.25 10.252 8.88739 10.03 9.75M11.967 15.75H11.977M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="#313638"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Drawer.Trigger>
          <Drawer.Portal>
            <Drawer.Content className="z-40 bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none">
              <div className="p-4 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 " />
                <div className="max-w-[750px] mx-auto">
                  <Drawer.Title className="font-medium mb-10 pt-2 text-gray-900">
                    MoogBoard by 7akoda
                  </Drawer.Title>
                  <p className="text-gray-600 mb-2">
                    A React app where MoonBoard 2019 climbing holds become
                    musical triggers—colliding with a moving line to generate
                    dynamic compositions using 18 chords and 4 instruments.
                    Discover the harmony{" "}
                    <a
                      target="_blank"
                      className="underline"
                      href="https://github.com/7akoda/moogboard"
                    >
                      here
                    </a>
                    .
                  </p>
                  <p className="text-gray-600 text-xs">
                    Although there are many benchmarked climbs in the database
                    feel free to create your own!.
                  </p>
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
