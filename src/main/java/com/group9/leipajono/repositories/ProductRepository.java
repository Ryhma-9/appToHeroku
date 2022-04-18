package com.group9.leipajono.repositories;

import com.group9.leipajono.data.Product;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findByProductId(long productId);

    // En saa toimimaan! but hole!
    @Query("SELECT p FROM Product p JOIN Menu m ON p.productId = m.productId WHERE m.restaurantId = :id")
    List<Product> findProductsByRestaurantId(@Param("id") Long id);
    //

    @Query("SELECT coalesce(max(p.id), 0) FROM Product p")
    Long getMaxProductId();
}


