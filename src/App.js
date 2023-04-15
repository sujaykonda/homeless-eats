// import {useJsApiLoader, GoogleMap, Marker} from "@react-google-maps/api"
// import "./App.css"
// import React, { useEffect } from "react";

// const center = {}; 


// function App() {


//   // useEffect(() => {   
//   //   if ("geolocation" in navigator) {
//   //     navigator.geolocation.getCurrentPosition(function(position) {
       
//   //       center.lat = position.coords.latitude
//   //       center.lng =  position.coords.longitude
        
//   //     });
//   //   }

    
//   // }, []);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
//     libraries: ['places'],
//   })

//   if (!isLoaded){
//     return (
//       <div className="App">
//         <header className="App-header">
          
//         </header>
//       </div>
//     );
//   }
  
  
//   return (
//     <div  >
//       <header className="App">
      
//       </header>
//       <div> 
//         <GoogleMap
//           center={{lat: 44, lng: -80}}
//           zoom={15}
//           mapContainerStyle={{ height: "100vh"}}
//           >
//             <Marker position={{lat:44, lng: -80}}/>

//           </GoogleMap>
//       </div>

      
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

    
  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyDs2gO4O1PQyz06a_h0sbd1e2d-ef7Q6AY',
      version: 'weekly',
    });

    loader.load().then(() => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 8,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: 37.7749, lng: -122.4194 },
        map,
      });
      setMap(map);
      markerRef.current = marker;
    });
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default Map;
