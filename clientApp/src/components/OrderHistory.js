import React , { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import './orderHistory.css';
import { Route, Link, } from 'react-router-dom';

export default function OrderHistory() {
  const [ role, setRole ] = useState();
  const [ id, setId ] = useState();
  const [ orders, setOrders ] = useState(null);
  const [ openOrders, setOpenOrders ] = useState(null);
  const [ orderInfo, setOrderInfo ] = useState({ visibility: false, order: {} });
  const [ orderProducts, setOrderProducts ] = useState([]);
  const [ payment, setPayment ] = useState({});

  useEffect(() => {
    function handleToken(){
      var token = sessionStorage.getItem("token");
      var decoded = jwt_decode(token);
      console.log(decoded);
      setRole(decoded.role);
      setId(decoded.customerid);
    }
    handleToken();
    getOrders().then(setOrders);
    getOpenOrders().then(setOpenOrders);
  }, [] );

  async function getOrders() {
    if (role === 'customer' ) {
      const results = await axios.get('http://localhost:8080/ordersbycustomerid/'+id);
      console.log(results.data);
      return results.data;
    }
    else if (role === 'restaurant' ) {
      const results = await axios.get('http://localhost:8080/ordersbyrestaurantid/'+id);
      console.log(results.data);
      return results.data;
    }
  } 
  async function getOpenOrders() {
    if (role === 'customer' ) {
      const results = await axios.get('http://localhost:8080/openordersbycustomerid/'+id);
      console.log(results.data);
      return results.data;
    }
    else if (role === 'restaurant' ) {
      const results = await axios.get('http://localhost:8080/openordersbyrestaurantid/'+id);
      console.log(results.data);
      return results.data;
    }
  } 

  async function getOrderProducts(idList) {
    let params = idList.toString();
    const results = await axios.get('http://localhost:8080/productsandcontentsbyids', { 
      params: { 
        productIds: params 
      } 
    })
    return results.data;
  }
  async function getOrderPayment(orderNumber) {
    const results = await axios.get('http://localhost:8080/paymentsbyordernumber/'+orderNumber);
    console.log(results.data);
    return results.data;
  }
  async function setOrderToDelivered(orderNumber) {
    const results = await axios.get('http://localhost:8080/setordertodelivered/'+orderNumber);
    getOrders().then(setOrders);
    alert(results.data);
  }

  const OpenOrderHandler = () => { 
    return (
      openOrders == null ? "No open orders" : 
        openOrders.map((item, index) => {
          return (
            <div className='orderBox flex' key={index} onClick={ () => [getOrderProducts(orderInfo.order.productIds).then(setOrderProducts), getOrderPayment(orderInfo.order.orderNumber).then(setPayment).then(setOrderInfo({visibility: true, order: item }))]}>
              <div className='orderElement'>{ role === 'customer' ? item.restaurantName : item.customerName }</div>
              <div className='orderElement'>{ item.date }</div>
              <div className='orderElement'>Order number: { item.orderNumber }</div>
            </div>
          )
      })
    )
  }

  const OrdersHandler = () => { 
    return ( 
      orders == null ? "No orders at all :(" : 
        orders.map((item, index) => {
          return (
            <div className='orderBox flex' key={index} onClick={ () => [getOrderProducts(orderInfo.order.productIds).then(setOrderProducts), getOrderPayment(orderInfo.order.orderNumber).then(setPayment).then(setOrderInfo({visibility: true, order: item }))]}>
              <div className='orderElement'>{ role === 'customer' ? item.restaurantName : item.customerName }</div>
              <div className='orderElement'>{ item.date }</div>
              <div className='orderElement'>Order number: { item.orderNumber }</div>
            </div>
          )
        })
    )
  }

  
  function ordersInfo() {  
    let totalPrice = 0;
    function listOrderItems() {
      return (
        orderProducts.map((item, index) => {
          totalPrice += item.price * orderInfo.order.quantities[index];
          return (  
            <tr key={index}>
                <td> { item.productName } </td> 
                <td>{ item.price } €/pcs</td>
                <td>{ orderInfo.order.quantities[index] + " pcs" }</td>
                <td>{ item.price * orderInfo.order.quantities[index] } €</td> 
            </tr>
          )
        })
      )
    }
    function setDeliveryInfo() {
      if (orderInfo.order.toBeDelivered === true) {
        return "Order delivered";
      }
      else if (role === 'customer') {
        let deliveryTime = Math.round((Math.random() * 120));
        return "Order delivered in " + deliveryTime + " minutes";
      }
      else if (role === 'restaurant') {
        return <button onClick={ () => setOrderToDelivered(orderInfo.order.orderNumber) }>Set order to delivered</button>;
      }
    }
    if (orderProducts.length > 0 && payment.length > 0) {
      return (
        <div className="allergyInfoPopUp">
          <h4>Order number: { orderInfo.order.orderNumber }</h4>
          <div>Restaurant: { orderInfo.order.restaurantName }</div>
          <div>Customer: { orderInfo.order.customerName }</div>
          <div>Date: { orderInfo.order.date }</div>
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
              { listOrderItems() }
              <tr>
                <td></td>
                <td></td>
                <td>Total Price:</td>
                <td>{ totalPrice } €</td>
              </tr>
            </tbody>
          </table>
          <div>
            <div>Payment info:</div>
            <div className='flex'>{ payment[0].dateTimeOfPayment } { payment[0].paymentMethod } { payment[0].totalPrice } €</div>
          </div>
          <div>
            <div>Delivery info:</div>
            { setDeliveryInfo() }
          </div>
          <div>
            <button className="" onClick={ ()=> [ setOrderInfo({visibility: false, order: {} }), setOrderProducts([]) ] }> Close </button>
          </div>
      </div>
      )
    }
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
    <div className='marginT120'>
      <h1>Order History</h1>
      <div className=''>
        <h2>Open Orders:</h2>
        <div>
          <OpenOrderHandler />
        </div >
        <h2>All Orders:</h2>
        <div className=''>
          <OrdersHandler />
        </div>
        { orderInfo.visibility ? ordersInfo() : null } 
      </div>
    </div>
    </div>
    </div>
  )
}
