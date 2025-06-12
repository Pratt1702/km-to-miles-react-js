import { useState, useEffect } from "react";
import "./Converter.css"; 
import Earth from "../assets/Earth.svg"
import RocketStationary from "../assets/RocketStationary.svg";
import RocketMoving from "../assets/RocketMoving.svg";
  
const Converter = () => {
  const [km, setKm] = useState(0);
  const [miles, setMiles] = useState(0);

  const colors = [
    "#4f87b4", // Troposphere 0-18 km
    "#3C6794", // Stratosphere 18-50 km
    "#2D4C7B", // Mesosphere 50-80 km
    "#1D3062", // Thermosphere 80-700 km
    "#0F194A", // Exosphere 700-10000 km
    "#000032", // Space +10000 km
  ];

  const funFacts = [
    "At 0 km, you are on the surface of the Earth, where the atmosphere is thickest.",
    "At 400 km, the International Space Station (ISS) orbits Earth.",
    "At 1000 km, you are above most of the atmosphere, where satellites begin to orbit.",
    "At 2000 km, geostationary satellites orbit, allowing them to stay fixed over one point on Earth.",
    "At 4000 km, you are approaching the distance to the Moon, which is about 384,400 km away.",
    "At 10000 km, you are well into the thermosphere, where temperatures can reach up to 2000°C (3632°F).",
  ];

  const handleKmChange = (event) => {
    const value = event.target.value.replace(/^0+/, '');
    setKm(value ? parseFloat(value) : 0);
    setMiles(value ? parseFloat(value) * 0.621371 : 0); 
  };

  const handleMilesChange = (event) => {
    const value = event.target.value.replace(/^0+/, '');
    setMiles(value ? parseFloat(value) : 0);
    setKm(value ? parseFloat(value) / 0.621371 : 0); 
  };

  const handleSliderChange = (event) => {
    const value = parseFloat(event.target.value);
    setKm(value);
    setMiles(value ? value * 0.621371 : 0);
  };

  const rocketPosition = (km / 10000) * 100; 

  const getBackgroundColor = (inputValue) => {
    if (inputValue === 0) return colors[0]; 
    if (inputValue < 18) return colors[0];
    if (inputValue < 50) return colors[1];
    if (inputValue < 80) return colors[2];
    if (inputValue < 700) return colors[3];
    if (inputValue < 10000) return colors[4];
    return colors[5];
  };

  const getLayerName = (inputValue) => {
    if (inputValue < 18) return "Troposphere";
    if (inputValue < 50) return "Stratosphere";
    if (inputValue < 80) return "Mesosphere";
    if (inputValue < 700) return "Thermosphere";
    if (inputValue < 10000) return "Exosphere";
    return "Space";
  };

  // Determine the fun fact based on km
  const getFunFact = (km) => {
    if (km < 400) return funFacts[0];
    if (km < 1000) return funFacts[1];
    if (km < 2000) return funFacts[2];
    if (km < 4000) return funFacts[3];
    if (km < 10000) return funFacts[4];
    return funFacts[5];
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setKm((prevKm) => Math.min(prevKm + 50, 15000)); 
    } else if (event.key === "ArrowDown") {
      setKm((prevKm) => Math.max(prevKm - 25, 0)); 
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      className="km-to-miles-app"
      style={{ backgroundColor: getBackgroundColor(km || miles || 0) }}
    >
      <img 
        className="earthimage" 
        src={Earth} 
        style={{ transform: `rotate(${km / 20}deg)`, scale: `${(km < 1000) ? 1 : 1000 / km}`, transition: '3s ease-in-out' }}
      />
      <div className="rocket-holder" style={{ position: 'fixed', top: `-${rocketPosition}%`,scale:'0.95', left: '100px', transform: 'translateY(300%)', transition: 'top 3s ease-in-out' }}>
        <img className="rocket-stationary" src={RocketMoving}/>
      </div>
      <input
        type="range"
        min="0"
        max="15000"
        value={km}
        onChange={handleSliderChange}
        className="slider"
      />

      <div className="mainframe">
        <div className="km-frame">
          <div className="km-txt">Kilometer:</div>
          <input
            type="number"
            value={km === 0 ? '' : km}
            onChange={handleKmChange}
            className="km-input"
            min="0"
            step="any"
          />
        </div>
        <div className="miles-frame">
          <div className="miles-txt">Miles:</div>
          <input
            type="number"
            value={miles === 0 ? '' : miles}
            onChange={handleMilesChange}
            className="miles-input"
            min="0"
            step="any"
          />
        </div>
      </div>
      <div className="layer-indicator">
        <h2>{getLayerName(km)}</h2>
        <p>{getFunFact(km)}</p>
      </div>
    </div>
  );
};

export default Converter;
