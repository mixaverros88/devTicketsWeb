package com.devticket.rest;

import com.devticket.model.cart.Cart;
import com.devticket.model.order.Orders;
import com.devticket.service.CheckOutService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

@RestController
@CrossOrigin
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

    @Autowired

    private CheckOutService checkOutService;


    @RequestMapping(value = "/checkout/{id}", method = RequestMethod.POST)
    public ResponseEntity<Orders> addtoCart(@PathVariable("id") Long id, @RequestBody Cart cart) {

        Calendar cal = Calendar.getInstance();
        Orders order = new Orders();
        order.setDate(cal);
        order.setTotalPrice(cart.getTotalPrice());
        order.setUserId(id);
        Gson gson = new Gson();
        String json = gson.toJson(cart);
        order.setCart(json);
        checkOutService.save(order);
        return new ResponseEntity<Orders>(order, HttpStatus.OK);

    }

    @RequestMapping(method = GET , value = "/numberoforders")
            public int numberofOrders(){
           return this.checkOutService.findAll();

            }


    @RequestMapping(method = GET, value = "/myorders/{id}")
    public List<Orders> loadAll(@PathVariable("id") Long id) {
        return this.checkOutService.findByUserId(id);

    }


    @RequestMapping(method = GET, value = "/myorders/getorder/{id}")
    public ResponseEntity<Cart> findById(@PathVariable("id") Long id) {
        Orders order = this.checkOutService.findById(id);
        Gson gson = new Gson();
        Cart cart = gson.fromJson(order.getCart(), Cart.class);
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }


}
