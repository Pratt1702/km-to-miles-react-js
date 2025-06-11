import { useState } from "react";
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

  return (
    <div
      className="km-to-miles-app"
      style={{ backgroundColor: getBackgroundColor(km || miles || 0) }}
    >
      <img className="earthimage" src={Earth}/>
      <div className="rocket-holder">
      <img className="rocket-stationary" src={RocketStationary}/>
      </div>
        <input
          type="range"
          min="0"
          max="10000"
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
      <h2 className="layer-indicator">{getLayerName(km)}</h2>

    </div>
  );
};

export default Converter;
