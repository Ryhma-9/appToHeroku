package com.group9.leipajono.controllers;

import java.util.List;
import java.util.Map;
import com.group9.leipajono.Service.CustomerService;
import com.group9.leipajono.data.Customer;
import com.group9.leipajono.data.Product;
import com.group9.leipajono.enums.Role;
import com.group9.leipajono.security.CustomerSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class CustomerRestAPI {
    @Autowired
    CustomerService customerService;
    @Autowired
    CustomerSecurityService customerSecurity;
    
    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> login(@RequestBody Map<String, String> credentials){
        String token = customerSecurity.checkAuthentication(
            credentials.get("username"),
            credentials.get("password"));

        if(token == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }
    @PostMapping("/loginbasic")
    public ResponseEntity<Map<String,String>> loginBasic(@RequestHeader("authorization") String basicAuthHeader){
        String token = customerSecurity.checkBasicAuthentication(basicAuthHeader);

        if(token == null){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    
        return new ResponseEntity<>(Map.of("token", token), HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<Map<String,String>> signup(@RequestBody Map<String,String> credentials){
        Integer responseInteger = customerService.createCustomer(
            
            credentials.get("userName"),
            credentials.get("password"),
            credentials.get("email"),
            credentials.get("address"),
            credentials.get("firstName"),
            credentials.get("lastName"),
            credentials.get("role"),
            credentials.get("phoneNumber")
            );
        System.out.println(credentials);

        if(responseInteger == 0){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else if(responseInteger == 1){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
    }
    @GetMapping("/private")
    public ResponseEntity<Customer> getPrivate(@RequestHeader("authorization") String bearer){
        Customer custo = customerSecurity.validateBearerToken(bearer);
        System.out.println("tultiin privaattiin alueeseen");
        if (custo.role == Role.ADMIN || custo.role == Role.RESTAURANT){
            return new ResponseEntity<>(custo, HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/userbyid/{id}")
    public Customer getCustomerById(@PathVariable long id) {
        return customerService.getCustomerById(id);

    }

    @GetMapping("/customers")
    public Map<String, Object> getCustomers(){
        return customerService.getCustomCustomer("sheppomies2");
    }
}