import React from 'react';
import './Root.css';
import pin from './Images/pin.png'
import { useNavigate } from "react-router-dom";


function Root() {
    let navigate = useNavigate();

  return (
    <div className='outsideDiv'>
      <h1>Food Pins</h1>
      <div className='firstInnerDiv'>

        <button class="button-74" onClick={() => navigate("/HoboMap")}>Homeless User</button>
        <img src={pin} alt=" pin" />
        <button class="button-74" onClick={() => navigate("/Form")}>Restaurant User</button>
      </div>
    </div>
  );
}

export default Root;