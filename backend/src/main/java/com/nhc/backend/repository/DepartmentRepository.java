package com.nhc.backend.repository;

import com.nhc.backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Department findByName(String name);  // 부서명을 기준으로 Department 조회
}
