package com.devticket.service;

import com.devticket.model.order.Orders;

import java.util.List;


/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface CheckOutService {
    Orders findById(Long id);

    void save(Orders order);

    List<Orders> findByUserId(Long id);

    int findAll();

}
