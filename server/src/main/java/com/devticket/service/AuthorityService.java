package com.devticket.service;

import java.util.List;
import com.devticket.model.Authority;

public interface AuthorityService {
  List<Authority> findById(Long id);

  List<Authority> findByname(String name);

}
