package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.Service.PictureService;
import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.Service.RestaurantService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin

@RestController
public class RestaurantRestAPI {
    
    @Autowired
    RestaurantService myRestaurantService;
    @Autowired
    PictureService myPictureService;

    @GetMapping("/restaurants")
    public List<Restaurant> getRestaurants() {
        List<Restaurant> restaurants = myRestaurantService.getRestaurants();
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }
        return restaurants;
    }

    @GetMapping("/restaurantbyid/{id}")
    public Restaurant getRestaurantById(@PathVariable Long id) {
        Restaurant restaurant = myRestaurantService.getRestaurantById(id);
        return restaurant;
    }

    @GetMapping("/restaurantcities")
    public String[] getCities() {
        String[] cities = myRestaurantService.getRestaurantsCities();
        return cities;
    }

    @GetMapping("/restaurantsByCity/{city}")
    public List<Restaurant> getRestaurantsByCity(@PathVariable String city) {
        List<Restaurant> restaurants = myRestaurantService.getRestaurantsByCity(city);
        for (Restaurant r : restaurants) {
            System.out.println("Hei maailma, terveisiä ravintolasta " + r.restaurantName);
        }
        return restaurants;
    }

    @GetMapping("/restaurantsbyusername/{UserName}")
    public Restaurant getRestaurantsByUserName(@PathVariable String UserName) {
        return  myRestaurantService.getRestaurantsByUserName(UserName);


    }

    @PostMapping("/addrestaurant")
    public String addNewRestaurant(
        @RequestParam String restaurantName,
        @RequestParam String restaurantAddress, 
        @RequestParam String restaurantUserName,
        @RequestParam String restaurantEmail,
        @RequestParam String restaurantPhoneNumber, 
        @RequestParam String restaurantStyle, 
        @RequestParam String restaurantPriceRange,
        @RequestParam String restaurantCity,
        @RequestParam String openinghours,
        @RequestParam int restaurantRating) {
            return myRestaurantService.addNewRestaurant(
                restaurantName,
                restaurantAddress, 
                restaurantUserName,
                restaurantEmail,
                restaurantPhoneNumber, 
                restaurantStyle, 
                restaurantPriceRange,
                restaurantCity,
                openinghours,
                restaurantRating
            );
    }

    @PostMapping("/addrestaurantandpicture")
    public String addNewRestaurantAndPicture(
            @RequestParam String restaurantName,
            @RequestParam String restaurantAddress,
            @RequestParam String restaurantUserName,
            @RequestParam String restaurantEmail,
            @RequestParam String restaurantPhoneNumber,
            @RequestParam String restaurantStyle,
            @RequestParam String restaurantPriceRange,
            @RequestParam String restaurantCity,
            @RequestParam String openinghours,
            @RequestParam int restaurantRating,
            @RequestParam("file") MultipartFile file) {
        String imgUrl = myPictureService.postPicture(file);
        if (imgUrl == "Picture upload failed") {
            return imgUrl;
        }
        else {
            return myRestaurantService.addNewRestaurantAndPicture(
                    restaurantName,
                    restaurantAddress,
                    restaurantUserName,
                    restaurantEmail,
                    restaurantPhoneNumber,
                    restaurantStyle,
                    restaurantPriceRange,
                    restaurantCity,
                    openinghours,
                    restaurantRating,
                    imgUrl
            );
        }
    }

    @PutMapping("/editrestaurant")
    public String editRestaurant(
        @RequestParam Long restaurantId,
        @RequestParam String restaurantName,
        @RequestParam String restaurantAddress, 
        @RequestParam String restaurantUserName,
        @RequestParam String restaurantEmail,
        @RequestParam String restaurantPhoneNumber, 
        @RequestParam String restaurantStyle, 
        @RequestParam String restaurantPriceRange,
        @RequestParam String restaurantCity,
        @RequestParam String openinghours,
        @RequestParam int restaurantRating) {
            return myRestaurantService.editRestaurant(
                restaurantId,
                restaurantName,
                restaurantAddress, 
                restaurantUserName,
                restaurantEmail,
                restaurantPhoneNumber, 
                restaurantStyle, 
                restaurantPriceRange,
                restaurantCity,
                openinghours,
                restaurantRating
            );
    }

}
