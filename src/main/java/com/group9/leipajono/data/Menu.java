package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="menu")
public class Menu {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="menuid")
    public Long menuId;

    @Column(name="restaurantid")
    public Long restaurantId;

    @Column(name="productid")
    public Long productId;

    @Column(name = "menunumber")
    public Long menuNumber;

    Menu(){};

    public Menu(
        Long restaurantId,
        Long productId,
        Long menuNumber
    ){
            this.restaurantId = restaurantId;
            this.productId = productId;
            this.menuNumber = menuNumber;
    }

    public Menu(
        Long restaurantId,
        Long menuNumber
    ){
            this.restaurantId = restaurantId;
            this.productId = null;
            this.menuNumber = menuNumber;
    }


    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public void setMenuNumber(Long menuNumber) {
        this.menuNumber = menuNumber;
    }
}
