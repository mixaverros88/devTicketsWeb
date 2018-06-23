package com.devticket.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;

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

    @RequestMapping (method = DELETE , value = "/ticket/delete/{ticketId}")
    public ResponseEntity<?> delete(@PathVariable Long ticketId) {

        this.ticketService.delete(ticketId);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }

    @RequestMapping(method = POST, value = "/ticket/add")
    public ResponseEntity<?> addUser(@RequestBody Ticketrequest ticketrequest ) {
        //Ticket ticket = this.ticketService.addnew(ticketrequest);
        this.ticketService.addnew(ticketrequest);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }

    @RequestMapping(method = PUT , value = "/ticket/edit/{ticketid}")
    public ResponseEntity<?> edit(@RequestBody Ticketrequest ticketrequest, @PathVariable Long ticketid){
this.ticketService.edit(ticketrequest,ticketid);
        Map<String, String> result = new HashMap<>();
        result.put( "result", "success" );
        return ResponseEntity.accepted().body(result);
    }


    }

    /*
     * We are not using userService.findByUsername here(we could), so it is good that we are making
     * sure that the user has role "ROLE_USER" to access this endpoint.
     */


