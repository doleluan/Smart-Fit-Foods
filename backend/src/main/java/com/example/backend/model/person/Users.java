package com.example.backend.model.person;

import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserEditDTO;
import com.example.backend.model.account.Account;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "users")
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String avatar;
    private String phone_number;
    private String address;
    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;
    @OneToOne
    @JoinColumn(name = "username")
    private Account username;
    public Users(UserEditDTO userEditDTO){
        this.address = userEditDTO.getAddress();
        this.id = userEditDTO.getId();
        this.avatar = userEditDTO.getAvatar();
        this.name = userEditDTO.getName();
        this.phone_number = userEditDTO.getPhone_number();
        this.setGender(new Gender(userEditDTO.getGender().getId(),""));
        this.setUsername(new Account(userEditDTO.getUsername()));
    }
}
