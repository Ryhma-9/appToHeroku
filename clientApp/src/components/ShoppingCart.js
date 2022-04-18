import React from 'react';
import './Shop.css';
import Header from './Header';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function ShoppingCart(props) {

    const [ delivery, setDelivery ] = useState(false);      //Tilamuuttuja kotiinkuljetusta varten

    let idList = [];                                        //Muuttujien määrittelyjä
    let idQtyList = [];
    let itemBanList = [];
    let totalPrice = 0;
    let cartItems = getCartItemsFromStorage();

    console.log(delivery);


    function getCartItemsFromStorage(){                     //Hakee ostoskorin sisällön sessionStoragesta
        let cartItems = [];
        if(sessionStorage.getItem('cartItems') !== null){
            cartItems = JSON.parse(sessionStorage.getItem('cartItems'));
        } 
        idGetter( cartItems );
        
        return cartItems;
    }


    function idGetter( cartItems ){                     //Listaa cartItems-taulukon esineiden id-numerot idList-taulukkoon

        cartItems.forEach(item => {
            idList.push(item.productId);
        });
    }
    

    function getCartItemsQuantity( id ){                //Laskee kunkin ostoskärry-tuotteen lukumäärän
        let count = 0;
        idList.forEach(i => {
            if(id === i) count++;
        });
        return count;
    }

    function totalItemPriceCalculator(price, qty) {     //Laskee kaikkien ostoskärryssä olevien, saman id:n omaavien tuotteiden yhteishinnan
        let totalItemPrice = price * qty;                 
        return totalItemPrice;
    } 

    function banCheck( id ){                            //Tarkistaa onko tietty tuote tulostuskieltolistalla. Kun menuBrowser-näkymässä klikataan tuotetta,  
                                                        //lisätään se sessionStorageen omalle rivilleen. Tämä funktio rajaa, että jokaista productId-numeroa kohden 
        let resultFlag = false;                         //tulostetaan shoppingCart-näkymään vain yksi rivi, johon perään on ilmoitettu tuotteiden lukumäärä. 

        itemBanList.forEach(i => {
            if(id === i){
                resultFlag = true;
            }
        });
        return resultFlag;
    }
    function clearCartItems(){                          //Functio ostoskorin tyhjentämiselle ja sivun päivittämiselle
        sessionStorage.removeItem('cartItems');
        window.location.reload(false);
    }
    
    const listItems = cartItems.map((item) => {         //Tulostaa tuotteen tiedot shoppingCart-näkymään. 

        idList.forEach(id => {
            if(id === item.productId);
        });
        
        let quantity = getCartItemsQuantity( item.productId );
        let banCheckFlag = banCheck(item.productId);
        let totalPricePerUnit = totalItemPriceCalculator(item.price, quantity);

        if(item !== null && banCheckFlag === false){        //banCheckFlagilla tarkistetaan, ettei samaa tuotetta tulosteta moneen kertaan.
            totalPrice += totalPricePerUnit;
            sessionStorage.setItem('totalPrice', totalPrice);

            itemBanList.push(item.productId);

            idQtyList.push({                                //Lista, johon säilötään kunkin ostoksen id ja lukumäärä
                productId:item.productId,
                productQty:quantity
            })

            return ( <tr>                                   
                <td id="itemName" key="productId"> { item.productName } </td> 
                <td>{ item.price }</td>
                <td>{ quantity }</td>
                <td>{ totalPricePerUnit } {" €"}</td>
            </tr>); 
        }
        return;    
    });

    function handleCheckMarkChange(){                       //Funktio kotiinkuljetusvalinnan hallintaan
        setDelivery(!delivery);
        props.deliverystatustoggle(delivery);
    }

    function handleChecked(){                               //Funktio kotiinkuljetusvalinnan hallintaan
        let check = props.deliverystatus ? true : false; 
        return check;
    }

    sessionStorage.setItem('idQtyList', JSON.stringify(idQtyList));

    return (
        <div > 
            <div className="shoppingCartView">
                <h1>Shopping Cart</h1>
                    <table id="shoppingCartTable">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Unit price</th>
                                <th>Quantity</th>
                                <th>Total price</th>
                            </tr>
                        </thead>
                        <tbody>

                            { listItems }
                            
                            <tr id="totalPrice">
                                <td>Total Price: </td>
                                <td></td>
                                <td></td>
                                <td>{ totalPrice }{" €"}</td>
                            </tr>
                            <tr>
                                <td><button onClick={ () => clearCartItems()} >Clear Cart</button></td>    
                                <td></td>
                                <td><div className="kotiinkuljetus">
                                    Kotiinkuljetus 
                                    <input 
                                        onChange={ () => handleCheckMarkChange()}
                                        checked={ handleChecked() }
                                        id="kotiinkuljetus" 
                                        type="checkbox" />
                                    </div>
                                </td>
                                <td><Link to="/payment" ><button id="btnpay" >Maksamaan</button></Link></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    )
}
