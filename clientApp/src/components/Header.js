import React from 'react';
import './Shop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faCog, faSignInAlt, faSignOutAlt, faShoppingCart, faUser, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import SignupView from './SignupView';
import LoginView from './LoginView';
import CustomerProfile from './Customerprofile';


export default function Header(props) {

  // Hakukentän tekstin hallinta
  const [ searchBarText, setSearchBarText ] = useState("");   
  const handleSearchBarTextChange = (event) => {
    setSearchBarText(event.target.value);
  }
  const [showLoginView, setShowLoginView] = useState(false); //login ja signup -popuppien statehookit
  const [showSignUpView, setShowSignUpView] = useState(false);
  const [showProfileView, setShowProfileView] = useState(false);

  

  var jwtToken = sessionStorage.getItem("token");

  // Tällä funktiolla haetaan ostoskorin tuotteet ja lasketaan tuotteiden lukumäärä
  function itemsInCart() {

    // let cartItems = [];
    // cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
    // let sum = cartItems.length;
    // props.shoppingCartItems.forEach(function(item){
    //   sum += item.qty;
    // });
    // console.log(sum);
    // return sum;
  }

  sessionStorage.setItem('selectedCity', props.isCitySelected);

  sessionStorage.setItem('selectedRestaurant', props.isRestaurantSelected);

  let restaurant = props.isRestaurantSelected;

  const [ dropDownMenu, setDropDownMenu ] = useState(false);  // Tällä ohjataan profiilialasvetovalikon näkyvyyttä
  const DropDownMenu = () => {    // En osannu käyttää valmiita kirjastoja / ne jotka sain toimaan oli kökköjä niin tässä ite värkätty alavetovalikko
    return (
      <div className="dropdown">
        <a>Logged in as:</a>
        <a>{ props.logIn }</a>
        <button onClick={ () => props.onHeaderButtonClick("EditProfile") }><span>Edit Profile <FontAwesomeIcon icon={ faCog }/></span></button>
        <button onClick={ () => alert("Painoit hauskaa nappia") }>Jokin hauska nappi</button>
        <button onClick={ ()=> [props.logOut(""), setDropDownMenu(!dropDownMenu)] }><span>Logout <FontAwesomeIcon icon={ faSignOutAlt }/></span></button>
      </div>
    )
  }


  return (
    <div className="stickyHeader flex ">

      <div className="logoContainer W230">
        <Link to="/">
          <img className="logo" alt="LOGO PLACEHOLDER"  width="100%" src="leipä.png"/>
          </Link>
      </div>
      <div>
        <div className="headerUpper flex ">
          { props.onSearchButtonClick ? 
            <form className="menuElement"> 
              <div className="menuElement flex W700">
                <input className="searchBar" type="text" name="search" 
                  onChange={ handleSearchBarTextChange } value={ searchBarText } placeholder="Search"
                />
                <button className="searchBarButton orangeBG" type="button" onClick={ ()=> props.onSearchButtonClick(searchBarText) }>
                  <FontAwesomeIcon icon={ faSearch } size="1x"/>
                </button>
              </div>
            </form> : null
          }   
          <div className="menuElement W230 shoppingCart">
            <Link to="/shoppingcart" ><button className="shoppingCartButton" type="button">
                <span>Shopping Cart <FontAwesomeIcon icon={ faShoppingCart }/>{ itemsInCart() > 0 && itemsInCart() !== null  ? 
                  <span className="shoppinCartItems">{ itemsInCart() }</span> 
                  : 
                  null }
                </span>   
            </button></Link>
          </div>
          <div className="menuElement W230 profile">
            { jwtToken !== null ?               // Renderöidään kirjaudupainike, jos käyttäjä on kirjautunut renderöidään profiilipainike
              <button className="profileButton" type="button" 
                onClick={ () => setShowProfileView(true) }>
                <span>Profile <FontAwesomeIcon icon={ faUser }/> < FontAwesomeIcon icon={ dropDownMenu ? faAngleUp : faAngleDown }/> </span>
              </button> 
              : 
              <div className="logInAndSignUpButtons">
                <div>
                  <button className="logInButton" type="button" 
                  onClick={ () => setShowLoginView(true) }>
                  <span>Log In <FontAwesomeIcon icon={ faSignInAlt }/></span> 
                </button>
              </div>
              <div>
                  <button className="signUpButton" type="button" 
                  onClick={ () => setShowSignUpView(true) }>
                  <span>Sign Up <FontAwesomeIcon icon={ faSignInAlt }/></span> 
                </button>
                </div>
              </div>
            }
          </div>
        </div>
        <div className="headerLower">
          <Link to="/restaurantbrowser"><p>{sessionStorage.getItem('selectedCity')}</p></Link>
          <p>{restaurant}</p>
      <div>
       
      </div>
          <LoginView trigger={showLoginView} setTrigger={setShowLoginView} />
          <SignupView trigger={showSignUpView} setTrigger={setShowSignUpView} />
          <CustomerProfile trigger={showProfileView} setTrigger={setShowProfileView} />
        </div>
      </div> 
    </div>
  )
}
