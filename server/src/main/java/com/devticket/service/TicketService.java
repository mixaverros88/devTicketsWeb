package com.devticket.service;

import java.util.List;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;


/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface TicketService {

    Ticket findById(Long id);

    List<Ticket> findAll();

    Ticket addnew(Ticketrequest ticket);

    void delete(Long id);

    void edit (Ticketrequest ticket,Long id);
}
