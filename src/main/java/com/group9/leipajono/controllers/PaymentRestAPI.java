package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Payment;
import com.group9.leipajono.Service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class PaymentRestAPI {
    
    @Autowired
    PaymentService myPaymentService;

    @GetMapping("/payments")
    public List<Payment> getRestaurants() {
        return myPaymentService.getPayments();
    }
    
    @GetMapping("/paymentsbyordernumber/{orderNumber}")
    public List<Payment> getPaymentsByOrderNumber(@PathVariable Long orderNumber) {
        return myPaymentService.getPaymentsByOrderNumber(orderNumber);
    }
    
    @PostMapping("addpayment")
    public String addNewPayment(
        @RequestParam Long orderId,
        @RequestParam String paymentMethod,
        @RequestParam Double totalPrice) {
            return myPaymentService.addNewPayment(orderId, paymentMethod, totalPrice);
    }

}
