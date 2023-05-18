package com.example.backend.dto;

import com.example.backend.model.person.Gender;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserEditDTO {
    private Integer id;
    private String username;
    private String email;
    private String avatar;
    private String address;
    private Double phone_number;
    private Gender gender;
    private String name;
}
