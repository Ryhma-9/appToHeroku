import React from 'react'
import './Shop.css';
import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faBasketShopping, faInfo } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from 'react-router-dom'


export default function MenuBrowser(props) {

  
  const location = useLocation();
  const restaurant = location.state;
  const restaurantName = location.state.restaurantName;

  // console.log(restaurant);

  // const restaurantCity = location.state.restaurantCity;




  // console.log("sessionstorage" + sessionStorage.getItem('selectedCity'))

  // if (sessionStorage.getItem('selectedCity' !== ""))
  // {
  //   selectedCity = sessionStorage.getItem('selectedCity');

  // } else {

  //   selectedCity = restaurantCity;
  //   sessionStorage.setItem('selectedCity', selectedCity);
  // }

  // console.log(selectedCity);
  // let selectedCity = props.city;
  // let selectedRestaurant = props.restaurant.restaurantName;
  let menuCategories = ['appetizer', 'main dish', 'dessert', 'drink', 'extras', 'other'];   // tuotekategoriat, jonka mukaan asettelu on rakennettu. Tuotteet tulostetaan kategoriossa taulukon järjestyksessä
  const [ categoryQty, setCategoryQty ] = useState(1);      // En varmaan vaan osaa, mut joutu tekemään tän Vakioannostyypien määrälle. categoryQty > 1 on tuotekategorioiden filtteröinti käytössä
  const [ menu, setMenu ] = useState([]);                   // Tähän asetetaan näytölle tulostettavat annokset
  const [ menuCategory, setMenuCategory ] = useState([]);   // Ja tähän tuotekategoriat. Tätä käytetään myös tuotekategorioiden filtteröintiin  

  // Hakutoiminnon eventhandler-funktio. Funktiolla tällä hetkellä päivitetään hardkoodatuista ravintoloista suoritettu haku headerin hakukenttään annetun teksin perusteella
  // const searchHandler = (searchBarText) => {
  //   getData().then( function(res){ setMenu( searchEngine(res,searchBarText) ) });
  // }
  // // Hakufunktio, jolla haetaan siihen syötetyn tietueen oliot, joiden arvoista löytyy annettu hakusana
  // const searchEngine = (items, searchArgument) => {
  //   var search = searchArgument.toString().toLowerCase().trim();
  //   var searchResult = items.filter(item => {
  //     return Object.keys(item).some(key => item[key].toString().toLowerCase().includes(search));
  //   });
  //   return searchResult;
  // }

  // Tuotteiden valinnan toimintojen hahmottelua
  // const [ shoppingCartItems, setShoppingCartItems ] = useState([]);
//   // Funktio, jolla lisätään tuote ostoskoriin tai jos tuote on jo korissa lisätään sen määrää
//   const shoppingCartTesting = (item) => { 
//   let newShoppingCartItems = [...shoppingCartItems];
//   let itemClickedIndex = newShoppingCartItems.findIndex(i => item.productId === i.productId)
//   if (itemClickedIndex !== -1) {
//     let newElement = {...newShoppingCartItems[itemClickedIndex]}
//     newElement.qty += 1;
//     newShoppingCartItems[itemClickedIndex] = newElement;
//   }
//   else {
//     let newElement = [...newShoppingCartItems,
//     {
//       id : shoppingCartItems.length + 1,
//       productId : item.productId,
//       name : item.productName,
//       price : item.price,
//       qty : 1
//     }]
//     newShoppingCartItems = newElement;
//   }
//   setShoppingCartItems(newShoppingCartItems);
//   console.log(item.productName + " added to cart");
//   console.log(newShoppingCartItems);
// }

  function addCartItems( props ){
    let cartItems = getCartItems();

    // console.log( typeof cartItems);
    // console.log( JSON.stringify(props));
    console.log( cartItems );
    

    cartItems.push(props);
    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  function getCartItems(){
    let cartItems = [];

    if(sessionStorage.getItem('cartItems') !== null){
        cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    } 
      
    return cartItems;
  }


  // // Ehkä tyhmä idea, mutta jotta saa näkymän toiminnot toimimaan oikeen käytetään funktion omaa statehookkia ja päivitetään ostoskori vain hallitusti App.js:ään
  // function passShoppingCartToApp() {
  //   props.addItemsToCart(shoppingCartItems)
  // }
  // // Liittyy edelliseen funktioon. Näkymän vaihdon yhteydessä päivitetään ostoskorin sisältö App.js
  // const headerButtonHandler = (buttonValue) => {
  //   passShoppingCartToApp();
  //   props.headerButtons(buttonValue);
  // }

  // Näkymän ensimäisen renderöinnin yhteydessä haetaan valitun ravintolan ruokalista, tuotekategoriat, ostoskorin sisältö App.js:stä ja tallennetaan ne useState-hookkeihin
  useEffect(() => {
    getData().then(setMenu);
    getData().then(listCategories).then(setMenuCategory);
    // setShoppingCartItems(getCartItems());
    // console.log(shoppingCartItems);
    getData().then(listCategories).then((res) => {
      setCategoryQty(res.length);
    });
  }, [] );

  // Funktiolla tullaan hakemaan tietokannasta valitun ravintolan menu / tiedot. Testivaiheessa vähän oiotaan mutkia
  async function getData() {
    // console.log(props.restaurantId);
    const results = await axios.get('http://localhost:8080/menuitemsbyrestaurantid/' + restaurant.restaurantId);
    return results.data;
  }
  
  function listCategories(data) {
    let menuCategoryList =[];
    let categoryList = new Set()
    data.map((item) => {
      return categoryList.add(item.type)
    });
    for (const x of categoryList.values()) {
      if (menuCategories.includes(x.toLowerCase())) {
        menuCategoryList.push(x.toLowerCase());
      }
      else if (menuCategoryList.includes(!'Other')) {
        menuCategoryList.push('Other');
      }
    }
    return menuCategoryList;
  }

  // Täällä tapahtuu itse ruokalistan käsittely ja "tulostaminen"
  const MenuItemHandler = () => {    

    const AddToShopingcart = (props) => { // Tässä luodaan lisää ostoskoriin nappi
      return (
        <div className="menuHandlebutton" onClick={ () => addCartItems(props.productInfo) }>
          <h3> Add to Cart <FontAwesomeIcon icon={ faBasketShopping }/> </h3>
        </div>
      )
    }

    const AllergyInfo = (props) => {  // Tässä allergiainfo.  Tulostetaan lihenteet tuotteen allergioista ja nappi jolla tulostetaan lyhenbteiden selitykset
      function printAllergyIcon(allergy) {
        switch (allergy) {
          case "celery"       : return <div className="allergyIcon"> CE </div>
          case "crustaceans"  : return <div className="allergyIcon"> CR </div>
          case "eggs"         : return <div className="allergyIcon"> E </div>
          case "fish"         : return <div className="allergyIcon"> F </div>
          case "gluten"       : return <div className="allergyIcon"> G </div>
          case "lupin"        : return <div className="allergyIcon"> L </div>
          case "milk"         : return <div className="allergyIcon"> MI </div>
          case "molluscs"     : return <div className="allergyIcon"> MO </div>
          case "mustard"      : return <div className="allergyIcon"> MU </div>
          case "peanuts"      : return <div className="allergyIcon"> P </div>
          case "sesame"       : return <div className="allergyIcon"> SE </div>
          case "soybeans"     : return <div className="allergyIcon"> SO </div>
          case "sulphur_dioxide_and_sulphates" : return <div className="allergyIcon"> SU </div>
          case "tree_nuts"    : return <div className="allergyIcon"> T </div>
          default : return null
        }
      }
      return (
        <div className="marginL200 flex">
          <div>Allergy information: </div>
          { props.productInfo.map((item) => { return printAllergyIcon(item) }) }
          <div className="allergyInfoIcon" onClick={ ()=> setAllergyInfoVisibility(!allergyInfoVisibility) }> <FontAwesomeIcon icon={ faInfo } size="1x"/></div>
        </div>
      )
    }

    const ProductInfoButton = (props) => {  // Tulostetaan lisäinfonappi. Nappia painamalla asetetaa lisäinfo näkyväksi ja asetetaan statehookkiin tuotteen lisätiedot
      return (
        <div className="menuHandlebutton marginL200 " onClick={ ()=> setMoreInfo({visibility: !moreInfo.visibility, ingredients: props.ingredients, energyContent: props.energy}) }>
          More information
        </div>
      )
    }

    return (
      menuCategories.map((category) => {
        return menuCategory.includes(category) ? // Tarkastetaan onko ko kategoriassa tuotteita, jos ei niin kategoriaa ei tulosteta
          <div className="menuCategoryContainer">
            <div className="title"><h2>{ category.toUpperCase() }</h2></div>
            { 
              menu.map((item, index) => {
                return item.type.toLowerCase().includes(category) ?   // Tässä käydään tuotteet läpi ja tulostetaan ne kategoriottain
                  <div className="menuItemContainer flex" key={index} > 
                    <div className="restaurantImg">
                      <img alt={ item.productName } width="100%" src={ item.productImg }/>
                    </div>
                    <div className="productInfo">
                      <div className="productMainInfo flex">
                        <div><h2>{ item.productName }</h2></div>
                        <div><p>{ item.description }</p></div>
                        <AddToShopingcart productInfo={ item }/>
                      </div>
                      <div className="productAdditionalInfo flex">
                        <div><h3>{ item.price  } €</h3></div>
                        <AllergyInfo productInfo={ item.allergens }/>
                        <ProductInfoButton ingredients={ item.ingredients } energy={ item.energyContent }/>
                      </div>
                    </div>
                  </div> 
                  : null
              })
            }
          </div> 
          : null
      })
      
    )    
  }

  const [ allergyInfoVisibility, setAllergyInfoVisibility ] = useState(false); // Allergiainfo pop-up hallinta
  function allergensInfo() {  // Allergialyheteiden selosteet. Näytetään kun painetaan infopainiketta
    return (
      <div className="allergyInfoPopUp">
        <h4>Allergens:</h4>
        <pre>{`
          CE = Cellery
          CR = Crustaceans
          E  = Eggs
          F  = Fish
          G  = Gluten
          L  = Lupin
          MI = Milk
          MO = Molluscs
          MU = Mustard
          P  = Peanuts
          SE = Sesame seeds
          SO = Soybeans
          SU = Sulfur dioxide and sulphites
          t  = Tree nuts
        `}</pre>
        <div>
          <button className="" onClick={ ()=> setAllergyInfoVisibility(false) }> OK </button>
        </div>
    </div>
    )
  }

  const [ moreInfo, setMoreInfo ] = useState({visibility: false, ingredients: "", energyContent: ""}); // Lisäinfo pop-up hallinta. Tähän tallennetaan näkyvyys ja lisätiedot
  function printMoreInfo() {  // Lisäinfonjon tulostus. Tiedot haetaan statehookista
    return (
      <div className="allergyInfoPopUp">
        <h4>Ingredients: { moreInfo.ingredients }</h4>
        <h4>Energy: { moreInfo.energyContent } kCal</h4>
        <div>
          <button className="" onClick={ ()=> setMoreInfo({visibility: false, ingredients: "", energyContent: ""}) }> OK </button>
        </div>
    </div>
    )
  }

  return (
    <div>{props.isRestaurantSelected( restaurantName )} 
         {props.isRestaurantIdSelected( restaurant.restaurantId )}
      {/* <Header 
        addContentToHeader={ manageHeaderContent } shoppingCartItems={ shoppingCartItems } passShoppingCartToApp={ passShoppingCartToApp }
        logIn={ props.loggedIn } logOut={ props.logOut } onHeaderButtonClick={ headerButtonHandler } onSearchButtonClick={ searchHandler }
      /> */}
      <div className="marginT120">
        <button onClick={ () => alert(JSON.stringify(getCartItems())) }>Get Cart Items</button>   {/* Testailua varten napillisia toimintoja, koska olen laiska, enkä jaksa käsin klikkailla selaimen storage valikkoon kokoajan >:D */}
        <button onClick={ () => sessionStorage.removeItem('cartItems')}>Clear Cart</button>
        <MenuItemHandler/>
        { allergyInfoVisibility ? allergensInfo() : null }
        { moreInfo.visibility ? printMoreInfo() : null }
      </div>
    </div>
  )
}
