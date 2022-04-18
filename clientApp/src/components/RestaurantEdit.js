import React from 'react';
import './Shop.css';
import Header from './Header';
import { Route, Link, } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import './RestaurantProfile.css'
import './Profiili.css'
import jwt_decode from "jwt-decode";

export default function RestaurantEdit() {
    const userLoggedIn = 'peksi';
  const CreateRestaurantTypeOptions = () => {
    const options = [
      'Fastfood',
      'Fine dining',
      'Buffet',
      'Fast casual',
      'Casual dining'
    ];
    return(
      options.map((item) => {
        return <option value={item}> {item} </option>;
      })
    )
  }
    const onRestaurantAddition = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("restaurantName", event.target.restaurantName.value);
        formData.append("restaurantAddress", event.target.restaurantAddress.value);
        formData.append("restaurantUserName", userLoggedIn);
        formData.append("restaurantEmail", event.target.restaurantEmail.value);
        formData.append("restaurantPhoneNumber", event.target.restaurantPhoneNumber.value);
        formData.append("restaurantStyle", event.target.restaurantStyle.value);
        formData.append("restaurantPriceRange", event.target.restaurantPriceRange.value);
        formData.append("restaurantCity", event.target.restaurantCity.value);
        formData.append("openinghours", event.target.openinghours.value);
        formData.append("file", file);
        axios.post('http://localhost:8080/addrestaurantandpicture', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(function (response) {
          console.log(response);
        })
      }
      const [file, setFile] = useState(null);
  function handleFileChange(event) {
    setFile(event.target.files[0])
  }
  return (
    <div className='form'>
    <div className='formbuttons'>
      <Link to="/restaurantprofile"><button>Edit profile</button></Link>
      <Link to="/restaurantedit"><button>Create Restaurant</button></Link>
      <Link to="/menuedit"><button>Create Menu</button></Link>
      <button>Order history</button>
      <Link to="/"><button><b>Go back</b></button></Link>
      </div>
    <div className='forminner'>
    <h2>Create restaurant</h2>
  <form onSubmit={ onRestaurantAddition }>
    <div className=""><div className=''>Restaurant name: </div> <input type="text" name="restaurantName"/></div>
    <div className=""><div className=''>Restaurant address: </div> <input type="text" name="restaurantAddress"/></div>
    <div className=""><div className=''>City: </div> <input type="text" name="restaurantCity"/></div>
    <div className=""><div className=''>Email: </div> <input type="text" name="restaurantEmail"/></div>
    <div className=""><div className=''>Phonenumber: </div> <input type="text" name="restaurantPhoneNumber"/></div>
    <div className=""><div className=''>Price range: </div> <input type="text" name="restaurantPriceRange"/></div>
    <div className=""><div className=''>Opening hours: </div> <input type="text" name="openinghours"/></div>
    <div className="">
      <div className=''>Restaurant style: </div>
      <select className="" name="restaurantStyle" >
        <CreateRestaurantTypeOptions /> 
      </select>
    </div>
    <div className="">
      <div className=''>Restaurant picture: </div>
      <input type="file"
        name="restaurantPicture"
        accept=".jpg, .jpeg, .png"
        onChange={ handleFileChange }>
      </input>
      <div className=''>Picture must be in jpg or png format </div>
    </div>
    <button className=''>Add restaurant</button>
    </form></div>
    </div>
  

)
}