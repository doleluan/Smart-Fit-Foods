package com.example.backend.model.person;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Gender {
    @Id
    private Integer id;
    private String name;
}
