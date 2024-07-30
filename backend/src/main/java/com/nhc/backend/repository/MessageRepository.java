package com.nhc.backend.repository;
import com.nhc.backend.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Messages, Long> {
    List<Messages> findByChatRoomIdOrderByTimestampAsc(Long chatRoomId);
}