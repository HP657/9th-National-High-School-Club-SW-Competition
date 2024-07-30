package com.nhc.backend.service;

import com.nhc.backend.dto.Out.Response;
import com.nhc.backend.entity.Users;
import com.nhc.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Response<?> findUserBySession(HttpServletRequest request) {
        Long userId = (Long) request.getSession().getAttribute("userId");
        if (userId == null) {
            return new Response<>("로그인 중이 아님", HttpStatus.UNAUTHORIZED);
        }
        Optional<Users> userOpt = userRepository.findById(userId);
        if (userOpt.isPresent()) {
            return new Response<>(userOpt.get(), HttpStatus.OK);
        } else {
            return new Response<>(userId + "번 유저아이디 찾을수 없음", HttpStatus.NOT_FOUND);
        }
    }


    public Response<Optional<Users>> findById(Long id) {
        Optional<Users> user = userRepository.findById(id);
        if (user.isPresent()) {
            return new Response<>(user, HttpStatus.OK);
        } else {
            return new Response<>(Optional.empty(), HttpStatus.NOT_FOUND);
        }
    }

    public Response<List<Users>> findAllUsers() {
        Iterable<Users> userIterable = userRepository.findAll();
        List<Users> users = StreamSupport.stream(userIterable.spliterator(), false)
                .collect(Collectors.toList());
        return new Response<>(users, HttpStatus.OK);
    }

    public Users findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }
}