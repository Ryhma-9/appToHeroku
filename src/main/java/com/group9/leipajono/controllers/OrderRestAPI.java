package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Orders;
import com.group9.leipajono.data.OrdersToClient;
import com.group9.leipajono.Service.OrdersService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class OrderRestAPI {
    
    @Autowired
    OrdersService myOrdersService;

    @GetMapping("/orders")
    public List<Orders> getOrders() {
        List<Orders> orders = myOrdersService.getOrders();
        return orders;
    }
    
    @GetMapping("/orderbyordernumber/{orderNumber}")
    public OrdersToClient getOrderByOrderNumber(@PathVariable long orderNumber) {
        OrdersToClient order = myOrdersService.getOrderByOrderNumber(orderNumber);
        return order;
    }

    @GetMapping("/ordersbycustomerid/{customerId}")
    public List<OrdersToClient> getOrdersByCustomerId(@PathVariable long customerId) {
        List<OrdersToClient> orders = myOrdersService.getOrdersByCustomerId(customerId);
        return orders;
    }

    @GetMapping("/openordersbycustomerid/{customerId}")
    public List<OrdersToClient> getOpenOrdersByCustomerId(@PathVariable long customerId) {
        List<OrdersToClient> orders = myOrdersService.getOpenOrdersByCustomerId(customerId);
        return orders;
    }

    @GetMapping("/ordersbyrestaurantid/{restaurantId}")
    public List<OrdersToClient> getOrdersByRestaurantId(@PathVariable long restaurantId) {
        List<OrdersToClient> orders = myOrdersService.getOrdersByRestaurantId(restaurantId);
        return orders;
    }

    @GetMapping("/openordersbyrestaurantid/{restaurantId}")
    public List<OrdersToClient> getOpenOrdersByRestaurantId(@PathVariable long restaurantId) {
        List<OrdersToClient> orders = myOrdersService.getOpenOrdersByRestaurantId(restaurantId);
        return orders;
    }

    @GetMapping("/openordersqtybyrestaurantid/{restaurantId}")
    public int getOpenOrdersQuantityByRestaurantId(@PathVariable long restaurantId) {
        return myOrdersService.getOpenOrdersQuantityByRestaurantId(restaurantId);
    }


    @GetMapping("/setordertodelivered/{orderNumber}")
    public String setOrderToDelivered(@PathVariable long orderNumber) {
        return myOrdersService.setOrderToDelivered(orderNumber);
    }
    
    @PostMapping("addorder")
    public String addNewOrder(
        @RequestParam Long customerId,
        @RequestParam Long restaurantId,
        @RequestParam Long[] productIds,
        @RequestParam Long[] quantityes) {
            return myOrdersService.addNewOrder(customerId, restaurantId, productIds, quantityes);
    }

}