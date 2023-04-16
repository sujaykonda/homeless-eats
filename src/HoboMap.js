import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { collection, getDocs } from 'firebase/firestore';
import FirebaseInfo from './FirebaseHandler';
var directionsService = null ;
var directionsRenderer = null;
const HoboMap = () => {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  function getDirections(starts, ends){
    var request = {
      origin: starts,
      destination:ends,
      
      travelMode: window.google.maps.TravelMode["WALKING"]
      };
      directionsService.route(request).then((response) => {directionsRenderer.setDirections(response)}).catch((err) => {console.log(err)});// no need to pass map or results div since
  }  
  function getWalkingTime(origin, destination, callback) {
    var service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: window.google.maps.TravelMode.WALKING,
    }, function(response, status) {
      if (status == 'OK') {
        var element = response.rows[0].elements[0];
        if (element.status == "OK") {
          callback(element.duration.text);
        } else {
          callback("Unable to find walking time.");
        }
      } else {
        callback("Unable to find walking time.");
      }
    });
  }

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
          directionsService = new window.google.maps.DirectionsService()
          directionsRenderer = new window.google.maps.DirectionsRenderer()
          
          const map = new window.google.maps.Map(mapRef.current, {
            center: {lat: 40.740523, lng:-74.044079  },
            zoom: 15,
          });
          directionsRenderer.setMap(map)
          
          const marker = new window.google.maps.Marker({
            // Add a click event listener to the marker
            position: {lat: 40.740523, lng:-74.044079  },
            icon: "https://media.discordapp.net/attachments/1046898070484426793/1097169702322716682/youarehere_1_1.png",
            map,
          });

          
//          calcDisplayRoute()
          getDocs(collection(FirebaseInfo.db, "restaurantsInfo")).then((query) => {
            query.docs.forEach((doc) => {
              var infoWindow
              getWalkingTime( {lat: 40.740523, lng:-74.044079  }, doc.data()["Address"], function(walkingTime) {
                infoWindow = new window.google.maps.InfoWindow({
                  content: "<p>Name: " + doc.data()["Name"] + "<br>Address: " + doc.data()["Address"] + "<br>Desc: " + doc.data()["Desc"] +"<br> time: "+ walkingTime
                  
                });
              });
              

              const marker = new window.google.maps.Marker({
                // Add a click event listener to the marker
                position: { lat: doc.data()["coords"][0] , lng: doc.data()["coords"][1]},
                map,
              });

              marker.addListener('click', () => {
                // Open the info window on the map at the marker's position
                
                getDirections({lat: 40.740523, lng:-74.044079}, doc.data()["Address"]);
                
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
