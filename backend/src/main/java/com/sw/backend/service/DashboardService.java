package com.sw.backend.service;

import com.sw.backend.dto.*;
import com.sw.backend.model.Transaction;
import com.sw.backend.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private final TransactionRepository transactionRepository;

    // Constructor Injection
    public DashboardService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public DashboardResponseDTO getDashboard(Long userId, String monthType) {

        YearMonth selectedMonth =
                monthType.equals("last")
                        ? YearMonth.now().minusMonths(1)
                        : YearMonth.now();

        LocalDate start = selectedMonth.atDay(1);
        LocalDate end = selectedMonth.atEndOfMonth();

        List<Transaction> transactions =
                transactionRepository.findByUserAndDateRange(userId, start, end);

        return calculateDashboard(transactions, userId);
    }

    private DashboardResponseDTO calculateDashboard(List<Transaction> transactions, Long userId) {

        double income = transactions.stream()
                .filter(t -> t.getType().equals("INCOME"))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double expense = transactions.stream()
                .filter(t -> t.getType().equals("EXPENSE"))
                .mapToDouble(Transaction::getAmount)
                .sum();

        double savings = income - expense;
        double savingsRate = income == 0 ? 0 : (savings / income) * 100;

        Map<String, Double> categoryBreakdown =
                transactions.stream()
                        .filter(t -> t.getType().equals("EXPENSE"))
                        .collect(Collectors.groupingBy(
                                Transaction::getCategory,
                                Collectors.summingDouble(Transaction::getAmount)
                        ));

        DashboardResponseDTO dto = new DashboardResponseDTO();
        dto.setTotalIncome(income);
        dto.setTotalExpense(expense);
        dto.setSavings(savings);
        dto.setSavingsRate(savingsRate);
        dto.setCategoryBreakdown(categoryBreakdown);
        dto.setMonthlyTrend(getLastSixMonthsTrend(userId));

        return dto;
    }

    private List<MonthlyTrendDTO> getLastSixMonthsTrend(Long userId) {

        List<MonthlyTrendDTO> trendList = new ArrayList<>();

        for (int i = 5; i >= 0; i--) {

            YearMonth ym = YearMonth.now().minusMonths(i);

            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();

            List<Transaction> transactions =
                    transactionRepository.findByUserAndDateRange(userId, start, end);

            double income = transactions.stream()
                    .filter(t -> t.getType().equals("INCOME"))
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            double expense = transactions.stream()
                    .filter(t -> t.getType().equals("EXPENSE"))
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            trendList.add(new MonthlyTrendDTO(
                    ym.getMonth().toString(),
                    income,
                    expense,
                    income - expense
            ));
        }

        return trendList;
    }
}