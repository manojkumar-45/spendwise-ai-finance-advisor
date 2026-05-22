package com.sw.backend.controller;

import com.sw.backend.dto.AIRequestDTO;
import com.sw.backend.dto.DashboardResponseDTO;
import com.sw.backend.model.ChatMessage;
import com.sw.backend.model.User;
import com.sw.backend.repository.ChatMessageRepository;
import com.sw.backend.repository.UserRepository;
import com.sw.backend.service.DashboardService;
import com.sw.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/ai")
public class AIController {

    @Autowired
    private GeminiService geminiService;

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private ChatMessageRepository chatRepo;

    @Autowired
    private UserRepository userRepository;

    // GET AI Advice + Save to History
    @PostMapping("/advice")
    public String getAdvice(@RequestBody AIRequestDTO dto) throws Exception {

        User user = userRepository.findById(dto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        DashboardResponseDTO summary =
                dashboardService.getDashboard(dto.getUserId(), "current");

        Double income = summary.getTotalIncome() != null ? summary.getTotalIncome() : 0.0;
        Double expense = summary.getTotalExpense() != null ? summary.getTotalExpense() : 0.0;
        Double savings = summary.getSavings() != null ? summary.getSavings() : 0.0;

        String expenseBreakdown = summary.getCategoryBreakdown()
                .entrySet()
                .stream()
                .map(e -> e.getKey() + ": ₹" + String.format("%,.0f", e.getValue()))                .reduce((a, b) -> a + ", " + b)
                .orElse("No expenses recorded");

        String prompt = String.format("""
                You are SpendWise AI Finance Advisor for Indian users.
                All amounts are in Indian Rupees (₹).
User Financial Data:
- Monthly Income: ₹%,.0f
- Monthly Expenses: ₹%,.0f
- Monthly Savings: ₹%,.0f

Spending Breakdown:
%s

User Question:
"%s"

Instructions:
1. Give exactly 4 bullet points.
2. Each bullet must start with "- ".
3. Each bullet must be one complete sentence.
4. Do NOT write paragraphs.
5. Do NOT use bold or extra formatting.
6. Always mention currency as ₹ and never use dollars.
7.Answer should be revelent to the question user asked.

Answer format:

- Point 1
- Point 2
- Point 3
- Point 4
""", income, expense, savings, expenseBreakdown, dto.getQuestion());

        String response = geminiService.getAdvice(prompt);

        // SAVE TO DATABASE
        ChatMessage chat = new ChatMessage();
        chat.setUser(user);
        chat.setQuestion(dto.getQuestion());
        chat.setAnswer(response);
        chatRepo.save(chat);

        return response;
    }

    // GET CHAT HISTORY
    @GetMapping("/history/{userId}")
    public List<ChatMessage> getHistory(@PathVariable Long userId) {
        return chatRepo.findByUser_IdOrderByCreatedAtAsc(userId);
    }
}