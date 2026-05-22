package com.sw.backend.repository;

import com.sw.backend.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByUser_IdOrderByCreatedAtAsc(Long userId);
}