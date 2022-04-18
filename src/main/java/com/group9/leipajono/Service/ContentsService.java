package com.group9.leipajono.Service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.group9.leipajono.data.Contents;
import com.group9.leipajono.repositories.ContentsRepository;
import org.hibernate.mapping.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContentsService {
    
    @Autowired
    ContentsRepository myContentsRepository;

    // @PostConstruct
    // public void init(){
    //     myContentsRepository.findById(5L).orElse(null);

    //     if(c != null){
    //         System.out.println("Contents ingredients: " + c.ingredients);

    //     } else {
    //         System.out.println("**************************contents null");
    //     }
    // }

    public List<Contents> getContents(){
        return myContentsRepository.findAll();
    }

    public List<Contents> getContentsByProductId(Long productId){
        return myContentsRepository.findByProductId(productId);
    }

    public String addNewContents(Long productId, int energyContent, String ingredients, String description, String[] allergens) {
        try {
            for (int i = 0; i < allergens.length; i++) {
                Contents c = new Contents(productId, energyContent, ingredients, description, allergens[i]);
                myContentsRepository.save(c);
            }
            return "Contents added successfully";
        }
        catch (Exception e){
            return "Contents addition failed";
        }        
    }

    public String editContents(Long productId, int energyContent, String ingredients, String description, String[] allergens) {
        try {
            deleteContentsByProductId(productId);
            for (int i = 0; i < allergens.length; i++) {
                Contents c = new Contents(productId, energyContent, ingredients, description, allergens[i]);
                myContentsRepository.save(c);
            }
            return "Contents updated successfully";
        }
        catch (Exception e){
            return "Contents addition failed";
        }        
    }

    public String deleteContentsByProductId(Long productId) {
        try {
            List<Contents> contents = myContentsRepository.findByProductId(productId);
            myContentsRepository.deleteAll(contents);
            return "Contents removed successfully";
        }
        catch (Exception e){
            return "Contents removal failed";
        }        
    }


}
