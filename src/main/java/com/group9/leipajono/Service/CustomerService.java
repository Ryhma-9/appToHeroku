package com.group9.leipajono.Service;

import com.group9.leipajono.data.Customer;
import com.group9.leipajono.data.Restaurant;
import com.group9.leipajono.repositories.CustomerRepository;
import com.group9.leipajono.security.PasswordEncoder;
import com.group9.leipajono.enums.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class CustomerService extends PasswordEncoder {
    @Autowired
    CustomerRepository customerRepo;

    public String findCustomerByName(String userName){
        String result = customerRepo.findCustomerByName(userName);
        return result;
    }

    public Customer getCustomerById(Long userId){
        return customerRepo.findByUserId(userId);
    }

    public Integer createCustomer(String userNameInput, String passwordInput, String emailInput, String addressInput, String firstNameInput, String lastNameInput, String roleInput, String phoneNumberInput){
        if (roleInput.equals("admin")){
            Random r = new Random();
            Customer c = new Customer(1300L ,firstNameInput, lastNameInput, addressInput, emailInput, phoneNumberInput, userNameInput, passwordEncoder(passwordInput), Role.ADMIN);
            try{
                customerRepo.save(c);
                System.out.println("Uuden ADMININ lisäys onnistui");
                return 1;
            }catch(Error e){
                System.out.println("Uuden ADMININ lisäys ei onnistunut");
                return 0;
            }
        }
        else if (roleInput.equals("restaurant")){
            Customer c = new Customer(1600L, firstNameInput, lastNameInput, addressInput, emailInput, phoneNumberInput, userNameInput, passwordEncoder(passwordInput), Role.RESTAURANT);
            try{
                customerRepo.save(c);
                System.out.println("Uuden RESTAURANTIN lisäys onnistui");
                return 1;
            }catch(Error e){
                System.out.println("Uuden RESTAURANTIN lisäys ei onnistunut");
                return 0;
            }
        }
        else if (roleInput.equals("customer")){
            Customer c = new Customer(1500L, firstNameInput, lastNameInput, addressInput, emailInput, phoneNumberInput, userNameInput, passwordEncoder(passwordInput), Role.CUSTOMER);
            try{
                customerRepo.save(c);
                System.out.println("Uuden CUSTOMERIN lisäys onnistui");
                return 1;
            }catch(Error e){
                System.out.println("Uuden CUSTOMERIN lisäys ei onnistunut");
                return 0;
            }
        }
        else { System.out.println("Minkään roolin lisäys ei onnistunut"); return 0; }

    }
    public List<Customer> getCustomers(){
        return customerRepo.findAll();
    } 
    public Customer getCustomer(String userName){
        Customer c = customerRepo.findById(userName).orElse(null);
        return c;
    }
    public Map<String, Object> getCustomCustomer(String userName){
        Customer c = this.getCustomer(userName);
        Map<String, Object> json = new HashMap<>();
        json.put("username", c.userName);
        json.put("firstname", c.firstName);
        return json;
    }
}
