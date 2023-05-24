package com.example.backend.services.Impl;

import com.example.backend.dto.ChangeAccountDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserEditDTO;
import com.example.backend.dto.UserInfo;
import com.example.backend.model.account.Account;
import com.example.backend.model.account.AccountRoles;
import com.example.backend.model.account.KeyAccountRole;
import com.example.backend.model.account.Roles;
import com.example.backend.model.person.Gender;
import com.example.backend.model.person.Users;
import com.example.backend.repository.IUserRepository;
import com.example.backend.services.IAccountRolesServices;
import com.example.backend.services.IAccountServices;
import com.example.backend.services.IUserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.parameters.P;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
@Service
public class UserServices implements IUserServices {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private IAccountServices iAccountServices;
    @Autowired
    private IAccountRolesServices iAccountRolesServices;
    @Autowired
    private UserDetailServicesImpl userDetailServices;
    @Override
    public Users saveUser(UserDTO userDTO) {

//        add new accout
        Account account = new Account(userDTO);
        account.setPassword(this.passwordEncoder.encode(userDTO.getPassword()));
////        add new role_user
        Account account1 = this.iAccountServices.saveAccount(account);
        KeyAccountRole keyAccountRole = new KeyAccountRole(account1,new Roles(1,""));
        AccountRoles accountRoles = new AccountRoles(keyAccountRole);
        this.iAccountRolesServices.saveAccountRoles(accountRoles);
        //        add new user
        Users users = new Users();
        users.setUsername(account1);
        users.setAvatar("https://firebasestorage.googleapis.com/v0/b/capstone2-e8f43.appspot.com/o/avatarUser%2Fusers.png?alt=media&token=a4162b9d-804d-4295-9cdd-52ae8878f430");
        users.setGender(new Gender(1,""));
        userDTO.setUsername("");
        users.setAddress("Unknown");
        users.setName("Unknown");
        users.setPhone_number("");
        return iUserRepository.save(users);
    }

    @Override
    public Users findByUserName(String userName) {
        return iUserRepository.findByUsername(userName).orElse(null);

    }
    @Override
    public UserInfo editUser(UserEditDTO userEditDTO) {

        Users users = new Users(userEditDTO);
        this.iUserRepository.save(users);
        UserInfo userInfo = new UserInfo(this.findByUserName(userEditDTO.getUsername()));
//        get list user
        Collection<? extends GrantedAuthority> authorities = this.userDetailServices.loadUserByUsername(userEditDTO.getUsername()).getAuthorities();
        userInfo.setRoles(new ArrayList(authorities));
        return userInfo;
    }

    @Override
    public Page<Users> findAllUsers(String username, String name, Pageable pageable,Integer roles) {
        return this.iUserRepository.findAllUser(username,name,pageable,roles);
    }
}
