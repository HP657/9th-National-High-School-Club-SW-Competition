package com.nhc.backend.service;


import com.nhc.backend.dto.In.SignInDto;
import com.nhc.backend.dto.In.SignUpDto;
import com.nhc.backend.dto.Out.Response;
import com.nhc.backend.entity.Users;
import com.nhc.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Response<String> signup(SignUpDto signUpDto) {
        Users user = new Users(
                signUpDto.getUsername(),
                signUpDto.getEmail(),
                passwordEncoder.encode(signUpDto.getPassword())
        );
        userRepository.save(user);
        return new Response<>("회원가입 성공적", HttpStatus.OK);
    }

    public Response<String> signin(SignInDto signinDto, HttpServletRequest request) {
        Users userByEmail = userRepository.findUserByEmail(signinDto.getEmail());
        if (userByEmail == null) {
            return new Response<>("존재하지 않는 사용자임", HttpStatus.NOT_FOUND);
        } else {
            String submittedPassword = signinDto.getPassword();
            if (passwordEncoder.matches(submittedPassword, userByEmail.getPassword())) {
                request.getSession().setAttribute("userId", userByEmail.getUserId());
                return new Response<>("로그인 성공적", HttpStatus.OK);
            } else {
                return new Response<>("비밀번호가 일치하지 않음", HttpStatus.UNAUTHORIZED);
            }
        }
    }

    public Response<String> logout(HttpServletRequest request) {
        request.getSession().invalidate();
        return new Response<>("로그아웃 성공적", HttpStatus.OK);
    }
}