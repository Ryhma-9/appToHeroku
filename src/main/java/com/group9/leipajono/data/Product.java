package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

//import com.group9.leipajono.enums.Types_enum;

@Entity
@Table(name="product")
public class Product {
    
    @Id
    @Column(name="productid")
    public Long productId;

    @Column(name="productname")
    public String productName;

    @Column(name="price")
    public Double price;

    @Column(name="type")
    public String type;
    // public Types_enum type;

    @Column(name="productimg")
    public String productImg;


    public Product(){}

    public Product(
        Long productId,
        String productName,
        Double price,
        String type
        // Types_enum type
    ){
            this.productId = productId;
            this.productName = productName;
            this.price = price;
            this.type = type;
            this.productImg = null;
    }

    public Product(
            Long productId,
            String productName,
            Double price,
            String type,
            // Types_enum type
            String productImg
    ){
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.type = type;
        this.productImg = productImg;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }
}
