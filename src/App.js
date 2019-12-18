import React, { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";
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
  return (
    <div className="App">
      <div className="slider-container">

        <div className="arrows left">
          <img src={leftArrow} alt="left arrow" />
        </div>

        <div className="inner">
          <div className="strollers">
            <img className="stroller1" src={details[0].image} alt={details[0].name}/>
            <img className="stroller2" src={details[1].image} alt={details[1].name}/>
          </div>
        </div>

        <div className="arrows right">
          <img src={rightArrow} alt="right arrow" />
        </div>

      </div>
    </div>
  );
}

export default App;
