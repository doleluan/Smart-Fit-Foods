package com.example.backend.model.person;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    String name;
    String avatar;
    String email;
    Double phone_number;
    String address;
    @ManyToOne
    @JoinColumn(name = "gender_id")
    Gender gender;
}
