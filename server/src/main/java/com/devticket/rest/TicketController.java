package com.devticket.rest;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import java.util.List;
import com.devticket.model.ticket.Ticket;
import com.devticket.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.management.relation.Role;

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

    @RequestMapping (method = GET , value = "/ticket/delete/{ticketId}")
    public void  delete(@PathVariable Long ticketId) {

        this.ticketService.delete(ticketId);


    }
//    @RequestMapping(method = POST, value = "/signup")
//    public ResponseEntity<?> addUser(@RequestBody UserRequest userRequest,
//                                     UriComponentsBuilder ucBuilder) {
//        User existUser = this.userService.findByUsername(userRequest.getUsername());
//        if (existUser != null) {
//            throw new ResourceConflictException(userRequest.getId(), "Username already exists");
//        }
//        User user = this.userService.save(userRequest);
//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(ucBuilder.path("/api/user/{userId}").buildAndExpand(user.getId()).toUri());
//        return new ResponseEntity<User>(user, HttpStatus.CREATED);
//    }

    /*
     * We are not using userService.findByUsername here(we could), so it is good that we are making
     * sure that the user has role "ROLE_USER" to access this endpoint.
     */


}
