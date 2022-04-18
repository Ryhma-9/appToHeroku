package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Menu;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.Service.MenuService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class MenuRestAPI {

    
    @Autowired
    MenuService myMenuService;

    @GetMapping("/menus")
    public List<Menu> getMenus() {
        List<Menu> menu = myMenuService.getMenus();
        for (Menu m : menu) {
            System.out.println("Maistuis varmaan sullekkin! " + m);
        }
        return menu;
    }
    
    @GetMapping("/menubyrestaurantid/{id}")
    public List<Menu> getMenuByRestaurantId(@PathVariable long id) {
        List<Menu> Menu = myMenuService.getMenuByRestaurantId(id);
        return Menu;
    }

    @GetMapping("/menuitemsbyrestaurantid/{id}")
    public List<MenuItem> getMenuItemsByRestaurantId(@PathVariable long id) {
        List<MenuItem> Menu = myMenuService.getMenuItemsByRestaurantId(id);
        return Menu;
    }

    @PostMapping("addmenu")
    public String addNewMenu(
        @RequestParam Long restaurantId) {
            return myMenuService.addNewMenu(restaurantId);
    }

    @PostMapping("addproducttomenu")
    public String addProductToMenu(
        @RequestParam Long restaurantId,
        @RequestParam Long productId,
        @RequestParam Long menuNumber) {
            return myMenuService.addProductToMenu(restaurantId, productId, menuNumber);
    }

    @PutMapping("removeproductfrommenu")
    public String removeProductFromMenu(
        @RequestParam Long restaurantId,
        @RequestParam Long productId,
        @RequestParam Long menuNumber) {
            return myMenuService.removeProductFromMenu(restaurantId, productId, menuNumber);
    }

    @PutMapping("removemenufromproduct")
    public String removeMenuFromProduct(
        @RequestParam Long restaurantId,
        @RequestParam Long productId,
        @RequestParam Long menuNumber) {
            return myMenuService.removeMenuFromProduct(restaurantId, productId, menuNumber);
    }

}
