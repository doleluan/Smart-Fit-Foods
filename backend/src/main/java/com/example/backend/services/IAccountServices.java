package com.example.backend.services;

import com.example.backend.dto.AccountDTO;
import com.example.backend.dto.ChangeAccountDTO;
import com.example.backend.model.account.Account;

public interface IAccountServices {
    Account saveAccount(Account account);
    Account findAccountByUsername(String userName);
    Boolean changePass(ChangeAccountDTO changeAccountDTO);
    Boolean userNameisExist(AccountDTO accountDTO);
    void saveVerifyCode(String verifyCode,String username);
    Boolean getNewPass(AccountDTO accountDTO);
    void deleteUser(String username);
}
