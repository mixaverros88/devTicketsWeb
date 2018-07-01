package com.devticket.service;

import java.util.List;

import com.devticket.model.order.Orders;
import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;


/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface CheckOutService {
    Orders findById(Long id);

    void save(Orders order);

    List<Orders> findByUserId(Long id);

}
