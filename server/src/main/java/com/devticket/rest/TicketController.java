package com.devticket.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.devticket.model.ticket.Cart;
import com.devticket.model.ticket.CartItem;
import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import static org.springframework.web.bind.annotation.RequestMethod.*;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

@RestController
@CrossOrigin(origins = "http://localhost:4200" , allowedHeaders ="*")
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketController {

    @Autowired

    private TicketService ticketService;


    @RequestMapping(method = GET, value = "/ticket/{ticketId}")
    public Ticket loadById(@PathVariable Long ticketId) {
        return this.ticketService.findById(ticketId);
    }


    @RequestMapping(method = GET, value = "/ticket/all")
    public List<Ticket> loadAll() {
        return this.ticketService.findAll();
    }

    @RequestMapping(method = DELETE, value = "/ticket/delete/{ticketId}")
    public ResponseEntity<?> delete(@PathVariable Long ticketId) {

        this.ticketService.delete(ticketId);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }

    @RequestMapping(method = POST, value = "/ticket/add")
    public ResponseEntity<?> addUser(@RequestBody Ticketrequest ticketrequest) {
        //Ticket ticket = this.ticketService.addnew(ticketrequest);
        this.ticketService.addnew(ticketrequest);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }

    @RequestMapping(method = PUT, value = "/ticket/edit/{ticketid}")
    public ResponseEntity<?> edit(@RequestBody Ticketrequest ticketrequest, @PathVariable Long ticketid) {
        this.ticketService.edit(ticketrequest, ticketid);
        Map<String, String> result = new HashMap<>();
        result.put("result", "success");
        return ResponseEntity.accepted().body(result);
    }


    @Scope("session")
    @RequestMapping(value = "/addcart/{id}", method = RequestMethod.GET)
    public Object addtoCart(@PathVariable("id") Long id, HttpServletRequest request, HttpSession session) {

        if (session.getAttribute("cart") == null) {
            Cart cart = new Cart();
            CartItem item = new CartItem();
            item.setProduct(ticketService.findById(id));
            item.setItemQuantity(1);
            cart.getCart().add(item);
            System.out.println("added one");
            cart.setTotalPrice((float) (cart.getTotalPrice() + item.getTicket().getPrice()));
            session.setAttribute("cart", cart);


            return session.getAttribute("cart");

        } else {
            boolean found = false;
            Cart cart = (Cart) session.getAttribute("cart");
            CartItem item = new CartItem();
            item.setProduct(ticketService.findById(id));
            int cartSize = cart.getCart().size();
            for (int i = 0; i < cartSize; i++) {


                if (ticketService.findById(id).getId().equals(cart.getCart().get(i).getTicket().getId()) && !found) {

                    System.out.println("UPARXEI HDH");
                    int newQuan = cart.getCart().get(i).getItemQuantity() + 1;
                    item.setItemQuantity(newQuan);
                    cart.getCart().set(i, item);
                    cart.setTotalPrice((float) (cart.getTotalPrice() + item.getTicket().getPrice()));

                    session.setAttribute("cart", cart);
                    found = true;


                }
            }
            if (!found) {

                System.out.printf("DEN UPARXEI HDH");
                item.setProduct(ticketService.findById(id));
                item.setItemQuantity(1);
                cart.getCart().add(item);
                cart.setTotalPrice((float) (cart.getTotalPrice() + item.getTicket().getPrice()));
                session.setAttribute("cart", cart);

            }


            return cart;
        }

    }

    @Scope("session")
    @RequestMapping(value="/deletecartitem/{id}" , method = RequestMethod.GET)
    public Cart deleteCartItem(@PathVariable("id") Long id, HttpServletRequest request, HttpSession session) {

        Cart cart = (Cart) session.getAttribute("cart");
        int cartSize = cart.getCart().size();
        for (int i = 0; i < cartSize; i++) {


            if (id.equals(cart.getCart().get(i).getTicket().getId())) {

                int Quan = cart.getCart().get(i).getItemQuantity();

                if (Quan > 1) {

                    cart.getCart().get(i).setItemQuantity(Quan - 1);
                    cart.setTotalPrice((float) (cart.getTotalPrice() - cart.getCart().get(i).getTicket().getId()));
                } else if (Quan == 1) {
                    cart.setTotalPrice((float) (cart.getTotalPrice() - cart.getCart().get(i).getTicket().getPrice()));
                    cart.getCart().remove(i);


                }
            }
        }
        return cart;
    }
}



