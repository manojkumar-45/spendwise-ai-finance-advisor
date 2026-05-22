package com.sw.backend.controller;

import com.sw.backend.dto.DashboardResponseDTO;
import com.sw.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/{userId}")
    public DashboardResponseDTO getDashboard(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "current") String month
    ) {
        return dashboardService.getDashboard(userId, month);
    }
}
