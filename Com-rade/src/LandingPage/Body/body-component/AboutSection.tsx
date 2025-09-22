function About() {
  return (
    <div className="relative w-full !h-[40dvh] sm:!h-[20dvh] !md:h-[20dvh] lg:!h-[20dvh] xl:!h-[20dvh] 2xl:!h-[20dvh] bg-transparent overflow-hidden flex justify-center items-center border-b gap-4 !flex-col sm:!flex-col md:!flex-row lg:!flex-row xl:!flex-row 2xl:!flex-row py-2 px-8">
      <div
        className=" rounded border z-10 
             !w-full sm:!w-full md:!w-full lg:!w-auto xl:!w-auto 2xl:!w-auto py-3 flex flex-col justify-center items-center
             [background-image:repeating-linear-gradient(-45deg,#222d38_0px,#222d38_.5px,transparent_.5px,transparent_1px)]"
      >
        <div className="w-full h-[90%] flex flex-col justify-center items-center rounded border-y relative bg-background p-4">
          <div className="border rounded-full w-[10px] h-[10px] absolute top-4 left-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute top-4 right-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute bottom-4 left-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute bottom-4 right-4"></div>
          <div className="flex gap-4 px-6 py-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto">
              {/* App Store Button */}
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-black text-white rounded-xl px-4 sm:px-5 py-2 sm:py-3 border border-white/20 shadow-sm hover:opacity-90 transition w-full sm:w-auto"
                aria-label="Download on the App Store"
              >
                {/* Apple icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.1-36.9 16.4-64.8 50-85.5-18.9-27.6-47.5-43-85.5-45-35.8-1.9-74.3 20.8-88.3 20.8-14.3 0-47.4-20.1-73.4-19.6-38.3.6-72.7 22.3-92.1 56.7-39.3 68.3-10.1 169.2 28.2 224.5 18.7 27.3 41.1 57.9 70.7 56.8 28.3-1.1 39.1-18.4 73.4-18.4 34.2 0 44.1 18.4 73.6 17.8 30.3-.5 49.4-27.6 67.9-55.2 21.2-31.3 30-61.6 30.4-63.2-.6-.2-58.3-22.3-58.4-88zM256 57.3c15.8-19.1 26.5-45.6 23.7-72.3-23 .9-50.8 15.3-67.3 34.4-14.7 17.1-27.6 44.3-24.2 70.2 25.6 2 52.1-12.9 67.8-32.3z"
                  />
                </svg>

                <span className="text-left">
                  <span className="block text-[0.65rem] sm:text-xs">
                    Download on the
                  </span>
                  <span className="block font-semibold text-sm sm:text-base">
                    App Store
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className=" rounded border z-10 
             !w-full sm:!w-full md:!w-full lg:!w-auto xl:!w-auto 2xl:!w-auto py-3 flex flex-col justify-center items-center
             [background-image:repeating-linear-gradient(-45deg,#222d38_0px,#222d38_.5px,transparent_.5px,transparent_1px)]"
      >
        <div className="w-full h-[90%] flex flex-col justify-center items-center rounded border-y relative bg-background p-4">
          <div className="border rounded-full w-[10px] h-[10px] absolute top-4 left-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute top-4 right-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute bottom-4 left-4"></div>
          <div className="border rounded-full w-[10px] h-[10px] absolute bottom-4 right-4"></div>
          <div className="flex gap-4 px-6 py-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mx-auto">
              {/* Google Play Button */}
              <a
                href="#"
                className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3 bg-black text-white rounded-xl px-4 sm:px-5 py-2 sm:py-3 border border-white/20 shadow-sm hover:opacity-90 transition w-full sm:w-auto"
                aria-label="Get it on Google Play"
              >
                {/* Google Play multicolor icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                >
                  <path
                    fill="#32BBFF"
                    d="M325.3 234.3 104.5 13.5c-6.7 3.7-11.1 11-11.1 19.6v446.6c0 8.6 4.5 15.9 11.1 19.6l220.8-220.8z"
                  />
                  <path
                    fill="#32BBFF"
                    d="M104.5 13.5c-2.5 1.4-4.8 3.2-6.6 5.4l229.1 229.1L97.9 477.1c1.8 2.2 4.1 4.1 6.6 5.4l220.8-220.8L104.5 13.5z"
                  />
                  <path
                    fill="#FF3333"
                    d="M432.6 218.9 366.2 182l-59.2 59.2 59.2 59.2 66.4-36.9c15.6-8.7 15.6-31.5 0-40.2z"
                  />
                  <path
                    fill="#FFD500"
                    d="M104.5 13.5 325.3 234.3 366.2 182 104.5 13.5z"
                  />
                  <path
                    fill="#48FF48"
                    d="M104.5 498.5 366.2 330l-40.9-52.3L104.5 498.5z"
                  />
                </svg>

                <span className="text-left">
                  <span className="block text-[0.65rem] sm:text-xs">
                    Get it on
                  </span>
                  <span className="block font-semibold text-sm sm:text-base">
                    Google Play
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
