package com.nhc.backend.service;

import com.nhc.backend.dto.In.DepartmentDto;
import com.nhc.backend.entity.Department;
import com.nhc.backend.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    public Department registerDepartment(DepartmentDto departmentDto) {
        if (departmentRepository.findByName(departmentDto.getName()) != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "부서명이 이미 존재합니다.");
        }
        Department department = Department.builder()
                .name(departmentDto.getName())
                .build();
        return departmentRepository.save(department);
    }
}
