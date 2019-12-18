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

  const [state, setState] = useState({
    isActive1: true,
    isActive2: false
  });

  useEffect(() => {
    console.log(strollers.children);
  }, []);

  // Stroller Image transition

  // Input index of left stroller, index of right stroller, animation duration
  const slideImgLeft = (leftIndex, rightIndex, duration) => {
    TweenLite.set(strollers.children[rightIndex], {
      css: { left: "100vw", rotation: 26 }
    });
    TweenLite.to(strollers.children[rightIndex], duration, {
      css: { left: "35vw", rotation: 0 },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[leftIndex], duration, {
      css: { left: "-100vw", rotation: 26 },
      ease: Power3.easeInOut
    });
  };

  const slideImgRight = (leftIndex, rightIndex, duration) => {
    TweenLite.set(strollers.children[leftIndex], {
      css: { left: "-100vw", rotation: 26 }
    });
    TweenLite.to(strollers.children[rightIndex], duration, {
      css: { left: "100vw", rotation: 26 },
      ease: Power3.easeInOut
    });
    TweenLite.to(strollers.children[leftIndex], duration, {
      css: { left: "35vw", rotation: 0 },
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



  const nextSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgLeft(0, 1, 1.6);
      blueToGrey(1.6);
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgLeft(1, 0, 1.6);
      greyToBlue(1.6);
    }
  };

  const previousSlide = () => {
    if (strollers.children[0].classList.contains("active")) {
      setState({ isActive1: false, isActive2: true });
      slideImgRight(1, 0, 1.6);
    } else if (strollers.children[1].classList.contains("active")) {
      setState({ isActive1: true, isActive2: false });
      slideImgRight(0, 1, 1.6);
    }
  };

  return (
    <div className="App">
      <div ref={el => (container = el)} className="slider-container">
        <div onClick={previousSlide} className="arrows left">
          <img src={leftArrow} alt="left arrow" />
        </div>

        <div className="inner">
          <div className="stroller-name-container">
            <div className="stroller-name">
              <h1>{details[0].name}</h1>
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
