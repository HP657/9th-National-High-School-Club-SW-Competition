package com.nhc.backend.dto.In;

import lombok.Data;

@Data
public class SignInDto {
    private String email;
    private String password;
}