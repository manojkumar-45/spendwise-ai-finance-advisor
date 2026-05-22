package com.sw.backend.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class DashboardResponseDTO {

    private Double totalIncome;
    private Double totalExpense;
    private Double savings;
    private Double savingsRate;

    private Map<String, Double> categoryBreakdown;

    private List<MonthlyTrendDTO> monthlyTrend;
}
