package com.group9.leipajono.repositories;

import java.util.List;

import com.group9.leipajono.data.Customer;

import com.group9.leipajono.data.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
@Repository
public interface CustomerRepository extends JpaRepository<Customer, String>{
    
    @Query(value = "SELECT userid FROM users WHERE username = ?1", nativeQuery = true)
    public String findCustomerByName(String username);
    Customer findByUserId(long userId);
}
