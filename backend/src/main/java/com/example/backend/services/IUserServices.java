package com.example.backend.services;

import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserEditDTO;
import com.example.backend.dto.UserInfo;
import com.example.backend.model.person.Users;

import java.util.List;

public interface IUserServices {
    Users saveUser(UserDTO userDTO);
    Users findByUserName(String userName);
    List<Users> findAllUsers();
    UserInfo editUser(UserEditDTO userEditDTO);
}
