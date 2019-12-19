import React, { useRef, useState } from "react";
import { TweenLite, Power3 } from "gsap";
import leftArrowImg from "./assets/arrow-forward.svg";
import rightArrowImg from "./assets/arrow-forward.svg";
import "./App.scss";
import "reset-css";

const details = [
  {
    name: "Buggy XS",
    subtitle: "Compact on the go",
    image: `${require("./assets/buggyxs.png")}`,
    color: "#95b1b9"
  },
  {
    name: "Harvey²",
    subtitle: "All Terrain",
    image: `${require("./assets/harvey2.png")}`,
    color: "#958f96"
  }
];

function App() {
  let strollers = useRef(null);
  let container = useRef(null);
  let subtitles = useRef(null);
  let heading = useRef(null);
  let leftArrow = useRef(null);
  let rightArrow = useRef(null);

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false
  });

  // Stroller Image transition
  // Input starting stroller's index, ending stroller's index, starting stroller's left, ending stroller's left, starting rotation, ending rotation, duration
  const slideImgLeft = (
    startIndex,
    endIndex,
    startLeft,
    endLeft,
    startRotation,
    endRotation,
    duration
  ) => {
    TweenLite.set(strollers.children[endIndex], {
      css: { left: `${100 + endLeft}vw`, rotation: startRotation }
    });
    TweenLite.to(strollers.children[endIndex], duration, {
      css: { left: `${endLeft}vw`, rotation: endRotation },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[startIndex], duration, {
      css: { left: `${-100 - startLeft}vw`, rotation: startRotation },
      ease: Power3.easeInOut
    });
  };

  const slideImgRight = (
    startIndex,
    endIndex,
    startLeft,
    endLeft,
    startRotation,
    endRotation,
    duration
  ) => {
    TweenLite.set(strollers.children[endIndex], {
      css: { left: `${-100 - endLeft}vw`, rotation: startRotation }
    });
    TweenLite.to(strollers.children[endIndex], duration, {
      css: { left: `${endLeft}vw`, rotation: endRotation },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[startIndex], duration, {
      css: { left: `${100 + startLeft}vw`, rotation: startRotation },
      ease: Power3.easeInOut
    });
  };

  // Subtitle transition
  const slideSubLeft = (
    startIndex,
    endIndex,
    newLeft,
    newTop,
    currentLeft,
    duration
  ) => {
    TweenLite.set(subtitles.children[endIndex], {
      css: { left: `${100 + newLeft}vw`, top: `${newTop}vh` }
    });
    TweenLite.to(subtitles.children[endIndex], duration, {
      css: { left: `${newLeft}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(subtitles.children[startIndex], duration, {
      css: { left: `${-100 - currentLeft}vw` },
      ease: Power3.easeInOut
    });
  };

  const slideSubRight = (
    startIndex,
    endIndex,
    newLeft,
    newTop,
    currentLeft,
    duration
  ) => {
    TweenLite.set(subtitles.children[endIndex], {
      css: { left: `${-100 - newLeft}vw`, top: `${newTop}vh` }
    });
    TweenLite.to(subtitles.children[endIndex], duration, {
      css: { left: `${newLeft}vw` },
      ease: Power3.easeInOut
    });
    TweenLite.to(subtitles.children[startIndex], duration, {
      css: { left: `${100 + currentLeft}vw` },
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

  // Heading Changing transition (for testing purposes)
  const headingChange = targetHeading => {
    heading.innerHTML = targetHeading;
  };

  // Temporary solution to prevent animation bugs when clicking arrows before GSAP transforms are completely over
  const disableArrow = arrow => {
    arrow.classList.add("disabled");
  };

  const enableArrow = () => {
    console.log(rightArrow);
    // rightArrow.classList.remove("disabled");
  };

  const nextSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      // disableArrow(rightArrow);
      setState({ isActive1: false, isActive2: true });
      slideImgLeft(0, 1, 38, 36, 65, 10, 1.6);
      slideSubLeft(0, 1, 37, 49, 26, 1.6);
      colorChange(details[1].color, 1.6);
      headingChange(details[1].name);
      // setTimeout(enableArrow, 1600);
    } else if (strollers.children[1].classList.contains("active")) {
      // disableArrow(rightArrow);
      setState({ isActive1: true, isActive2: false });
      slideImgLeft(1, 0, 36, 38, 65, 10, 1.6);
      slideSubLeft(1, 0, 26, "", 37, 1.6);
      colorChange(details[0].color, 1.6);
      headingChange(details[0].name);
      // setTimeout(enableArrow, 1600);
    }
  };

  const previousSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgRight(0, 1, 38, 36, 65, 10, 1.6);
      slideSubRight(0, 1, 37, 49, 26, 1.6);
      colorChange(details[1].color, 1.6);
      headingChange(details[1].name);
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgRight(1, 0, 36, 38, 65, 10, 1.6);
      slideSubRight(1, 0, 26, "", 37, 1.6);
      colorChange(details[0].color, 1.6);
      headingChange(details[0].name);
    }
  };

  return (
    <div className="App">
      <div ref={el => (container = el)} className="slider-container">
        <div
          ref={el => (leftArrow = el)}
          onClick={previousSlide}
          className="arrows left"
        >
          <img src={leftArrowImg} alt="left arrow" />
        </div>

        <div className="inner">
          <div className="shape-container">
            <span className="shape"></span>
          </div>
          <div className="stroller-name-container">
            <div className="stroller-name">
              <h1 ref={el => (heading = el)}>{details[0].name}</h1>
              <div ref={el => (subtitles = el)} className="subtitles">
                <p
                  className={
                    state.isActive1
                      ? "stroller-subtitle active"
                      : "stroller-subtitle"
                  }
                >
                  {details[0].subtitle}
                </p>
                <p
                  className={
                    state.isActive2
                      ? "stroller-subtitle stroller-subtitle2 active"
                      : "stroller-subtitle stroller-subtitle2"
                  }
                >
                  {details[1].subtitle}
                </p>
              </div>
            </div>
          </div>
          <div ref={el => (strollers = el)} className="strollers">
            <img
              className={state.isActive1 ? "stroller active" : "stroller"}
              src={details[0].image}
              alt={details[0].name}
            />
            <img
              className={state.isActive2 ? "stroller stroller2 active" : "stroller stroller2"}
              src={details[1].image}
              alt={details[1].name}
            />
          </div>
        </div>

        <div
          ref={el => (rightArrow = el)}
          onClick={nextSlide}
          className="arrows right"
        >
          <img src={rightArrowImg} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}

export default App;
