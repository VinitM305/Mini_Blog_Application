import React from 'react'
import {FaLaptop, FaTabletAlt, FaMobileAlt} from 'react-icons/fa';
import {useState,useEffect} from 'react';
export default function Header({title}) {
  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  const width = windowSize[0];
  return (
    <div className="Header">
      <h1>{title}</h1>
      {
        width < 768 ? (<FaMobileAlt />) : (width < 992 ? <FaTabletAlt /> : <FaLaptop />)
      }
    </div>
  )
}
