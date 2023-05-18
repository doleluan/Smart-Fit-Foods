package com.example.backend.repository;

import com.example.backend.model.person.Gender;
import com.example.backend.model.person.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface IUserRepository extends JpaRepository<Users,Integer> {
    @Query(value = "select * from users where users.username = :username",nativeQuery = true)
    Optional<Users> findByUsername(@Param("username") String username);
    @Query(value="update Users  set name = :name,address=:address,avatar=:avatar,phone_number=:phone_number,gender=:gender ")
    public void editUser(@Param("name") String name,@Param("address") String address,@Param("avatar") String avatar,
                         @Param("phone_number") Double phone_number, @Param("gender") Gender gender);
}
