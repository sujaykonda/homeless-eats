import {useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api"
import "./App.css"
import React, { useEffect } from "react";

const center = { lat: 48.8584, lng: 2.2945 }


function App() {


  useEffect(() => {   j
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
       
        center.lat = position.coords.latitude
        center.lng =  position.coords.longitude
        
      });
    }

    
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  if (!isLoaded){
    return (
      <div className="App">
        <header className="App-header">
         balls
        </header>
      </div>
    );

  }

  return (
    <div  >
      <header className="App">
      
      </header>
      <div> 
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ height: "100vh"}}
          
        />
      </div>

      
    </div>
  );
}

export default App;