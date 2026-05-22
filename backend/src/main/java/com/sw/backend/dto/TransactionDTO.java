package com.sw.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDTO {
    private Double amount;
    private String category;
    private LocalDate date;
    private String notes;
    private String type;
    private Long userId;
}
