package com.devticket.repository;

import com.devticket.model.ticket.Ticket;
import com.devticket.model.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername( String username );
}

