package com.sw.backend.controller;

import com.sw.backend.dto.LoginDTO;
import com.sw.backend.dto.RegisterDTO;
import com.sw.backend.model.User;
import com.sw.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public String register(@RequestBody RegisterDTO dto) {
        return authService.register(dto);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginDTO dto) {
        return authService.login(dto);
    }
}
