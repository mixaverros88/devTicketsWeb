package com.devticket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.devticket.model.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
  Authority findByName(String name);
}
