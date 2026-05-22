package com.sw.backend.service;

import com.sw.backend.dto.LoginDTO;
import com.sw.backend.dto.RegisterDTO;
import com.sw.backend.model.User;
import com.sw.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String register(RegisterDTO dto) {

        if(userRepository.existsByEmail(dto.getEmail())) {
            return "User already exists";
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setFullName(dto.getFullName());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        userRepository.save(user);
        return "User registered successfully";
    }

    public User login(LoginDTO dto) {

        User user = userRepository.findByEmail(dto.getEmail());

        if(user == null) return null;

        if(passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            return user;
        }

        return null;
    }
}