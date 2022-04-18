package com.group9.leipajono.repositories;

import java.util.List;
import com.group9.leipajono.data.Orders;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrdersRepository extends JpaRepository<Orders, Long> {
    @Query("SELECT coalesce(max(o.orderNumber), 0) FROM Orders o")
    Long getMaxOrderNumber();
    @Query("SELECT coalesce(max(o.id), 0) FROM Orders o")
    Long getMaxOrderId();
    List<Orders> findOrdersByOrderNumber(Long orderNumber);
    List<Orders> findOrdersByCustomerId(Long customerid);
    List<Orders> findOrdersByCustomerIdAndToBeDelivered(Long customerid, Boolean toBeDelivered);
    List<Orders> findOrdersByRestaurantId(Long restaurantid);
    List<Orders> findOrdersByRestaurantIdAndToBeDelivered(Long restaurantid, Boolean toBeDelivered);
}
