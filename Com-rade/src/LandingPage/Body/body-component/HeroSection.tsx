function Hero() {
  return (
    <div className="relative w-full h-[95dvh] sm:h-[95dvh] md:h-[95dvh] lg:h-[85dvh] xl:h-[85dvh] 2xl:h-[85dvh] bg-transparent overflow-hidden flex justify-center items-center border-b">
      <h1
        className="whitespace-nowrap bg-transparent m-0
             !text-[24rem] sm:!text-[24rem] md:!text-[45rem] lg:!text-[30rem] xl:!text-[40rem] 2xl:!text-[50rem] 
             overflow-hidden uppercase highrise tracking-tight text-white 
             font-extrabold drop-shadow-[2px_2px_0_#0af395]
             flex !flex-col sm:!flex-col lg:!flex-row xl:!flex-row 2xl:!flex-row !leading-[.75] lg:!leading-[.82] xl:!leading-[.82] 2xl:!leading-[.82]"
      >
        <span className="!text-[27rem] !-mx-1 sm:!-m-1 md:!m-0 lg:!m-0 xl:!m-0 2xl:!m-0 sm:!text-[28rem] md:!text-[50rem] lg:!text-[30rem] xl:!text-[40rem] 2xl:!text-[50rem] ">
          Com
        </span>
        <span className="!-mx-1 sm:!-m-1 md:!m-0 lg:!m-0 xl:!m-0 2xl:!m-0 ">
          rade
        </span>
      </h1>
    </div>
  );
}

export default Hero;
