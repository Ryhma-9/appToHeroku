package com.group9.leipajono.data;

public class MenuItem {
    private Long productId;
    private String productName;
    private double price;
    private String[] allergens;
    private String ingredients;
    private int energyContent;
    private String description;
    private String type;
    private String productImg;

    public MenuItem(
        Long productId,
        String productName,
        double price,
        String[] allergens,
        String ingredients,
        int energyContent,
        String description,
        String type,
        String productImg
    ) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.allergens = allergens;
        this.ingredients = ingredients;
        this.energyContent = energyContent;
        this.description = description;
        this.type = type;
        this.productImg = productImg;
    }
    public MenuItem() {
    }

    public MenuItem(
        Long productId,
        String productName,
        double price,
        String type,
        String productImg
    ) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.allergens = new String[0];
        this.ingredients = "initialized";
        this.energyContent = -1;
        this.description = "initialized";
        this.type = type;
        this.productImg = productImg;
    }
/*
    public MenuItem(
            Long productId,
            String productName,
            double price,
            String type
    ) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.allergens = new String[0];
        this.ingredients = "initialized";
        this.energyContent = -1;
        this.description = "initialized";
        this.type = type;
        this.productImg = null;
    }*/

    public Long getProductId() {
        return productId;
    }

    public String getProductName() {
        return productName;
    }

    public double getPrice() {
        return price;
    }

    public String[] getAllergens() {
        return allergens;
    }

    public void setAllergens(String[] allergens) {
        this.allergens = allergens;
    }
    
    public String getIngredients() {
        return ingredients;
    }

    public void setIngredients(String ingredients) {
        this.ingredients = ingredients;
    }

    public int getEnergyContent() {
        return energyContent;
    }

    public void setEnergyContent(int energyContent) {
        this.energyContent = energyContent;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public String getProductImg() {
        return productImg;
    }

    public void setProductImg(String productImg) {
        this.productImg = productImg;
    }
}
