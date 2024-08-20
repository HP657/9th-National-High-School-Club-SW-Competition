package com.nhc.backend.api;

import com.nhc.backend.dto.In.DepartmentDto;
import com.nhc.backend.dto.In.SignInDto;
import com.nhc.backend.dto.In.SignUpDto;
import com.nhc.backend.dto.Out.Response;
import com.nhc.backend.entity.Department;
import com.nhc.backend.service.AuthService;
import com.nhc.backend.service.DepartmentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthApiController {

    @Autowired
    private AuthService authService;

    @Autowired
    private DepartmentService departmentService;

    // 회사등록
    @PostMapping("/department/register")
    public ResponseEntity<String> registerDepartment(@RequestBody DepartmentDto departmentDto) {
        Department department = departmentService.registerDepartment(departmentDto);
        return new ResponseEntity<>("부서 등록 성공: " + department.getName(), HttpStatus.CREATED);
    }

    //회원가입
    @PostMapping("/signup")
    public ResponseEntity<Response<String>> signUpUser(@RequestBody SignUpDto signupDto) {
        return authService.signup(signupDto).toResponseEntity();
    }

    //로그인
    @PostMapping("/signin")
    public ResponseEntity<Response<String>> signInUser(@RequestBody SignInDto signinDto, HttpServletRequest request) {
        return authService.signin(signinDto, request).toResponseEntity();
    }

    //로그아웃
    @GetMapping("/logout")
    public ResponseEntity<Response<String>> logOutUser(HttpServletRequest request) {
        return authService.logout(request).toResponseEntity();
    }

}