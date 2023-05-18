package com.example.backend.model.person;

import com.example.backend.dto.UserDTO;
import com.example.backend.dto.UserEditDTO;
import com.example.backend.model.account.Account;
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
    private String email;
    private Double phone_number;
    private String address;
    @ManyToOne
    @JoinColumn(name = "gender_id")
    private Gender gender;
    @OneToOne
    @JoinColumn(name = "username")
    private Account username;
    public Users(UserDTO userDTO){
        this.email = userDTO.getEmail();
    }
    public Users(UserEditDTO userEditDTO){
        this.email = userEditDTO.getEmail();
        this.address = userEditDTO.getAddress();
        this.id = userEditDTO.getId();
        this.avatar = userEditDTO.getAvatar();
        this.name = userEditDTO.getName();
        this.phone_number = userEditDTO.getPhone_number();
//        Gender gender = new Gender();
//        gender.setId(userEditDTO.getGender().getId());
//        this.gender=gender;
//        Account account = new Account();
//        account.setUsername(userEditDTO.getUsername());
//        this.username = account;
        this.setGender(new Gender(userEditDTO.getId(),""));
        this.setUsername(new Account(userEditDTO.getUsername()));
    }
}
