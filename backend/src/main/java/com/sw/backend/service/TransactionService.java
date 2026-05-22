package com.sw.backend.service;

import com.sw.backend.dto.TransactionDTO;
import com.sw.backend.model.Transaction;
import com.sw.backend.model.User;
import com.sw.backend.repository.TransactionRepository;
import com.sw.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    public String addTransaction(TransactionDTO dto) {

        User user = userRepository.findById(dto.getUserId()).orElse(null);
        if(user == null) return "User not found";

        Transaction t = new Transaction();
        t.setAmount(dto.getAmount());
        t.setCategory(dto.getCategory());
        t.setDate(dto.getDate());
        t.setNotes(dto.getNotes());
        t.setType(dto.getType());
        t.setUser(user);

        transactionRepository.save(t);

        return "Transaction added successfully";
    }

    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
