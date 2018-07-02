package com.devticket.service.impl;

import com.devticket.model.order.Orders;
import com.devticket.repository.OrdersRepository;
import com.devticket.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        List<Orders> order = this.ordersRepository.findByUserId(id);
        return order;
    }
}
