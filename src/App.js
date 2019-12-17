import React, { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";
import "./App.scss";

function App() {
  let app = useRef(null);

  return (
    <div className="App" ref={el => (app = el)}>
    </div>
  );
}

export default App;
