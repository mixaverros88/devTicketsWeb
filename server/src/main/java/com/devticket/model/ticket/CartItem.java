package com.devticket.model.ticket;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;


    @Component
    @Scope("session")
    public class CartItem {


        private Ticket ticket;
        private int itemQuantity;

        public Ticket getTicket() {

            return ticket;
        }

        public void setProduct(Ticket ticket) {

            this.ticket = ticket;
        }

        public int getItemQuantity() {
            return itemQuantity;
        }

        public void setItemQuantity(int itemQuantity) {
            this.itemQuantity = itemQuantity;
        }
    }