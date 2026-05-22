package com.sw.backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double amount;

    private String category;

    private LocalDate date;

    private String notes;

    private String type; // INCOME or EXPENSE

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
