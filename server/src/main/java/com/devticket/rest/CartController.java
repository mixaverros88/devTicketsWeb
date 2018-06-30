package com.devticket.rest;

import com.devticket.model.cart.Cart;
import com.devticket.model.cart.CartItem;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class CartController {

    @Autowired

    private TicketService ticketService;


    @RequestMapping(value = "/addcart/{id}", method = RequestMethod.POST)
    public ResponseEntity<Cart> addtoCart(@PathVariable("id") Long id, @RequestBody Cart cart) {

        // Read more: http://www.java67.com/2016/10/3-ways-to-convert-string-to-json-object-in-java.html#ixzz5JMN1wfKQ
        if (cart.getTotalPrice() == 0) {
            System.out.println("einai miden");
            cart = new Cart();
            CartItem item = new CartItem();
            item.setProduct(ticketService.findById(id));
            item.setItemQuantity(1);
            cart.getCart().add(item);
            System.out.println("added one");
            cart.setTotalPrice((float) (cart.getTotalPrice() + item.getTicket().getPrice()));

            return new ResponseEntity<Cart>(cart, HttpStatus.OK);


        } else {
            boolean found = false;
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
                    found = true;


                }
            }
            if (!found) {

                System.out.printf("DEN UPARXEI HDH");
                item.setProduct(ticketService.findById(id));
                item.setItemQuantity(1);
                cart.getCart().add(item);
                cart.setTotalPrice((float) (cart.getTotalPrice() + item.getTicket().getPrice()));


            }


            return new ResponseEntity<Cart>(cart, HttpStatus.OK);

        }

    }

    @RequestMapping(value = "/deletecartitem/{id}", method = RequestMethod.POST)
    public ResponseEntity<Cart> deleteCartItem(@PathVariable("id") Long id, @RequestBody Cart cart) {

        int cartSize = cart.getCart().size();
        for (int i = 0; i < cartSize; i++) {
            if (cart.getCart().get(i).getTicket() != null) {
                if (id.equals(cart.getCart().get(i).getTicket().getId())) {
                    int Quan = cart.getCart().get(i).getItemQuantity();
                    if (Quan > 1) {
                        cart.getCart().get(i).setItemQuantity(Quan - 1);
                        cart.setTotalPrice((float) (cart.getTotalPrice() - cart.getCart().get(i).getTicket().getPrice()));
                        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
                    } else if (Quan == 1) {
                        cart.setTotalPrice((float) (cart.getTotalPrice() - cart.getCart().get(i).getTicket().getPrice()));
                        cart.getCart().remove(i);
                        return new ResponseEntity<Cart>(cart, HttpStatus.OK);

                    }
                }
            }
        }

        return new ResponseEntity<Cart>(cart, HttpStatus.INTERNAL_SERVER_ERROR);
    }


}

