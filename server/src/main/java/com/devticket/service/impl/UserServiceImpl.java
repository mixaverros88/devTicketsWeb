package com.devticket.service.impl;

import com.devticket.model.user.Authority;
import com.devticket.model.user.User;
import com.devticket.model.user.UserRequest;
import com.devticket.repository.UserRepository;
import com.devticket.service.AuthorityService;
import com.devticket.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.util.List;
import java.util.Random;
import java.util.UUID;

/**
 * Created by CodingFive Team  2018
 * (Dimou John - Mike Verros (Back-End))
 */


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthorityService authService;

    @Autowired MailSender mailSender;

    public void resetCredentials(String email) {
        User user = userRepository.findByLastname(email);
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        String generatedString= randomUUIDString.substring(0,5);
        user.setPassword(passwordEncoder.encode(generatedString));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setSubject("devTickets Reset Password");
        message.setText("Hello from DevTickets .com  You Requested a Password Reset ----- YOUR NEW PASSWORD IS :" + generatedString );
        message.setTo("dimoujohnprivate@gmail.com");
        message.setFrom("mixalisgiorgosverros@gmail.com");
        try {
            mailSender.send(message);

        } catch (Exception e) {
            e.printStackTrace();


        }
            userRepository.save(user);

    }

    @Override
    // @PreAuthorize("hasRole('USER')")
    public User findByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByUsername(username);
        return u;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public User findById(Long id) throws AccessDeniedException {
        User u = userRepository.findOne(id);
        return u;
    }

    @PreAuthorize("hasRole('ADMIN')")
    public List<User> findAll() throws AccessDeniedException {
        List<User> result = userRepository.findAll();
        return result;
    }

    @Override
    public User save(UserRequest userRequest) {
        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setFirstname(userRequest.getFirstname());
        user.setLastname(userRequest.getLastname());
        //List<Authority> auth = authService.findByname("ROLE_USER");
        List<Authority> auth = authService.findById(1l);
        user.setAuthorities(auth);
        this.userRepository.save(user);
        return user;
    }

    @Override
    public User findByLastname(String lastname){
    return this.userRepository.findByLastname(lastname);
    }

}
