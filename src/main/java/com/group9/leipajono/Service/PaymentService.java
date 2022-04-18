package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Payment;
import com.group9.leipajono.repositories.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;

@Service
public class PaymentService {
    
    @Autowired
    PaymentRepository myPaymentRepository;

    @PostConstruct
    public void init(){
        Payment p = myPaymentRepository.findById(1L).orElse(null);

        if(p != null){
            System.out.println("Payment orders id: " + p.orderId + " and payments id: " + p.paymentId);
        } else {
            System.out.println("**************************payment null");
        }
    }

    public List<Payment> getPayments(){
        return myPaymentRepository.findAll();
    }

    public List<Payment> getPaymentsByOrderNumber(Long orderNumber){
        return myPaymentRepository.findPaymentByOrderId(orderNumber);
    }

    public String addNewPayment(Long orderId, String paymentMethod, Double totalPrice){
        try {
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            Payment p = new Payment(myPaymentRepository.getMaxPaymentId()+1, orderId, timestamp, paymentMethod, totalPrice);
            myPaymentRepository.save(p);
            return "Payment added successfully";
        }
        catch (Exception e) {
            return "Payment addition failed";
        }        
    }
}
