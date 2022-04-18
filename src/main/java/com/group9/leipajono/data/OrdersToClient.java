package com.group9.leipajono.data;

public class OrdersToClient {

    private String customerName;
    private String restaurantName;
    private Boolean toBeDelivered;
    private Long orderNumber;
    private Long[] productIds;
    private Long[] quantities;
    private String date;

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
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

    public void setOrderNumber(Long orderNumber) {
        this.orderNumber = orderNumber;
    }

    public Long[] getProductIds() {
        return productIds;
    }

    public void setProductIds(Long[] productIds) {
        this.productIds = productIds;
    }

    public Long[] getQuantities() {
        return quantities;
    }

    public void setQuantities(Long[] quantities) {
        this.quantities = quantities;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public OrdersToClient(){}

    public OrdersToClient(
        String customerName,
        String restaurantName,
        Long[] productIds,
        Boolean toBeDelivered,
        Long orderNumber,
        Long[] quantities,
        String date){
            this.customerName = customerName;
            this.restaurantName = restaurantName;
            this.productIds = productIds;
            this.toBeDelivered = toBeDelivered;
            this.orderNumber = orderNumber;
            this.quantities = quantities;
            this.date = date;
    }
}