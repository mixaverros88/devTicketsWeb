package com.devticket.rest;

import com.devticket.model.user.User;
import com.devticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.devticket.model.user.UserRequest;
import com.devticket.service.UserService;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

@RestController
@RequestMapping( value = "/api", produces = MediaType.APPLICATION_JSON_VALUE )
public class PublicController {


    @Autowired
    private UserService userService;

    @RequestMapping( method = GET, value= "/foo")
    public User getFoo() {
        User fooObj = new User();
        fooObj = userService.findById(1L);

        return fooObj;
    }

}
