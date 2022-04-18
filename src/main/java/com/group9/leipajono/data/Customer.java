package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Table;

import com.group9.leipajono.enums.Role;

@Entity
@Table(name = "users")
public class Customer {
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    public Long userId;
    // public Long count = 2L;

    @Column(name = "firstname")
    public String firstName;
    
    @Column(name = "lastname")
    public String lastName;
    
    @Column(name = "addr")
    public String address;
    
    @Column(name = "email")
    public String email;
    
    @Column(name = "phonenumber")
    public String phoneNumber;
    
    @Id
    @Column(name = "username")
    public String userName;

    @Column(name = "password")
    public String password;

    @Column(name = "role")
    @Enumerated(EnumType.STRING)
    public Role role;

    public Customer(
        Long userId,
        String firstName, 
        String lastName, 
        String address, 
        String email, 
        String phoneNumber, 
        String userName, 
        String password, 
        Role role) 
    {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    public Customer(
        String firstName, 
        String lastName, 
        String address, 
        String email, 
        String phoneNumber, 
        String userName, 
        String password, 
        Role role) 
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.role = role;
    }

    public Customer() {
    }

    public String getFirstName() {
        return this.firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
