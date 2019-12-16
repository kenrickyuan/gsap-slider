import React, { useRef, useEffect, useState } from "react";
import { TweenMax, Power3 } from "gsap";
import "./App.css";

function App() {
  let circle = useRef(null);
  let circleRed = useRef(null);
  let circleBlue = useRef(null);
  let app = useRef(null);

  const [circleState, setState] = useState(false);

  const handleExpand = () => {
    TweenMax.to(circleRed, 0.5, {width: 200, height: 200, ease: Power3.easeOut})
    setState(true);
  }

  const handleShrink = () => {
    TweenMax.to(circleRed, 0.5, {width: 75, height: 75, ease: Power3.easeOut})
    setState(false);
  }

  useEffect(() => {
    TweenMax.to(app, 0, {css: {visibility: 'visible' }})
    TweenMax.staggerFrom([circle, circleRed, circleBlue], 0.8, {opacity: 0, x: 80, ease: Power3.easeOut}, .4 )
    // TweenMax.from(circle, 2, { opacity: 0, x: 100, ease: Power3.easeOut });
    // TweenMax.from(circleRed, 2, { opacity: 0, x: 80, ease: Power3.easeOut, delay: .4 });
    // TweenMax.from(circleBlue, 2, { opacity: 0, x: 80, ease: Power3.easeOut, delay: .7 });
  }, []);

  return (
    <div className="App" ref={el => (app = el)}>
      <header className="App-header">
        <div className="circle-container">
          <div ref={el => (circle = el)} className="circle"></div>
          <div
            onClick={circleState !== true ? handleExpand : handleShrink}
            ref={el => (circleRed = el)} className="circle red">
          </div>
          <div ref={el => (circleBlue = el)} className="circle blue"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
