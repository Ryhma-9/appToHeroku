package com.group9.leipajono.Service;

import java.util.List;
import java.util.ArrayList;
import javax.annotation.PostConstruct;
import com.group9.leipajono.data.Menu;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.repositories.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
  @Autowired
  MenuRepository myMenuRepository;
  @Autowired
  ProductService myProductService;

  @PostConstruct
  public void init(){
    Menu m = myMenuRepository.findById(5L).orElse(null);
    if(m != null){
      System.out.println(m.menuId + " " + m.restaurantId + " " + m.productId);
    } else {
      System.out.println("**************************menu null");
    }
  }

  public List<Menu> getMenus() {
    return myMenuRepository.findAll();
  }

  public Long[] listProducts(List<Menu> menu) {
    Long[] products = new Long[menu.size()];
    int i = 0;
    for (Menu m : menu) {
      products[i] = m.getProductId();
    }
    return products;
  }

  public Long[] getProductsByMenuNumber(Long menuNumber) {
    return listProducts(myMenuRepository.findByMenuNumber(menuNumber));
  }

  public Long[] getProductsByRestaurantId(Long restaurantId) {
    return listProducts(myMenuRepository.findByRestaurantId(restaurantId));
  }

  public List<Menu> getMenuByRestaurantId(long id) {
    return myMenuRepository.findByRestaurantId(id);
  }

  public List<MenuItem> getMenuItemsByRestaurantId(long id) {
    List<MenuItem> menuItems = new ArrayList<>();
    List<Menu> menu = myMenuRepository.findByRestaurantId(id);
    for (Menu m : menu) {
      menuItems.add(myProductService.getProductAndContentsById(m.getProductId()));
    }
    return menuItems;
  }

  public String addNewMenu(Long restaurantId){
    try {
        Menu m = new Menu(restaurantId, myMenuRepository.getMaxMenuNumber()+1);
        myMenuRepository.save(m);
        return "Menu added successfully";
    }
    catch (Exception e) {
        return "Menu addition failed";
    }        
  }

  public String addProductToMenu(Long restaurantId, Long productId, Long menuNumber){
    try {
        Menu m = new Menu(restaurantId, productId, menuNumber);
        myMenuRepository.save(m);
        return "Product added to menu successfully";
    }
    catch (Exception e) {
        return "Product addition failed";
    }        
  }
  
  // Näitä on nyt kaks erilaista kun en tiiä vielä millanen toteutus tulee olemaan
  public String removeProductFromMenu(Long restaurantId, Long productId, Long menuNumber){
    try {
        Menu m = myMenuRepository.findMenuByRestaurantIdAndProductIdAndMenuNumber(restaurantId, productId, menuNumber);
        m.setProductId(null);
        myMenuRepository.save(m);
        return "Product removed from the menu successfully";
    }
    catch (Exception e) {
        return "Product removal failed";
    }        
  }
  public String removeMenuFromProduct(Long restaurantId, Long productId, Long menuNumber){
    try {
        Menu m = myMenuRepository.findMenuByRestaurantIdAndProductIdAndMenuNumber(restaurantId, productId, menuNumber);
        m.setMenuNumber(null);
        myMenuRepository.save(m);
        return "Menu removed from the product successfully";
    }
    catch (Exception e) {
        return "Menu removal failed";
    }        
  }
  
}
