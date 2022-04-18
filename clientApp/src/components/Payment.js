import React, { useState} from 'react'
import './Shop.css'
import PaymentMethodView from './PaymentMethodView'
import ProcessingView from './ProcessingView';
import axios from 'axios'
import jwt_decode from 'jwt-decode';


export default function Payment(props) {

  var jwtToken = sessionStorage.getItem("token");         //Otetaan jwtTokeni sessionstoragesta käyttäjän id-numeron löytämiseksi
  let selectedRestaurant = props.selectedrestaurantid;    //Otetaan valittu ravintola muuttujaan tilaustapahtuman arkistoimista varten
  

  let itemIdList = [];                                    //Listoja tuotteiden id:ille ja lukumäärille
  let itemQty = [];

  function getCustomerIdFromToken(){                      //Kytetään jwtTokenia asiakkaan id:n löytämiseksi
    var decoded = jwt_decode(jwtToken);
    return decoded.customerid;
  }

    const itemIdQtyList = JSON.parse(sessionStorage.getItem('idQtyList'));

    itemIdQtyList.forEach(item => {                       //Lajitellaan tuotteita ja lukumääriä listoihin
      itemIdList.push(item.productId);
      itemQty.push(item.productQty);
    });

    const [ paymentSuccesfull, setPaymentSuccessfull ] = useState(false);
    const [ bankSelectorDisplay, setBankSelectorDisplay ] = useState(false);
    const [ processingViewDisplay, setProcessingViewDisplay ] = useState(false);

    let deliveryTime = Math.round((Math.random() * 10 +10));    //Realistinen aika-arvio-generaattori
    let deliveryPrice = Math.round((Math.random() * 10 +10));
    

    function tokenCheck(){
      if(sessionStorage.getItem('token') !== "")
      return true;
      return false;
    }

    let totalPrice = parseInt(sessionStorage.getItem('totalPrice'));    //Ottaa tuotteiden kokonaishinnan sessionstoragesta

    let customerIdd = getCustomerIdFromToken();
    customerIdd = +customerIdd;

    function addOrder() {                                               //Funktio uuden tilaustapahtuman luomiseksi tietokantaan

      let formData = new FormData();
      formData.append("customerId", customerIdd);
      formData.append("restaurantId", selectedRestaurant);
      formData.append("productIds", itemIdList);
      formData.append("quantityes", itemQty);

      axios.post('http://localhost:8080/addorder', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        }).then(function (response) {
          console.log(response);
        })
    }

    function addPayment() {                                             //Funktio uuden maksutapahtuman luomiseksi tietokantaan

      let formData = new FormData();
      formData.append("orderId", 1);
      formData.append("paymentMethod", "tilisiirto");
      formData.append("totalPrice", totalPrice);


      axios.post('http://localhost:8080/addpayment', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        }).then(function (response) {
          console.log(response);
        })
    }
    
    

    if(paymentSuccesfull) {                                 //Jos maksutapahtuma on ilmoitettu onnistuneeksi, luodaan tietokantaan
      addOrder();                                           //uudet tilaus- ja maksutapahtumat
      addPayment();
      setPaymentSuccessfull(false);                         //Estää, että tilaus- ja maksutapahtumia ei tule tuplana
    }

    const DeliveryView = () => {                            //Piirtää tekstiä kotiinkuljetuksen statuksesta ruudulle
      return( props.deliverystatuscheck ? (<div><p>Delivery is {deliveryPrice} € and should take about {deliveryTime} minutes</p></div>)
      : "")
    }


  return (
    <div className='payment'>
        <div><h2>Please provide a Visa or throw some cash</h2></div>
        { DeliveryView() }
        <div><h3>Your total price is: { totalPrice + (props.deliverystatuscheck ? parseInt(deliveryPrice) : 0) } €</h3><br/></div>
        <PaymentMethodView bankselecttrigger={ bankSelectorDisplay } processingviewtrigger={ processingViewDisplay } bankselector={() => setBankSelectorDisplay(!bankSelectorDisplay)} processingview={() => setProcessingViewDisplay(!processingViewDisplay)}/>
        {processingViewDisplay ? <ProcessingView processingviewtrigger={ processingViewDisplay } processingview={() => setProcessingViewDisplay(!processingViewDisplay)} paymentsuccesfull = { paymentSuccesfull } setpaymentsuccesfull = {() => setPaymentSuccessfull(!paymentSuccesfull)} /> : ""}
        <div className='paymentbuttons'>
            <button onClick={ () => setBankSelectorDisplay(!bankSelectorDisplay) }>Choose your method of payment</button>
        </div>
    </div>
  )
}
