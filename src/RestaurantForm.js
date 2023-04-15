import React, { useState } from 'react';
import './RestaurantForm.css';  
import Geocode from "react-geocode";
import FirebaseInfo from './FirebaseHandler';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";

function RestaurantForm() {

let navigate = useNavigate();

  Geocode.setApiKey("AIzaSyDs2gO4O1PQyz06a_h0sbd1e2d-ef7Q6AY");


  

  const [isTextVisible, setIsTextVisible] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

 

  const handleNameChange = (event) => {
    setName(event.target.value);
    
  }
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  }
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  }

//   async function getRestaurantName(address) {
//     // Create a Geocoder object
//     const geocoder = new window.google.maps.Geocoder();
  
//     // Geocode the address to retrieve the location
//     const locationResult = await geocoder.geocode({ address: address });
//     const location = locationResult[0].geometry.location;
  
//     // Create a PlacesService object to search for nearby restaurants
//     const service = new window.google.maps.places.PlacesService(document.createElement('div'));
  
//     // Define the search request
//     const request = {
//       location: location,
//       radius: 10, // in meters
//       type: "restaurant",
//     };
//     console.log(service)

//     // Send the search request and handle the response
//     const searchResult = await service.nearbySearch(request);
//     if (searchResult.length > 0) {
//       // If there is at least one nearby restaurant, retrieve its details
//       const placeId = searchResult[0].place_id;
//       const detailsRequest = {
//         placeId: placeId,
//       };
//       const detailsResult = await service.getDetails(detailsRequest);
//       if (detailsResult) {
//         // If the details were successfully retrieved, return the name of the restaurant
//         const name = detailsResult.name;
//         return name;
//       } else {
//         console.log("Error: Unable to determine the name of the restaurant.");
//         return null;
//       }
//     } else {
//       console.log("Error: No nearby restaurants found.");
//       return null;
//     }
//   }


  const handleSubmit = async (event) => {
    event.preventDefault();
    // Do something with the address, such as send it to an API
    console.log(`The address entered is ${address}`);
    console.log(`The description of food entered is ${description}`);
    console.log(`The name of the restaurant is ${address}`);
    Geocode.fromAddress(address).then(
        (response) => {
          const {lat,lng} = response.results[0].geometry.location;
          addDoc(collection(FirebaseInfo.db, "restaurantsInfo"), { Address: address, Desc: description, Name: name, coords: [lat, lng] })    

          console.log(lat, lng);
        },
        (error) => {
          console.error(error);
        }
      );
    
    
    // Reset the input field
    setAddress('');
    setName('');
    setDescription('');
    setIsTextVisible(!isTextVisible);
    navigate("/HoboMap")
    
  }

  return (
    <div className='outsideContainer'>
      <div className='insideContainer'>
        <form onSubmit = {handleSubmit}>
          <div className='text'>
            <strong>Location Info</strong>
            <br/>
            <br/>
            Restaurant Name: 
            <input type="text" name="name" value={name} onChange ={handleNameChange} className='txtBox'/>
            <br/>
            <div className='space'></div>
            Address: 
            <input type="text" name="address" value={address} onChange ={handleAddressChange}  className='txtBox'/>
            <br/>
            <div className='space'></div>
            Description 
            <br/>
            <textarea type="text" name="description" value={description} onChange ={handleDescriptionChange} className='descBox'> </textarea>
          
            <br/>
            <button type="submit">Create Pin</button>
            {isTextVisible && <p>Pin Created!</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default RestaurantForm; 