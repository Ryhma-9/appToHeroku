package com.group9.leipajono.data;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="payment")
public class Payment {
    
    @Id
    //@GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "paymentid")
    public Long paymentId;

    @Column(name="orderid")
    public Long orderId;

    @Column(name="datetimeofpayment")
    public Timestamp dateTimeOfPayment;

    @Column(name="paymentmethod")
    public String paymentMethod;

    @Column(name = "totalprice")
    public Double totalPrice;

    public Payment(){}

    public Payment(
        Long paymentId,
        Long orderId,
        Timestamp dateTimeOfPayment,
        String paymentMethod,
        Double totalPrice
    ){
            this.paymentId = paymentId;
            this.orderId = orderId;
            this.dateTimeOfPayment = dateTimeOfPayment;
            this.paymentMethod = paymentMethod;
            this.totalPrice = totalPrice;
    }
}
