package com.nhc.backend.repository;

import com.nhc.backend.entity.Users;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Id> {
}
