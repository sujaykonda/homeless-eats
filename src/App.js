import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  const center = {
    lat: 0,
    lng: 0
  }; // center constant
    
  useEffect(() => {
    const loader = new Loader({ // api stuff
      apiKey: 'AIzaSyDs2gO4O1PQyz06a_h0sbd1e2d-ef7Q6AY',
      version: 'weekly',
    });

    // loads current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        center.lat = position.coords.latitude
        center.lng =  position.coords.longitude
        // waits for the api 
        loader.load().then(() => {
          // creates a map
          const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: 15,
          });
          for(var i = 0; i < 10; i++) {
            const marker = new window.google.maps.Marker({
              position: { lat:center.lat, lng:(center.lng + i)},
              map,
            });
        }
          setMap(map);
        });
      });
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

export default Map;
