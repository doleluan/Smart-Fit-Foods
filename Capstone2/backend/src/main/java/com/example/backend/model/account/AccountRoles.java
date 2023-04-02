package com.example.backend.model.account;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "account_roles")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class AccountRoles {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
//    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_name")
    private Account account;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles roles;
}
