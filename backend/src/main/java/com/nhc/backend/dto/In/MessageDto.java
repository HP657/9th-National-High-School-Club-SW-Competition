package com.nhc.backend.dto.In;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long userId;
    private String message;
    private Long chatRoomId;
}