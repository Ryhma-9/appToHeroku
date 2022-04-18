package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Restaurant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    Restaurant findRestaurantByRestaurantId(Long restaurantId);
    List<Restaurant> findRestaurantsByRestaurantCity(String restaurantCity);
    @Query("SELECT coalesce(max(r.restaurantId), 0) FROM Restaurant r")
    Long getMaxRestaurantId();
    Restaurant findRestaurantByRestaurantUserName(String userName);
}
