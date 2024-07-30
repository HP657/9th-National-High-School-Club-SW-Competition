package com.nhc.backend.api;


import com.nhc.backend.dto.Out.Response;
import com.nhc.backend.entity.Users;
import com.nhc.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserApiController {

    @Autowired
    private UserService userService;

    //id로 회원 정보
    @GetMapping("/{id}")
    public ResponseEntity<Response<Optional<Users>>> getUserById(@PathVariable Long id) {
        return userService.findById(id).toResponseEntity();
    }

    //로그인중인 회원정보
    @GetMapping("/info")
    public ResponseEntity<? extends Response<?>> getUserInfo(HttpServletRequest request) {
        return userService.findUserBySession(request).toResponseEntity();
    }

    // 모든 회원정보
    @GetMapping("/users")
    public ResponseEntity<Response<List<Users>>> getAllUsers() {
        return userService.findAllUsers().toResponseEntity();
    }
}