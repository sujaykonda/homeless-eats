import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { collection, getDocs } from 'firebase/firestore';
import FirebaseInfo from './FirebaseHandler';

const HoboMap = () => {
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

          getDocs(collection(FirebaseInfo.db, "restaurantsInfo")).then((query) => {
            query.docs.forEach((doc) => {
              
              const infoWindow = new window.google.maps.InfoWindow({
                content: "<p>Name: " + doc.data()["Name"] + "<br>Address: " + doc.data()["Address"] + "<br>Desc: " + doc.data()["Desc"]
              });

              const marker = new window.google.maps.Marker({
                // Add a click event listener to the marker
                position: { lat: doc.data()["coords"][0] , lng: doc.data()["coords"][1]},
                map,
              });

              marker.addListener('click', () => {
                // Open the info window on the map at the marker's position
                infoWindow.open(map, marker);
              });

            
            })
        })
          setMap(map);
        });
      });
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100vw', height: '100vh', overflow:'hidden' }}
      
    />
  );
};

export default HoboMap;
