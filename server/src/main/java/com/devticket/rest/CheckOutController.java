package com.devticket.rest;

import com.devticket.model.cart.Cart;
import com.devticket.model.cart.CartItem;
import com.devticket.model.order.Orders;
import com.devticket.service.CheckOutService;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

@RestController
@CrossOrigin
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CheckOutController {

    @Autowired

    private CheckOutService checkOutService;


    @RequestMapping(value = "/checkout/{id}", method = RequestMethod.POST)
    public void addtoCart(@PathVariable("id") Long id, @RequestBody Cart cart) {
        //DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Calendar cal = Calendar.getInstance();
        Orders order = new Orders();
        order.setDate(cal);
        order.setTotalPrice(cart.getTotalPrice());
        order.setUserId(id);
        checkOutService.save(order);


    }
}
