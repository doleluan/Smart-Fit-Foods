package com.example.backend.services;

import com.example.backend.dto.ChangeAccountDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserEditDTO;
import com.example.backend.dto.UserInfo;
import com.example.backend.model.account.Account;
import com.example.backend.model.person.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IUserServices {
    Users saveUser(UserDTO userDTO);
    Users findByUserName(String userName);
    UserInfo editUser(UserEditDTO userEditDTO);
    Page<Users> findAllUsers(String username, String address, String phone_number, String name, Pageable pageable,Integer roles);

}
