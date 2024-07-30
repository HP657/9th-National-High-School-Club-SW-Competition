package com.nhc.backend.service;

import com.nhc.backend.dto.In.MessageDto;
import com.nhc.backend.entity.Messages;
import com.nhc.backend.entity.Users;
import com.nhc.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserService userService;

    public Messages saveMessage(MessageDto messageDTO) {
        Users user = userService.findUserById(messageDTO.getUserId());
        if (user == null) {
            throw new RuntimeException("User not found with ID: " + messageDTO.getUserId());
        }
        Messages message = Messages.builder()
                .userId(user)
                .content(messageDTO.getMessage())
                .chatRoomId(messageDTO.getChatRoomId())
                .timestamp(LocalDateTime.now())
                .build();

        return messageRepository.save(message);
    }

    public List<Messages> getMessagesByChatRoomId(Long chatRoomId) {
        return messageRepository.findByChatRoomIdOrderByTimestampAsc(chatRoomId);
    }
}