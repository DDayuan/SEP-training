import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((activeIndex + 1) % children.length);
    }, 3000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeIndex, children]);

  const goToNextSlide = () => {
    clearTimeout(timeoutRef.current);
    setActiveIndex((activeIndex + 1) % children.length);
  };

  const goToPrevSlide = () => {
    clearTimeout(timeoutRef.current);
    setActiveIndex((activeIndex - 1 + children.length) % children.length);
  };

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--prev"
        onClick={goToPrevSlide}
      >
        Prev
      </button>
      <div className="carousel__slides" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {children.map((child, index) => (
          <div
            className={`carousel__slide`}
            key={index}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        className="carousel__button carousel__button--next"
        onClick={goToNextSlide}
      >
        Next
      </button>
    </div>
  );

};

export default Carousel;
