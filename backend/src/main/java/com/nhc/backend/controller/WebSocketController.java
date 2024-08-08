package com.nhc.backend.controller;

import com.nhc.backend.dto.In.MessageDto;
import com.nhc.backend.entity.Messages;
import com.nhc.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class WebSocketController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public Messages sendMessage(@Payload MessageDto messageDto) {
        System.out.println(messageDto);
        return messageService.saveMessage(messageDto);
    }
}