import React, { useRef, useEffect, useState } from "react";
import { TweenLite, Power3 } from "gsap";
import leftArrow from "./assets/arrow-forward.svg";
import rightArrow from "./assets/arrow-forward.svg";
import "./App.scss";
import "reset-css";

const details = [
  {
    name: "Buggy XS",
    subtitle: "Compact on the go",
    image: `${require("./assets/buggyxs.png")}`
  },
  {
    name: "Harvey²",
    subtitle: "All Terrain",
    image: `${require("./assets/harvey2.png")}`
  }
];

function App() {
  let strollers = useRef(null);
  let container = useRef(null);
  let subtitles = useRef(null);
  let heading = useRef(null);

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false
  });

  useEffect(() => {
    console.log(heading.innerHTML);
  }, []);

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
      css: { left: `${-100 - startLeft}vw`, rotation: startRotation + 22 },
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
      css: { left: `${-100 - endLeft}vw`, rotation: startRotation + 22 }
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
  const blueToGrey = duration => {
    TweenLite.to(container, duration, {
      css: { "background-color": "#958f96" },
      ease: Power3.easeInOut
    });
  };

  const greyToBlue = duration => {
    TweenLite.to(container, duration, {
      css: { "background-color": "#95b1b9" },
      ease: Power3.easeInOut
    });
  };

  // Heading Changing transition (for testing purposes)
  const buggyToHarvey = () => {
    heading.innerHTML = "Harvey²";
  };

  const harveyToBuggy = () => {
    heading.innerHTML = "Buggy XS";
  };

  const nextSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgLeft(0, 1, 38, 36, 22, 10, 1.6);
      slideSubLeft(0, 1, 37, 49, 26, 1.6);
      blueToGrey(1.6);
      buggyToHarvey();
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgLeft(1, 0, 36, 38, 22, 10, 1.6);
      slideSubLeft(1, 0, 26, "", 37, 1.6);
      greyToBlue(1.6);
      harveyToBuggy();
    }
  };

  const previousSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgRight(0, 1, 38, 36, 22, 10, 1.6);
      slideSubRight(0, 1, 37, 49, 26, 1.6);
      blueToGrey(1.6);
      buggyToHarvey();
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgRight(1, 0, 36, 38, 22, 10, 1.6);
      slideSubRight(1, 0, 26, '', 37, 1.6);
      greyToBlue(1.6);
      harveyToBuggy();
    }
  };

  return (
    <div className="App">
      <div ref={el => (container = el)} className="slider-container">
        <div onClick={previousSlide} className="arrows left">
          <img src={leftArrow} alt="left arrow" />
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
                      ? "stroller-subtitle1 active"
                      : "stroller-subtitle1"
                  }
                >
                  {details[0].subtitle}
                </p>
                <p
                  className={
                    state.isActive2
                      ? "stroller-subtitle1 active"
                      : "stroller-subtitle2"
                  }
                >
                  {details[1].subtitle}
                </p>
              </div>
            </div>
          </div>
          <div ref={el => (strollers = el)} className="strollers">
            <img
              className={state.isActive1 ? "stroller1 active" : "stroller1"}
              src={details[0].image}
              alt={details[0].name}
            />
            <img
              className={state.isActive2 ? "stroller2 active" : "stroller2"}
              src={details[1].image}
              alt={details[1].name}
            />
          </div>
        </div>

        <div onClick={nextSlide} className="arrows right">
          <img src={rightArrow} alt="right arrow" />
        </div>
      </div>
    </div>
  );
}

export default App;
