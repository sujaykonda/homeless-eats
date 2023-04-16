import React, { useState } from 'react';
import './RestaurantForm.css';  
import Geocode from "react-geocode";
import FirebaseInfo from './FirebaseHandler';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

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
    navigate("/HomelessMap")
    
  }
  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    '& .MuiSwitch-track': {
      borderRadius: 22 / 2,
      '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        width: 16,
        height: 16,
      },
      '&:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      '&:after': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main),
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: 'none',
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  return (
    <div className='outsideContainer'>
      <div className='insideContainer'>
        <form onSubmit={handleSubmit}>
          <div className='text'>
            <strong>Location Info</strong>
            <br />
            <br />
            <div className='textPlusBox'>
              <p>Donater Name:</p>
              <input type="text"  name="name" value={name} onChange={handleNameChange} className='txtBox' />
            </div>
           
            <br />
            {/* <div className='space'></div> */}
            Address:
            <input type="text" name="address" value={address} onChange={handleAddressChange} className='txtBox' />
            <br />
            <div className='space'></div>
            <FormGroup className='formGroup'>
              
              <FormControlLabel
                control={<Android12Switch size='500px'defaultChecked />}
                label={<Typography variant="body2" color="black" fontSize={"4vh"} >Are you a Restaurant?</Typography>}
                labelPlacement="start"
              />
            </FormGroup>
            Description:
            <br />
            
           
           
            <textarea type="text" name="description" value={description} onChange={handleDescriptionChange} className='descBox'> </textarea>

            <br />
            <button type="submit">Create Pin</button>
            {isTextVisible && <p className='creation'>Pin Created!</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
export default RestaurantForm; 