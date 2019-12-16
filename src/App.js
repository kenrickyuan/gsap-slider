import React, { useRef, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { TweenMax, Power3 } from 'gsap';

function App() {
  let logoItem = useRef('hello');

  let textItem = useRef('hello');

  useEffect( () => {
    console.log(logoItem);
    TweenMax.to(
      logoItem,
      2,
      {
        opacity: 1,
        y: -80,
        ease: Power3.easeOut
      }
    )

    TweenMax.to(
      textItem,
      1.5,
      {
        opacity: 1,
        y: -80,
        ease: Power3.easeOut,
        delay: 0.2
      }
    )
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img ref={ element => { logoItem = element } } src={logo} className="App-logo" alt="logo" />
        <p ref={ element => { textItem = element } } className="p-logo">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
