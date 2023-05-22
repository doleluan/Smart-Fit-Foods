package com.example.backend.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class ChangeAccountDTO {
    private String username;
    private String password;
    private String newPassword;
}
