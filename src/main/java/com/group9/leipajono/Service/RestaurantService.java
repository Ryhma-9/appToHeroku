package com.group9.leipajono.Service;

import java.util.List;
import java.util.Arrays;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.repositories.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {
    
    @Autowired
    RestaurantRepository myRestaurantRepository;

    @PostConstruct
    public void init(){
        Restaurant r = myRestaurantRepository.findById(1L).orElse(null);

        if(r != null){
            System.out.println("Restaurants name: " + r.restaurantName);
        } else {
            System.out.println("**************************restaurant null");
        }
    }

    public List<Restaurant> getRestaurants(){
        return myRestaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(Long restaurantId){
        return myRestaurantRepository.findRestaurantByRestaurantId(restaurantId);
    }

    public Restaurant getRestaurantsByUserName(String userName){
        return myRestaurantRepository.findRestaurantByRestaurantUserName(userName);
    }

    public String[] getRestaurantsCities() {
        List<Restaurant> restaurants = getRestaurants();
        String[] cities = new String[restaurants.size()];
        int i = 0;
        for (Restaurant r : restaurants) {
            if (Arrays.asList(cities).contains(r.getRestaurantCity()) == false) {
                cities[i] = (r.getRestaurantCity());
                i++;
            }
        }
        return cities;
    }

    public List<Restaurant> getRestaurantsByCity(String city){
        return myRestaurantRepository.findRestaurantsByRestaurantCity(city);
    }

    public String addNewRestaurant(
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
            try {
                Restaurant r = new Restaurant(
                    myRestaurantRepository.getMaxRestaurantId()+1,
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
                myRestaurantRepository.save(r);
                return "Restaurant added successfully";
            }
            catch (Exception e) {
                return "Restaurant addition failed";
            }        
    }

    public String addNewRestaurantAndPicture(
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
            String restaurantImg) {
            try {
                Restaurant r = new Restaurant(
                    myRestaurantRepository.getMaxRestaurantId()+1,
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
                    restaurantImg
                );
                myRestaurantRepository.save(r);
                return "Restaurant added successfully";
            }
            catch (Exception e) {
                return "Restaurant addition failed";
            }        
    }

    public String editRestaurant(
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
        try {
            Restaurant r = myRestaurantRepository.findRestaurantByRestaurantId(restaurantId);
            r.setRestaurantName(restaurantName);
            r.setRestaurantAddress(restaurantAddress);
            r.setRestaurantUserName(restaurantUserName);
            r.setRestaurantEmail(restaurantEmail);
            r.setRestaurantPhoneNumber(restaurantPhoneNumber);
            r.setRestaurantStyle(restaurantStyle);
            r.setRestaurantPriceRange(restaurantPriceRange);
            r.setRestaurantCity(restaurantCity);
            r.setOpeninghours(openinghours);
            r.setRestaurantRating(restaurantRating);
            myRestaurantRepository.save(r);
            return "Product updated successfully";
        }
        catch (Exception e) {
            return "Product edit failed";
        }        
    }
}
