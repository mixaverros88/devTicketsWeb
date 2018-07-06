package com.devticket.service.impl;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.repository.TicketRepository;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */


@Service
public class TicketServiceImpl implements TicketService {

    @Autowired
    TicketService ticketService;


    @Autowired
    private TicketRepository ticketRepository;

    @PreAuthorize("hasRole('USER')")
    public Ticket findById(Long id) throws AccessDeniedException {
        Ticket ticket = ticketRepository.findByid(id);
        return ticket;
    }

    @Override
    public Page<Ticket> findPaginated(int page, int size) {
       Page<Ticket>  tee = ticketRepository.findAll(new PageRequest(page, size));
       return  tee;
    }


    @PreAuthorize("hasRole('USER')")
    public List<Ticket> findAll() throws AccessDeniedException {
        List<Ticket> result = ticketRepository.findAll();
        return result;
    }

    @Override
    public Ticket addnew(Ticketrequest ticketrequest) {
        Ticket ticket = new Ticket();
        ticket.setName(ticketrequest.getName());
        ticket.setAvailable(ticketrequest.getAvailable());
        ticket.setLanguage(ticketrequest.getLanguage());
        ticket.setPrice(ticketrequest.getPrice());
        ticket.setImage(ticketrequest.getImage());
        ticket.setDate(ticketrequest.getDate());
        ticket.setLocation(ticketrequest.getLocation());

        this.ticketRepository.save(ticket);
        return ticket;
    }

    public void edit(Ticketrequest ticketrequest, Long id) {
        Ticket ticket = this.ticketRepository.findByid(id);
        ticket.setPrice(ticketrequest.getPrice());
        ticket.setLanguage(ticketrequest.getLanguage());
        ticket.setAvailable(ticketrequest.getAvailable());
        ticket.setName(ticketrequest.getName());
        ticket.setDate(ticketService.findById(id).getDate());
        ticket.setLocation(ticketrequest.getLocation());
        ticket.setImage(ticketService.findById(id).getImage());

        this.ticketRepository.save(ticket);


    }


    @PreAuthorize("hasRole('USER')")
    public void delete(Long id) throws AccessDeniedException {
        this.ticketRepository.delete(ticketRepository.findByid(id));


    }


}
