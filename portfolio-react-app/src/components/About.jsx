import React from "react";

const About = () => {
  return (
    <div name="about" className="w-full h-screen bg-[#0a192f] text-gray-300">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="max-w-[1000px] w-full grid grid-cols-2 gap-8">
          <div className="sm:text-right pb-8 pl-4">
            <p className="text-4xl font-bold inline border-b-4 border-pink-600">
              About
            </p>
            <div></div>
          </div>
        </div>
        <div className="max-w-[1000px] w-full grid sm:grid-cols-2 gap-8 px-4">
          <div className="sm:text-right text-4xl font-bold">
            <p>Hi I'm Dayuan. Nice to meet you. Please take a look around.</p>
          </div>
          <div>
            <p>
              Hi, I'm Dayuan Wei, a web developer with over five years of
              experience in crafting user-centric applications. I have a robust
              understanding of advanced React concepts, including the proficient
              application of React Router, React Hooks context API, redux. and
              for CSS tools, I have delved deeply into modern CSS tools and
              frameworks such as Tailwind CSS, Material-UI, and Styled
              Components. . I've honed my skills through roles at companies like
              QuickBase and DJI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
