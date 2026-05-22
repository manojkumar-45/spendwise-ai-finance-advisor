package com.sw.backend.repository;

import com.sw.backend.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByUserId(Long userId);

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND MONTH(t.date)=:month AND YEAR(t.date)=:year")
    List<Transaction> findByUserAndMonth(Long userId, int month, int year);

    @Query("SELECT t FROM Transaction t WHERE t.user.id = :userId AND t.date BETWEEN :start AND :end")
    List<Transaction> findByUserAndDateRange(Long userId, LocalDate start, LocalDate end);
}