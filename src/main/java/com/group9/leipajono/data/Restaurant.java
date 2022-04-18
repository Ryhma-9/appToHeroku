package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "restaurant")
public class Restaurant {
    
    @Id
    //@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurantid")
    public Long restaurantId;

    @Column(name = "restaurantname")
    public String restaurantName;

    @Column(name = "restaurantaddress")
    public String restaurantAddress;

    @Column(name = "restaurantusername")
    public String restaurantUserName;

    @Column(name = "restaurantemail")
    public String restaurantEmail;

    @Column(name = "restaurantphonenumber")
    public String restaurantPhoneNumber;

    @Column(name = "restaurantstyle")
    public String restaurantStyle;

    @Column(name = "restaurantpricerange")
    public String restaurantPriceRange;

    @Column(name = "restaurantcity")
    public String restaurantCity;

    @Column(name = "openinghours")
    public String openinghours;

    @Column(name = "restaurantrating")
    public int restaurantRating;

    @Column(name = "restaurantimg")
    public String restaurantImg;

    public Restaurant(){}

    public Restaurant(
        Long restaurantId,
        String restaurantName, 
        String restaurantAddress, 
        String restaurantUserName, 
        String restaurantEmail,
        String restaurantPhoneNumber, 
        String restaurantStyle, 
        String restaurantPriceRange,
        String restaurantCity,
        String openinghours,
        int restaurantRating
        ) {
            this.restaurantId = restaurantId;
            this.restaurantName = restaurantName;
            this.restaurantAddress = restaurantAddress;
            this.restaurantUserName = restaurantUserName;
            this.restaurantEmail = restaurantEmail;
            this.restaurantPhoneNumber = restaurantPhoneNumber;
            this.restaurantStyle = restaurantStyle;
            this.restaurantPriceRange = restaurantPriceRange;
            this.restaurantCity = restaurantCity;
            this.openinghours = openinghours;
            this.restaurantRating = restaurantRating;
            this.restaurantImg = null;
    }

    public Restaurant(
            Long restaurantId,
            String restaurantName,
            String restaurantAddress,
            String restaurantUserName,
            String restaurantEmail,
            String restaurantPhoneNumber,
            String restaurantStyle,
            String restaurantPriceRange,
            String restaurantCity,
            String openinghours,
            int restaurantRating,
            String restaurantImg
    ) {
        this.restaurantId = restaurantId;
        this.restaurantName = restaurantName;
        this.restaurantAddress = restaurantAddress;
        this.restaurantUserName = restaurantUserName;
        this.restaurantEmail = restaurantEmail;
        this.restaurantPhoneNumber = restaurantPhoneNumber;
        this.restaurantStyle = restaurantStyle;
        this.restaurantPriceRange = restaurantPriceRange;
        this.restaurantCity = restaurantCity;
        this.openinghours = openinghours;
        this.restaurantRating = restaurantRating;
        this.restaurantImg = restaurantImg;
    }

    public String getRestaurantCity() {
        return restaurantCity;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public void setRestaurantAddress(String restaurantAddress) {
        this.restaurantAddress = restaurantAddress;
    }

    public void setRestaurantUserName(String restaurantUserName) {
        this.restaurantUserName = restaurantUserName;
    }

    public void setRestaurantEmail(String restaurantEmail) {
        this.restaurantEmail = restaurantEmail;
    }

    public void setRestaurantPhoneNumber(String restaurantPhoneNumber) {
        this.restaurantPhoneNumber = restaurantPhoneNumber;
    }

    public void setRestaurantStyle(String restaurantStyle) {
        this.restaurantStyle = restaurantStyle;
    }

    public void setRestaurantPriceRange(String restaurantPriceRange) {
        this.restaurantPriceRange = restaurantPriceRange;
    }

    public void setRestaurantCity(String restaurantCity) {
        this.restaurantCity = restaurantCity;
    }

    public void setOpeninghours(String openinghours) {
        this.openinghours = openinghours;
    }

    public void setRestaurantRating(int restaurantRating) {
        this.restaurantRating = restaurantRating;
    }

    public String getRestaurantImg() {
        return restaurantImg;
    }

    public void setRestaurantImg(String restaurantImg) {
        this.restaurantImg = restaurantImg;
    }
}
