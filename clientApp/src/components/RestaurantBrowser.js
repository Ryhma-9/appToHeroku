import React from 'react'
import './Shop.css';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'


export default function RestaurantBrowser(props) {

  // sessionStorage.setItem('selectedCity', props.city);

  const location = useLocation();
  let city = location.state;
  if(city === null) city = sessionStorage.getItem('selectedCity');

  /* let selectedCity = ""; */

  // if (sessionStorage.getItem('selectedCity' === ""))
  // {
  //   selectedCity = props.city;
  //   sessionStorage.setItem('selectedCity', selectedCity);
  // } else {
  //   selectedCity = sessionStorage.getItem('selectedCity');
  // }
  
  
  // console.log(sessionStorage.getItem('selectedCity'))
  const [ restaurantList, setRestaurantList ] = useState([]);   // Tähän asetetaan näytölle tulostettavat ravintolat
  const [ restauranStyle, setRestauranStyle ] = useState([]);   // Tähän asetetaan käyttäjän tekemä ravintolatyyppifiltteröinti

  // Näkymän ensimäisen renderöinnin yhteydessä haetaan valitun kaupungin ravintolat ja tallennetaan ne useState-hookkiin
  useEffect(() => {
    getData().then(setRestaurantList);
    getData().then(listStyles);
  }, [] );

  // Funktiolla tullaan haetaan tietokannasta valitun kaupungin ravintolat.
  async function getData() {
    const results = await axios.get('http://localhost:8080/restaurantsByCity/'+city);
    console.log(results)
    console.log(results.data)
    return results.data;
  }

  // Listataan ravintoloiden tyypit
  function listStyles(restaurants) {
    var restauranStyleList = [];
    restaurants.map((item) => {
      return restauranStyleList.includes(item.restaurantStyle) ? null : restauranStyleList.push(item.restaurantStyle)
    });
    setRestauranStyle(restauranStyleList);
  }

  // Hakutoiminnon eventhandler-funktio. Funktiolla tällä hetkellä päivitetään hardkoodatuista ravintoloista suoritettu haku headerin hakukenttään annetun teksin perusteella
  // const searchHandler = (searchBarText) => {
  //   getData().then( function(res){ setRestaurantList( searchEngine(res,searchBarText) ) });
  // }

  // // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  // const searchEngine = (restaurants, searchArgument) => {
  //   var search = searchArgument.toString().toLowerCase().trim();
  //   var searchResult = restaurants.filter(item => {
  //     return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
  //   });
  //   return searchResult;
  // }

  // Funktiolla luodaan visuaalinen tähtiarvio 0 - 5 tähteä. Funtio tulostaa olion rating-arvon verran täysiä tähtiä ja 5-rating tyhjiä tähtiä
  const ratings = (props) => {
    var rating = [];
    for (let i = 0; i < props.restaurantRating ; i++) { 
      rating.push(<div> <FontAwesomeIcon icon={ faStar }/>&nbsp;</div>);
    }; 
    for (let i = 0; i < 5 - props.restaurantRating; i++) {
      rating.push(<div> <FontAwesomeIcon icon={ farStar }/>&nbsp;</div>);
    };
    return (
      <div className="flex orange review">
        { rating }
      </div>
    )
  }

  // Testailua kaupungin valinnan poistoon
  const removeSelection = () => {
    props.unSelectCity("");
  }

  // Funktiolla lisätään headeriin kaupungin valinnan postonappi sekä napit ravintolatyylifiltteröintiin
  const manageHeaderContent = (props) => {
    // Luodaan napit filtteröintiin ja sen poistoon
    function manageRestaurantStyleButtons() {
      if ( restauranStyle.length === 1) {
        return ( 
          <button className="styleButton" type="button" onClick={ ()=> getData().then(listStyles) }>
            <span>{ restauranStyle[0] } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span>
          </button>
        )
      }
      else {
        return restauranStyle.map((item, index) => {
          return (
            <button className="styleButton" type="button" key={index} onClick={ ()=> setRestauranStyle([item]) }>
              <span>{ item }</span>
            </button>
          )
        });
      }
    }

    return (
      <div className="flex">
        <button className="cityButton" type="button" onClick={ ()=> removeSelection("") }>
          {/* <span>{ selectedCity } <FontAwesomeIcon style={{ color: 'crimson' }} icon={ faXmark }/></span> */}
        </button>
        <div className="restaurantStyleButtons flex">
          { manageRestaurantStyleButtons() }
        </div>
      </div>
    )
  }

  const DeliveryTime = (props) => {
    function openOrders() {
      // Tähän joskus joku koodi joka hakee ravintolan avoimet toimittamattomat tilaukset
      // Testailun vuoksi arvotaan random numero
      return Math.round((Math.random() * 10 +1));
    }
    function basicDeliveryTime(restaurantType) {  // Tässä määritellään ravintolatyypeille toimitusarvio
      switch (restaurantType) {
        case 'Fastfood'       :  return 15
        case 'Fine dining'    :  return 35
        case "Buffet"         :  return 25
        case 'Fast casual'    :  return 20
        case 'Casual dining'  :  return 30
        default               :  return null
      }
    }
    let orders =  openOrders();
    let t  = basicDeliveryTime(props.productInfo.restaurantStyle)
    
    return (
      <div><span>Delivery: { parseInt(t + t * 0.1 * orders) } minutes</span></div>  // tässä lasketaan toimitusaika-arvioon avoimet tilaukset mukaan
    )
  }

  return (
    <div>{ props.isCitySelected( city )}
      {/* <Header /* onSearchButtonClick={ searchHandler }  addContentToHeader={ manageHeaderContent } shoppingCartItems={ props.shoppingCart }
        logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ props.headerButtons }
      /> */}
      <div className="marginT120">
        { // Ravintoloiden listauksen mappauksen yhteyteen on lisätty ravintolatyylifiltteröinti
          restaurantList.filter(item => item.restaurantStyle.includes(restauranStyle.length === 1 ? restauranStyle : "")).map((item, index) => {
            return( 
              <Link to="/menubrowser" state={ item } >
                <div className="restaurantInfoContainer flex" key={index} /* onClick={ ()=> props.onSelectClick(item) } */ >
                  <div className="restaurantImg">
                    <img alt={ item.name } width="100%" src={ item.restaurantImg }/>
                  </div>
                  <div className="restaurantInfo">
                    <div className="restaurantMainInfo flex">
                    <div><h2>{ item.restaurantName }</h2></div>
                      <div><h3>{ item.restaurantStyle }</h3></div>
                    </div>
                    <div className="restaurantAdditionalInfo flex">
                      <div><span>{ item.restaurantPriceRange }</span></div>
                      <DeliveryTime productInfo={ item }/>
                      { ratings(item) }
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
