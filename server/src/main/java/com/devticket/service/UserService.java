package com.devticket.service;

import com.devticket.model.user.User;
import com.devticket.model.user.UserRequest;

import java.util.List;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface UserService {
    void resetCredentials(String lastname);

    User findById(Long id);

    User findByUsername(String username);

    List<User> findAll();

    User findByLastname(String lastname);

    User save(UserRequest user);
}
