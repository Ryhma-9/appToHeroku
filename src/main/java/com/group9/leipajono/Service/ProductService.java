package com.group9.leipajono.Service;

import javax.annotation.PostConstruct;

import java.util.List;
import java.util.ArrayList;
import com.group9.leipajono.data.Product;
import com.group9.leipajono.data.Contents;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.Service.MenuService;
import com.group9.leipajono.repositories.ProductRepository;
import com.group9.leipajono.repositories.ContentsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class ProductService {
    
    @Autowired
    ProductRepository myProductRepository;
    @Autowired
    ContentsRepository myContentsRepository;
    MenuService myMenuService;

    @PostConstruct
    public void init(){
        Product p = myProductRepository.findById(8L).orElse(null);
        if(p != null){
            System.out.println("Product name: " + p.productName);
        } else {
            System.out.println("**************************product null");
        }
    }

    public Long getLastProductId() {
        return myProductRepository.getMaxProductId();
    }

    public List<Product> getProducts() {
        return myProductRepository.findAll();
    }

    /* Tää ei jostain syystä suostu toimimaan
    public List<Product> getProductsByRestaurantId(Long restaurantId){
        return myProductRepository.findProductsByRestaurantId(restaurantId);
    }
    */
    // Tässtä sit vastaavaa, mut purkkaviritelmänä
    public List<Product> idsToProductList(Long[] productIds){
        List<Product> products = new ArrayList<>();
        for (int i = 0; i < productIds.length; i++) {
            Product p = myProductRepository.findByProductId(productIds[i]);
            products.add(p);
        }
        return products;
    }
    public List<Product> getProductsByRestaurantId(Long restaurantId){
        return idsToProductList(myMenuService.getProductsByRestaurantId(restaurantId));
    }
    public List<Product> getProductsByMenuNumber(Long menuNumber){
        return idsToProductList(myMenuService.getProductsByMenuNumber(menuNumber));
    }

    public MenuItem getProductAndContentsById(long id) {
        Product p = myProductRepository.findByProductId(id);
        MenuItem mi = new MenuItem(id, p.getProductName(), p.getPrice(), p.getType(), p.getProductImg());
        List<Contents> contents = myContentsRepository.findByProductId(id);
        String[] allergens = new String[contents.size()];
        int i = 0;
        for (Contents c : contents) {
            if (mi.getEnergyContent() == -1) {
                mi.setEnergyContent(c.getEnergyContents());
            }
            if (mi.getDescription() == "initialized") {
                mi.setDescription(c.getDescription());
            }
            if (mi.getIngredients() == "initialized") {
                mi.setIngredients(c.getIngredients());
            }
            allergens[i] = (c.getAllergens());
            i++;
        }
        mi.setAllergens(allergens);
        return mi;
    }

    public List<MenuItem> getProductsAndContentsByIds(Long[] productIds) {
        List<MenuItem> products = new ArrayList<>();
        for (int i = 0; i < productIds.length; i++) {
            products.add(getProductAndContentsById(productIds[i]));
        }
        return products;
    }

    public String addNewProduct(String productName, Double price, String type) {
        try {
            Product p = new Product(myProductRepository.getMaxProductId()+1, productName, price, type);
            myProductRepository.save(p);
            return "Product added successfully";
        }
        catch (Exception e) {
            return "Product addition failed";
        }        
    }

    public String addNewProduct2(String productName, Double price, String type, String imgUrl) {
        try {
            Product p = new Product(myProductRepository.getMaxProductId()+1, productName, price, type, imgUrl);
            myProductRepository.save(p);
            return "Product added successfully";
        }
        catch (Exception e) {
            return "Product addition failed";
        }
    }

    public String editProduct(Long productId, String productName, Double price, String type) {
        try {
            Product productToEdit = myProductRepository.findByProductId(productId);
            productToEdit.setProductName(productName);
            productToEdit.setPrice(price);
            productToEdit.setType(type);
            myProductRepository.save(productToEdit);
            return "Product updated successfully";
        }
        catch (Exception e) {
            return "Product edit failed";
        }        
    }

    public String deleteContentsByProductId(Long productId) {
        try {
            Product p =  myProductRepository.findByProductId(productId);
            myProductRepository.delete(p);
            return "Product removed successfully";
        }
        catch (Exception e){
            return "Product removal failed";
        }        
    }
}
