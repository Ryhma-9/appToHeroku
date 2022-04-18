package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @Column(name = "orderid")
    public Long orderId;

    @Column(name = "customerid")
    public Long customerId;

    @Column(name = "productid")
    public Long productId;

    @Column(name = "restaurantid")
    public Long restaurantId;

    @Column(name = "tobedelivered")
    public Boolean toBeDelivered;
    
    @Column(name = "ordernumber")
    public Long orderNumber;

    @Column(name = "quantity")
    public Long quantity;

    @Column(name = "date")
    public String date;

    public Long getOrderId() {
        return orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public Long getProductId() {
        return productId;
    }

    public Long getRestaurantId() {
        return restaurantId;
    }

    public Boolean getToBeDelivered() {
        return toBeDelivered;
    }

    public void setToBeDelivered(Boolean toBeDelivered) {
        this.toBeDelivered = toBeDelivered;
    }

    public Long getOrderNumber() {
        return orderNumber;
    }

    public Long getQuantity() {
        return quantity;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Orders(){}

    public Orders(
        Long orderId,
        Long customerId,
        Long restaurantId, 
        Long productId,
        Boolean toBeDelivered,
        Long orderNumber,
        Long quantity,
        String date){
            this.orderId = orderId;
            this.customerId = customerId;
            this.restaurantId = restaurantId;
            this.productId = productId;
            this.toBeDelivered = toBeDelivered;
            this.orderNumber = orderNumber;
            this.quantity = quantity;
            this.date = date;
        }
}