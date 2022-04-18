import React from 'react'
import './Shop.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function CitySelection(props) {

  const [ cityList, setCityList ] = useState([]);   // Tässä hallitaan näytettävät kaupungit

  // Näkymän ensimäisen renderöinnin yhteydessä haetaan kaikki kaupungit, joissa on ravintoloita ja tallennetaan ne useState-hookkiin
  useEffect(() => {
    getData().then(setCityList);
  }, [] );

  // Funktiolla tullaan heataan tietokannasta kaupungit
  async function getData() {
    const results = await axios.get('http://localhost:8080/restaurantcities');
    return results.data;
  }

  // // Hakutoiminnon eventhandler-funktio
  // const searchHandler = (searchBarText) => {
  //   getData().then( function(res){ setCityList( searchEngine(res,searchBarText) ) });
  // }

  // // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  // const searchEngine = (citys, searchArgument) => {
  //   var search = searchArgument.toString().toLowerCase().trim();
  //   var searchResult = citys.filter(item => {
  //     return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
  //   });
  //   return searchResult;
  // }

  // Funktio, jolla voi luoda random rgb-värin. Kunhan huviksi värkkäilin ja lisäsin muotoilun, joka arpoo jokaiselle kaupunkiboksille eri värin
  function randomColor() {
    let r = Math.round((Math.random() * 255));
    let g = Math.round((Math.random() * 255));
    let b = Math.round((Math.random() * 255));
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  
  return (
    <div>
      {/* <Header 
        onSearchButtonClick={ searchHandler } logIn={ props.loggedIn } logOut={ props.logOut } 
        onHeaderButtonClick={ props.headerButtons } shoppingCartItems={ props.shoppingCart }
      /> */}
      <div className="marginT120 flex cityBoxContainer">
        { 
          cityList.map((item, index) => {
            return ( 
              <Link to="restaurantbrowser" state={ item }>
                <div className="citySelectionBox" style={{ backgroundColor: randomColor() }} key={index} /* onClick={ ()=> props.onSelectClick(item.city) } */>
                    <h2 className="marginT40p">{ item }</h2>
                </div>
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}
