package com.devticket.rest;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.*;

//import com.google.gson.Gson;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

@RestController
@CrossOrigin
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

    @RequestMapping(
            value = "/tickets/get",
            params = {"page", "size"},
            method = RequestMethod.GET
    )
    public Page<Ticket> findPaginated(
            @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort, @RequestParam("column") String column) {

        Page<Ticket> resultPage = ticketService.findPaginated(page, size, orderBy(sort, column));
        if (page > resultPage.getTotalPages()) {
            //throw new MyResourceNotFoundException();
        }

        return resultPage;
    }

    private Sort orderBy(String sort, String column) {
        if (sort.equals("asc")){
            return new Sort(Sort.Direction.ASC, column);
        } else {
            return new Sort(Sort.Direction.DESC, column);
        }
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


}




