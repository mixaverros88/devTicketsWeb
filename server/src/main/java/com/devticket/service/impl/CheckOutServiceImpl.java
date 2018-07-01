package com.devticket.service.impl;

import java.util.List;

import com.devticket.model.order.Orders;
import com.devticket.model.ticket.Ticket;
import com.devticket.model.ticket.Ticketrequest;
import com.devticket.repository.OrdersRepository;
import com.devticket.repository.TicketRepository;
import com.devticket.service.CheckOutService;
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
public class CheckOutServiceImpl implements CheckOutService {


    @Autowired
    CheckOutService checkOutService;

    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public Orders findById(Long id) {
        Orders order = this.ordersRepository.findByid(id);
        return order;
    }

    @Override
    public void save(Orders order) {
        this.ordersRepository.save(order);
    }

    @Override
    public List<Orders> findByUserId(Long id) {
        List<Orders> order= this.ordersRepository.findByUserId(id);
        return order;
    }
}
