package com.group9.leipajono.Service;

import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import com.cloudinary.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.util.Map;

@Service
public class PictureService {

    public String postPicture(MultipartFile file) {
        Cloudinary c = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "PIILOTETTU, LÖYTYY TEAMSISTA",
                "api_key", "PIILOTETTU, LÖYTYY TEAMSISTA",
                "api_secret", "PIILOTETTU, LÖYTYY TEAMSISTA",
                "secure", true
        ));
        String imageUrl = "";
        try {
            Map m = c.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            imageUrl = (String) m.get("url");
            return imageUrl;
        } catch (Exception e) {
            return "Picture upload failed";
        }
    }
}

