package com.devticket.rest;

import com.devticket.client.QuoteClient;
import com.devticket.model.cart.Cart;
import com.devticket.model.cart.CartItem;
import com.devticket.service.TicketService;
import hello.wsdl.CheckVatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


@RestController
@CrossOrigin
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class afmcontroller {
    @Autowired

    private QuoteClient greetingClient;

    @RequestMapping(method = GET, value = "/afm/{id}")
    public String loadAl(@PathVariable String id){
        System.out.println(id);
        CheckVatResponse response = greetingClient.getBeer(id);
        System.out.println("zitises auto " + response.getAddress().getValue());
        return response.getName().getValue();
    }
}