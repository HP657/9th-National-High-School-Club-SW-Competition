package com.nhc.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String departmentName;

    @ManyToOne
    @JoinColumn(name = "department_id")  // Foreign key 설정
    private Department department;  // 부서 필드 추가

    public Users(String username, String email, String password, Department department) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.department = department;
    }
}
