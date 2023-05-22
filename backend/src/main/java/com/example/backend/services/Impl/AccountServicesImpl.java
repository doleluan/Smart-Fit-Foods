package com.example.backend.services.Impl;

import com.example.backend.dto.AccountDTO;
import com.example.backend.dto.ChangeAccountDTO;
import com.example.backend.dto.UserDTO;
import com.example.backend.model.account.Account;
import com.example.backend.repository.IAccountRepository;
import com.example.backend.services.IAccountServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountServicesImpl implements IAccountServices {
    @Autowired
    private IAccountRepository iAccountRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Account saveAccount(Account account) {
        return this.iAccountRepository.save(account);
    }

    @Override
    public Account findAccountByUsername(String userName) {
        return this.iAccountRepository.findAccountByUsername(userName);
    }

    @Override
    public Boolean changePass(ChangeAccountDTO changeAccountDTO) {
        Account account = this.findAccountByUsername(changeAccountDTO.getUsername());
        boolean ispPassWordEquals = this.passwordEncoder.matches(changeAccountDTO.getPassword(),account.getPassword());
        if (ispPassWordEquals){
            this.iAccountRepository.changePass(this.passwordEncoder.encode(changeAccountDTO.getNewPassword()),changeAccountDTO.getUsername());
        }
        return ispPassWordEquals;
    }

    @Override
    public Boolean userNameisExist(AccountDTO accountDTO) {
        Account account = this.findAccountByUsername(accountDTO.getUsername());
        if (account==null){
            return false;
        }
        return  true;
    }
    @Override
    public void saveVerifyCode(String verifyCode,String username) {
        this.iAccountRepository.saveVerify(verifyCode,username);
    }

    @Override
    public Boolean getNewPass(AccountDTO accountDTO) {
        Account account = this.findAccountByUsername(accountDTO.getUsername());
        if (account==null){
            return false;
        }
        if (!account.getVerifyCode().equals(accountDTO.getCode())){
            System.out.println(account.getVerifyCode());
            System.out.println(accountDTO.getCode() + !account.getVerifyCode().equals(accountDTO.getCode()));
                return false;
        }
        this.iAccountRepository.changePass(this.passwordEncoder.encode(accountDTO.getNewPass()), accountDTO.getUsername());
        this.iAccountRepository.saveVerify(null, accountDTO.getUsername());
        return true;
    }

    @Override
    public void deleteUser(String username) {
        this.iAccountRepository.deleteUsers(username);
    }

}
