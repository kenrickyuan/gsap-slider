import React, { useRef, useState } from "react";
import { TweenLite, Power3 } from "gsap";

import arrowImg from "../../assets/arrow.svg";
import { sliderData } from "./SliderData";

const details = sliderData;

export const Slider = () => {
  let strollers = useRef(null);
  let container = useRef(null);
  let subtitles = useRef(null);
  let headings = useRef(null);
  let shape = useRef(null);

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false
  });

  // Stroller Image transition
  // Input starting stroller's index, ending stroller's index, starting rotation, ending rotation, duration
  const slideImgLeft = (startIndex, endIndex, startRotation, endRotation, duration) => {
    TweenLite.set(strollers.children[endIndex], {
      css: { left: `${100 + details[endIndex].imgLeft}vw`, rotation: startRotation }
    });
    TweenLite.to(strollers.children[endIndex], duration, {
      css: { left: `${details[endIndex].imgLeft}vw`, rotation: endRotation },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[startIndex], duration, {
      css: { left: `${-100 - details[startIndex].imgLeft}vw`, rotation: startRotation },
      ease: Power3.easeInOut
    });
  };

  const slideImgRight = (startIndex, endIndex, startRotation, endRotation, duration) => {
    TweenLite.set(strollers.children[endIndex], {
      css: { left: `${-100 - details[endIndex].imgLeft}vw`, rotation: startRotation }
    });
    TweenLite.to(strollers.children[endIndex], duration, {
      css: { left: `${details[endIndex].imgLeft}vw`, rotation: endRotation },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[startIndex], duration, {
      css: { left: `${100 + details[startIndex].imgLeft}vw`, rotation: startRotation },
      ease: Power3.easeInOut
    });
  };

  // Heading transition
  const slideHeadLeft = (startIndex, endIndex, duration) => {
    TweenLite.set(headings.children[endIndex], {
      css: { left: `${100 + details[endIndex].nameLeft}vw`, top: `${20 + details[endIndex].nameTop}vw` }
    });
    TweenLite.to(headings.children[endIndex], duration, {
      css: { left: `${details[endIndex].nameLeft}vw`, top: `${details[endIndex].nameTop}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(headings.children[startIndex], duration, {
      css: { left: `${-100 - details[startIndex].nameLeft}vw`, top: `${-20 + details[startIndex].nameTop}vw` },
      ease: Power3.easeInOut
    });
  };

  const slideHeadRight = (startIndex, endIndex, duration) => {
    TweenLite.set(headings.children[endIndex], {
      css: { left: `${-100 - details[endIndex].nameLeft}vw`, top: `${-20 + details[endIndex].nameTop}vw` }
    });
    TweenLite.to(headings.children[endIndex], duration, {
      css: { left: `${details[endIndex].nameLeft}vw`, top: `${details[endIndex].nameTop}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(headings.children[startIndex], duration, {
      css: { left: `${100 + details[startIndex].nameLeft}vw`, top: `${20 + details[startIndex].nameTop}vw` },
      ease: Power3.easeInOut
    });
  };

  // Subtitle transition
  const slideSubLeft = (startIndex, endIndex, duration) => {
    TweenLite.set(subtitles.children[endIndex], {
      css: { left: `${100 + details[endIndex].subLeft}vw` }
    });
    TweenLite.to(subtitles.children[endIndex], duration, {
      css: { left: `${details[endIndex].subLeft}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(subtitles.children[startIndex], duration, {
      css: { left: `${-100 - details[startIndex].subLeft}vw` },
      ease: Power3.easeInOut
    });
  };

  const slideSubRight = (startIndex, endIndex, duration) => {
    TweenLite.set(subtitles.children[endIndex], {
      css: { left: `${-100 - details[endIndex].subLeft}vw` }
    });
    TweenLite.to(subtitles.children[endIndex], duration, {
      css: { left: `${details[endIndex].subLeft}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(subtitles.children[startIndex], duration, {
      css: { left: `${100 + details[startIndex].subLeft}vw` },
      ease: Power3.easeInOut
    });
  };

  // Background Color transition
  const colorChange = (targetColor, duration) => {
    TweenLite.to(container, duration, {
      css: { "background-color": targetColor },
      ease: Power3.easeInOut
    });
  };

  // Shape transition
  const shapeChange = (targetIndex, targetRotation, duration) => {
    TweenLite.to(shape, duration, {
      css: {
        "background-color": details[targetIndex].shapeColor,
        width: details[targetIndex].shapeWidth,
        height: details[targetIndex].shapeHeight,
        "border-radius": details[targetIndex].shapeBorderRadius,
        rotation: `+= ${targetRotation}`
      },
      ease: Power3.easeInOut
    });
  };

  const nextSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgLeft(0, 1, 65, 10, 1.6);
      slideHeadLeft(0, 1, 1.6);
      slideSubLeft(0, 1, 1.6);
      colorChange(details[1].bgColor, 1.6);
      shapeChange(1, -90, 1.6);
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgLeft(1, 0, 65, 10, 1.6);
      slideHeadLeft(1, 0, 1.6);
      slideSubLeft(1, 0, 1.6);
      colorChange(details[0].bgColor, 1.6);
      shapeChange(0, -90, 1.6);
    }
  };

  const previousSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgRight(0, 1, 65, 10, 1.6);
      slideHeadRight(0, 1, 1.6);
      slideSubRight(0, 1, 1.6);
      colorChange(details[1].bgColor, 1.6);
      shapeChange(1, 90, 1.6);
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgRight(1, 0, 65, 10, 1.6);
      slideHeadRight(1, 0, 1.6);
      slideSubRight(1, 0, 1.6);
      colorChange(details[0].bgColor, 1.6);
      shapeChange(0, 90, 1.6);
    }
  };

  return (
    <div className="App">
      <div ref={el => (container = el)} className="slider-container">
        <div onClick={previousSlide} className="arrows left">
          <img src={arrowImg} alt="left arrow" />
        </div>

        <div className="shape-container">
          <span ref={el => (shape = el)} className="shape"></span>
        </div>
        <div className="stroller-details-container">
          <div ref={el => (headings = el)} className="headings">
            <h1 className={state.isActive1 ? "heading active" : "heading"}>{details[0].name}</h1>
            <h1 className={state.isActive2 ? "heading heading2 active" : "heading heading2"}>{details[1].name}</h1>
          </div>

          <div ref={el => (subtitles = el)} className="subtitles">
            <p className={state.isActive1 ? "stroller-subtitle active" : "stroller-subtitle"}>{details[0].subtitle}</p>
            <p
              className={
                state.isActive2 ? "stroller-subtitle stroller-subtitle2 active" : "stroller-subtitle stroller-subtitle2"
              }
            >
              {details[1].subtitle}
            </p>
          </div>
          <div ref={el => (strollers = el)} className="strollers">
            <img
              className={state.isActive1 ? "stroller active" : "stroller"}
              src={details[0].img}
              alt={details[0].name}
            />
            <img
              className={state.isActive2 ? "stroller stroller2 active" : "stroller stroller2"}
              src={details[1].img}
              alt={details[1].name}
            />
          </div>
        </div>

        <div onClick={nextSlide} className="arrows right">
          <img src={arrowImg} alt="right arrow" />
        </div>
      </div>
    </div>
  );
};
