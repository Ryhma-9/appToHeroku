import './App.css';
import { useEffect, useState, useRef } from 'react';
import CitySelection from './components/CitySelection';
import RestaurantBrowser from './components/RestaurantBrowser';
import MenuBrowser from './components/MenuBrowser';
import ShoppingCart from './components/ShoppingCart';
import Payment from './components/Payment';
import Header from './components/Header';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RestaurantProfile from './components/Restaurantprofile';
import MenuEdit from './components/MenuEdit';
import RestaurantEdit from './components/RestaurantEdit';
import OrderHistory from './components/OrderHistory';


function App() {
                                                                            // Jotain toiminnallisuutta kaupungin valinnan hallintaan
  const [ selectedCity, setSelectedCity ] = useState("");                   // valittu kaupunki
  const [ selectedRestaurant, setSelectedRestaurant ] = useState("");       // Ravintolan valintatieto
  const [ selectedRestaurantId, setSelectedRestaurantId ] = useState("");   // Valitun ravintolan id-luku
  const [ deliveryStatus, setDeliveryStatus ] = useState(false);            // Tilauksen kotiinkuljetuksen tila

  sessionStorage.setItem('totalPrice', 0);
  var jwtToken = sessionStorage.getItem("token");

  console.log("selectedRestaurant");
  console.log(selectedRestaurantId);

  return (
    <div>
      <BrowserRouter>
      <div className="header">
        <Header isCitySelected={ selectedCity } isRestaurantSelected={ selectedRestaurant }/>
      </div>
        <Routes>
          <Route path="/" element={<CitySelection /> } />
          <Route path="/restaurantbrowser" element={<RestaurantBrowser isCitySelected = { (selectedCity) => { setSelectedCity(selectedCity)} }/>}/>
          <Route path="/menubrowser" element={<MenuBrowser isRestaurantSelected = { (selectedRestaurant) => { setSelectedRestaurant(selectedRestaurant)}} isRestaurantIdSelected = { (selectedRestaurantId) => { setSelectedRestaurantId(selectedRestaurantId)}}/>}/>
          <Route path="/shoppingcart" element={<ShoppingCart  deliverystatus={deliveryStatus}  deliverystatustoggle = { (deliveryStatus) => {setDeliveryStatus(!deliveryStatus)}}/>}/>
          <Route path="/payment" element={ <Payment deliverystatuscheck = {deliveryStatus} selectedrestaurantid = { selectedRestaurantId }/>}/>
          <Route path="/restaurantprofile" element={ <RestaurantProfile/>}/>
          <Route path='/menuedit' element={<MenuEdit/>}/>
          <Route path='/restaurantedit' element={<RestaurantEdit/>}/>
          <Route path='/orderhistory' element={<OrderHistory/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
} export default App;

