package com.group9.leipajono.data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

// import com.group9.leipajono.enums.Allergens_enum;

@Entity
@Table(name = "contents")
public class Contents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contentsid")
    public Long contentsId;
    
    @Column(name="productid")
    public Long productId;

    @Column(name="energycontents")
    public int energyContents;

    @Column(name="ingredients")
    public String ingredients;

    @Column(name="description")
    public String description;

    @Column(name="allergens")
    public String allergens;

    Contents(){};

    public Contents(
        //Long contentsId,
        Long productId,
        int energyContents,
        String ingredients,
        String description,
        String allergens
    ) {
            //this.contentsId = contentsId;
            this.productId = productId;
            this.energyContents = energyContents;
            this.ingredients = ingredients;
            this.description = description;
            this.allergens = allergens;
    }

    public int getEnergyContents() {
        return energyContents;
    }

    public String getIngredients() {
        return ingredients;
    }

    public String getDescription() {
        return description;
    }

    public String getAllergens() {
        return allergens;
    }
}
