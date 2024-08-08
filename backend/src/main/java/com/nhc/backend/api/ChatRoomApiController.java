package com.nhc.backend.api;

import com.nhc.backend.dto.In.MessageDto;
import com.nhc.backend.entity.Messages;
import com.nhc.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomApiController {
    @Autowired
    private MessageService messageService;

    @GetMapping("/{chatRoomId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(messageService.getMessagesByChatRoomId(chatRoomId));
    }

    @PostMapping("/send")
    public ResponseEntity<?> receiveMessageFromFlask( @RequestBody MessageDto messageDto) {
        Messages savedMessage = messageService.saveMessage(messageDto);
        return ResponseEntity.ok(savedMessage);
    }
}
