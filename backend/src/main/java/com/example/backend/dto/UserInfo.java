package com.example.backend.dto;

import com.example.backend.model.account.Roles;
import com.example.backend.model.person.Gender;
import com.example.backend.model.person.Users;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserInfo {
    private Integer id;
    private String username;
    private String email;
    private String avatar;
    private String address;
    private String phone_number;
    private Gender gender;
    private String name;
//    private String name
    private List<Roles> roles;
    public UserInfo(Users user){
        this.id = user.getId();
        this.username = user.getUsername().getUsername();
        this.gender = user.getGender();
        this.avatar = user.getAvatar();
        this.address = user.getAddress();
        this.phone_number = user.getPhone_number();
        this.name = user.getName();
    }
}
