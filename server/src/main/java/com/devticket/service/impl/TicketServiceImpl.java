package com.devticket.service.impl;

import java.util.List;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.repository.TicketRepository;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.devticket.model.user.Authority;
import com.devticket.model.user.User;
import com.devticket.model.user.UserRequest;
import com.devticket.repository.UserRepository;
import com.devticket.service.AuthorityService;
import com.devticket.service.UserService;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */


@Service
public class TicketServiceImpl implements TicketService {

    @Autowired TicketService ticketService;


    @Autowired
    private TicketRepository ticketRepository;

    @PreAuthorize("hasRole('USER')")
    public Ticket findById(Long id) throws AccessDeniedException {
        Ticket ticket = ticketRepository.findByid(id);
        return ticket;
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
       ticket.setLanguage(ticketrequest.getLocation());
       ticket.setPrice(ticketrequest.getPrice());
        this.ticketRepository.save(ticket);
        return ticket;
    }

    public void edit(Ticketrequest ticketrequest,Long id){
           Ticket ticket =this.ticketRepository.findByid(id);
           ticket.setPrice(ticketrequest.getPrice());
           ticket.setLanguage(ticketrequest.getLanguage());
           ticket.setAvailable(ticketrequest.getAvailable());
           ticket.setName(ticketrequest.getName());
           ticket.setDate(ticketrequest.getDate());
           ticket.setLocation(ticketrequest.getLocation());
           ticket.setImage(ticketrequest.getImage());

        this.ticketRepository.save(ticket);


    }




    @PreAuthorize("hasRole('USER')")
    public void delete(Long id) throws AccessDeniedException{
        this.ticketRepository.delete(ticketRepository.findByid(id));


    }



}
