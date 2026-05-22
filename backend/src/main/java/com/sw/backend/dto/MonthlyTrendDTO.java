package com.sw.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MonthlyTrendDTO {

    private String month;
    private Double income;
    private Double expense;
    private Double savings;
}
