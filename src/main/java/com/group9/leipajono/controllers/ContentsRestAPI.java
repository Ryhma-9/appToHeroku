package com.group9.leipajono.controllers;

import java.util.List;

import com.group9.leipajono.data.Contents;
import com.group9.leipajono.data.MenuItem;
import com.group9.leipajono.Service.ContentsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ContentsRestAPI {

    @Autowired
    ContentsService myContentsService;

    @GetMapping("/contents")
    public List<Contents> getContents() {
        List<Contents> contents = myContentsService.getContents();
        return contents;
    }

    @GetMapping("/contentsbyproductid/{id}")
    public List<Contents> getContentsByProductId(@PathVariable long id) {
        List<Contents> contents = myContentsService.getContentsByProductId(id);
        return contents;
    }

    @PostMapping("/addcontets")
    public String addNewContens(
        @RequestParam Long productId,
        @RequestParam int energyContent,
        @RequestParam String ingredients,
        @RequestParam  String description,
        @RequestParam String[] allergens) {
            String response = myContentsService.addNewContents(
                productId,
                energyContent,
                ingredients,
                description,
                allergens
            );
            return response;
    }

    @PutMapping("/editcontets")
    public String editContents(
        @RequestParam Long productId,
        @RequestParam int energyContent,
        @RequestParam String ingredients,
        @RequestParam  String description,
        @RequestParam String[] allergens) {
            String response = myContentsService.editContents(
                productId,
                energyContent,
                ingredients,
                description,
                allergens
            );
            return response;
    }

    @DeleteMapping("/deletecontentsbyproductid/{id}")
    public String deleteContentsByProductId(@PathVariable long id) {
        return myContentsService.deleteContentsByProductId(id);
    }

}
