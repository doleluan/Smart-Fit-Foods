package com.example.backend.repository;

import com.example.backend.dto.UserEditDTO;
import com.example.backend.model.person.Gender;
import com.example.backend.model.person.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.util.Optional;
@Transactional
public interface IUserRepository extends JpaRepository<Users,Integer> {
    @Query(value = "select * from users where users.username = :username",nativeQuery = true)
    Optional<Users> findByUsername(@Param("username") String username);
    @Query(value = "select distinct users.username,users.gender_id,users.address,users.id,users.name,users.avatar,users.phone_number,users.gender_id from users " +
            "join account on users.username= account.username join account_roles on account.username = account_roles.username where users.username like concat('%',:username,'%') " +
            "and users.address like concat('%',:address,'%') and users.name like concat('%',:name,'%')" +
            " and users.phone_number like concat('%',:phone_number,'%') and account_roles.role= :roles and account.flag=0",nativeQuery = true)
    Page<Users> findAllUser(@Param("username") String username, @Param("address") String address,
                                  @Param("phone_number") String phone_number, @Param("name") String name, Pageable pageable,@Param("roles") Integer roles);
}
