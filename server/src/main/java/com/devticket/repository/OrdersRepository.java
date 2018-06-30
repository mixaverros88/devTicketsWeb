package com.devticket.repository;

import com.devticket.model.order.Orders;
import com.devticket.model.ticket.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersRepository extends JpaRepository<Orders , Long>{

    Orders findByid(Long id);

}
