package com.devticket.rest;

import com.devticket.model.cart.Cart;
import com.devticket.model.order.Orders;
import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.repository.TicketRepository;
import com.devticket.service.CheckOutService;
import com.devticket.service.TicketService;
import com.google.gson.Gson;
import com.sun.corba.se.impl.oa.toa.TOAImpl;
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

    @Autowired

    private TicketService ticketservice;
    private TicketRepository ticketRepository;


    @RequestMapping(value = "/checkout/{id}", method = RequestMethod.POST)
    public ResponseEntity<Orders> addtoCart(@PathVariable("id") Long id, @RequestBody Cart cart) {

        Calendar cal = Calendar.getInstance();
        Orders order = new Orders();
        order.setDate(cal);
        order.setTotalPrice(cart.getTotalPrice());
        order.setUserId(id);
        //TO REDUCE PRODUCT QUANTITY AFTER CHECKOUT
        for(int i=0; i<cart.getCart().size(); i++){

            long editId = cart.getCart().get(i).getTicket().getId();
            System.out.println("im editing"+ editId);
            Ticket ticket = cart.getCart().get(i).getTicket();
            Ticketrequest toEdit = new Ticketrequest();
            toEdit.setDate(ticket.getDate());
            toEdit.setName(ticket.getName());
            toEdit.setLocation(ticket.getLocation());
            toEdit.setLanguage(ticket.getLanguage());
            toEdit.setImage(ticket.getImage());
            toEdit.setPrice(ticket.getPrice());
            toEdit.setAvailable(ticket.getAvailable()- cart.getCart().get(i).getItemQuantity());
           this.ticketservice.edit(toEdit,editId);

        }
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
