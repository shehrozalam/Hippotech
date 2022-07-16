package com.hippotech.api.data;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hippotech.api.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    public User findFirstByEmail(String email);
}