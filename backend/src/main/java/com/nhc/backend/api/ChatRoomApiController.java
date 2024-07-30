package com.nhc.backend.api;


import com.nhc.backend.dto.In.MessageDto;
import com.nhc.backend.entity.Messages;
import com.nhc.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

@RestController
@RequestMapping("/api/chatroom")
public class ChatRoomApiController {
    @Autowired
    private MessageService messageService;

    //기존 채팅 가져오기
    @GetMapping("/{chatRoomId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable Long chatRoomId) {
        return ResponseEntity.ok(messageService.getMessagesByChatRoomId(chatRoomId));
    }

    @MessageMapping("/chat.send/{roomId}")
    @SendTo("/topic/public/{roomId}")
    public Messages sendMessage(@Payload MessageDto messageDto, @DestinationVariable String roomId) {
        return messageService.saveMessage(messageDto);
    }

    @PostMapping("/{chatRoomId}/send")
    public ResponseEntity<?> receiveMessageFromFlask(@PathVariable Long chatRoomId, @RequestBody MessageDto messageDto) {
        messageDto.setChatRoomId(chatRoomId);
        Messages savedMessage = messageService.saveMessage(messageDto);
        return ResponseEntity.ok(savedMessage);
    }
}