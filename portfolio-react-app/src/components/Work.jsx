import React from "react";
import { data } from "../data/data.js";

const Work = () => {
  return (
    <div name="work" className="w-full md:h-screen text-gray-300 bg-[#0a192f]">
      <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 text-gray-300 border-pink-600">
            Experience
          </p>
          <p className="py-6">// Check out some of my recent experiences</p>
        </div>

        {/* container for projects */}
        <div className="max-w-[1000px] w-full grid sm:grid-cols-1 gap-8 px-4">
          <div className="text-4xl font-bold">
            <p>QuickBase - Malden, MA</p>
          </div>
          <div>
            <li>
              Participated in and led the frontend development of the QuickBase
              platform, using technologies such as React.js, Redux, Node.js, and
              CSS/SCSS.
            </li>
            <li>
              Integrated backend services utilizing Axios and REST API for
              efficient and seamless data communication, ensuring consistent and
              error-free interactions with the backend.
            </li>
            <li>
              Implemented responsive and accessible web design principles to
              ensure the website's compatibility across various devices and
              browsers, enhancing user experience and engagement.
            </li>
            <li>
              Collaborated closely with product management and design teams
              using tools like Figma for design collaboration and Jira for task
              tracking.
            </li>
            <li>
              shifted the state management strategy to Redux Toolkit (RTK) for a
              more efficient state management approach, ensuring the stability
              and maintainability of the code.
            </li>
            <li>
              Responsible for writing and maintaining frontend tests using Jest
              and React Testing Library, ensuring the stability and
              maintainability of the code.
            </li>
          </div>

          <div className="text-4xl font-bold">
            <p>DJI - Shenzhen, China</p>
          </div>
          <div>
            <li>
              Engaged in agile React-based development for DJI's handheld
              products' recommendation page, sharpening my technical skills and
              problem-solving aptitude.
            </li>
            <li>
              Optimized DJI's web applications' performance using techniques
              like lazy loading, resource minification, and React memoization,
              enhancing user experience and interaction.
            </li>
            <li>
              Enhanced web accessibility by integrating ARIA attributes and
              managing focus control, ensuring WCAG compliance and improved user
              experience for individuals with disabilities.
            </li>
            <li>
              Integrated dynamic, reusable UI components using React libraries
              and CSS-in-JS tools, improving code modularity and facilitating UI
              consistency across various web applications.
            </li>
            <li>
              Participated in rigorous code reviews, fostering a culture of
              continuous improvement in coding practices and codebase health.
            </li>
          </div>

          <div className="text-4xl font-bold">
            <p>Shinetech Software - Zhengzhou, China</p>
          </div>
          <div>
            <li>
              Established a design system akin to the Material-UI framework,
              standardizing UI components across projects.
            </li>
            <li>
              Performed debugging and optimization, ensuring software
              compatibility across various browsers and devices.
            </li>
            <li>
              Developed custom UI components including pagination systems,
              accordion lists, and dynamic form builders, improving user
              engagement and experience.
            </li>
            <li>
              Performed debugging and optimization, ensuring software
              compatibility across various browsers and devices.
            </li>
            <li>
              Participated in code reviews, contributing to improved code
              quality and development standards.
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
