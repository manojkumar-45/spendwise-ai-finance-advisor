package com.sw.backend.controller;

import com.sw.backend.dto.TransactionDTO;
import com.sw.backend.model.Transaction;
import com.sw.backend.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public String addTransaction(@RequestBody TransactionDTO dto) {
        return transactionService.addTransaction(dto);
    }

    @GetMapping("/{userId}")
    public List<Transaction> getTransactions(@PathVariable Long userId) {
        return transactionService.getUserTransactions(userId);
    }
}