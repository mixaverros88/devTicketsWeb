package com.devticket.service;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;


/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface TicketService {

    Ticket findById(Long id);

    List<Ticket> findAll();

    Page<Ticket> findPaginated(int page, int size, Sort sotby);

    Ticket addnew(Ticketrequest ticket);

    void delete(Long id);

    void edit(Ticketrequest ticket, Long id);
}
