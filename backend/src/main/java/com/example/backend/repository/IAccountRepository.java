package com.example.backend.repository;

import com.example.backend.model.account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;


@Repository
@Transactional
public interface IAccountRepository extends JpaRepository<Account,String> {
      Account  findAccountByUsername(String username);
      @Modifying
      @Query(value = "UPDATE account SET password= :password WHERE username=:username",nativeQuery = true)
      void changePass(@Param("password") String password,@Param("username") String username);
      @Modifying
      @Query(value = "UPDATE account SET verify_code=:verifyCode WHERE  username=:username",nativeQuery = true)
      void saveVerify(@Param("verifyCode") String verifyCode,@Param("username") String username);
      @Modifying
      @Query(value = "UPDATE account SET  flag = true WHERE  username=:username",nativeQuery = true)
      void deleteUsers(@Param("username") String username);
}
