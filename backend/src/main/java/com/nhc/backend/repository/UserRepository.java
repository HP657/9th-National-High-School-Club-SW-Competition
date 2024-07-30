package com.nhc.backend.repository;

import com.nhc.backend.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findUserByEmail(String email);
}