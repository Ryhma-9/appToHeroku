import React from 'react';
import './Shop.css';
import Header from './Header';
import { Route, Link, } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import './RestaurantProfile.css'
import './Profiili.css'
import jwt_decode from "jwt-decode";
import Constants from './Constants.json'
export default function RestaurantProfile(props) {

  const [restaurantName, setrestaurantName] = useState();
  const [restaurantAddress, setrestaurantAddress] = useState();
  const [restaurantUserName, setrestaurantUserName] = useState();
  const [restaurantEmail, setrestaurantEmail] = useState();
  const [restaurantPhoneNumber, setrestaurantPhoneNumber] = useState();
  const [restaurantStyle, setrestaurantStyle] = useState();
  const [restaurantPriceRange, setrestaurantPriceRange] = useState();
  const [restaurantCity, setrestaurantCity] = useState();
  const [openinghours, setopeninghours] = useState();
  var jwtToken = sessionStorage.getItem("token");
  
  const restaurantNamechange = (event) => {
    setrestaurantName(event.target.value);
  }
  const restaurantAddresschange = (event) => {
    setrestaurantAddress(event.target.value);
  }
  const restaurantCitychange = (event) => {
    setrestaurantCity(event.target.value);
  }
  const restaurantEmailchange = (event) => {
    setrestaurantEmail(event.target.value);
  }
  const restaurantPhoneNumberchange = (event) => {
    setrestaurantPhoneNumber(event.target.value);
  }
  const restaurantPriceRangechange = (event) => {
    setrestaurantPriceRange(event.target.value);
  }
  const openinghourschange = (event) => {
    setopeninghours(event.target.value);
  }
  const restaurantStylechange = (event) => {
    setrestaurantStyle(event.target.value);
  }

  const results = axios.get(Constants.API_ADDRESS + '/restaurantbyid',
  {

  });
  console.log(results);
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
  useEffect(() => {
    function handleToken(){
      if (jwtToken != null){
      var decoded = jwt_decode(jwtToken);
      console.log(decoded);
      setrestaurantName(decoded.sub);
      
    }}
    handleToken();
    });
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
      <Link to="/orderhistory"><button>Order history</button></Link>
      <Link to="/"><button><b>Go back</b></button></Link>
      </div>
    <div className='forminner'>
    <h2>Edit restaurant</h2>
  <form onSubmit={ onRestaurantAddition }>
    <div className=""><div className=''>Restaurant name: </div> <input type="text" name="restaurantName" value={restaurantName} onChange={ restaurantNamechange } /></div>
    <div className=""><div className=''>Restaurant address: </div> <input type="text" name="restaurantAddress" value={restaurantAddress} onChange={ restaurantAddresschange}/></div>
    <div className=""><div className=''>City: </div> <input type="text" name="restaurantCity" value={restaurantCity} onChange={ restaurantCitychange}/></div>
    <div className=""><div className=''>Email: </div> <input type="text" name="restaurantEmail" value={restaurantEmail} onChange={ restaurantEmailchange}/></div>
    <div className=""><div className=''>Phonenumber: </div> <input type="text" name="restaurantPhoneNumber" value={restaurantPhoneNumber} onChange={ restaurantPhoneNumberchange}/></div>
    <div className=""><div className=''>Price range: </div> <input type="text" name="restaurantPriceRange" value={restaurantPriceRange} onChange={ restaurantPriceRangechange}/></div>
    <div className=""><div className=''>Opening hours: </div> <input type="text" name="openinghours" value={openinghours} onChange={ openinghourschange}/></div>
    <div className=""><div className=''>Restaurant style: </div> <select className="" name="restaurantStyle" value={restaurantStyle} onChange={restaurantStylechange}> 
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
    <button className=''>Edit information</button>
    </form></div>
    </div>
  

)
}
