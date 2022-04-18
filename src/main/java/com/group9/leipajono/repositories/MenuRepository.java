package com.group9.leipajono.repositories;

import java.util.List;

import com.group9.leipajono.data.Menu;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
    List<Menu> findByRestaurantId(long restaurantId);
    List<Menu> findByMenuNumber(long menuNumber);
    @Query("SELECT coalesce(max(m.menuNumber), 0) FROM Menu m")
    Long getMaxMenuNumber();
    Menu findMenuByRestaurantIdAndProductIdAndMenuNumber(Long restaurantId, Long productId, Long menuNumber);
}
