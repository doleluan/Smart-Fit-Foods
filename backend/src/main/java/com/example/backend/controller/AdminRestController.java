package com.example.backend.controller;

import com.example.backend.dto.UserEditDTO;
import com.example.backend.model.person.Users;
import com.example.backend.services.IAccountServices;
import com.example.backend.services.IRecipeServices;
import com.example.backend.services.IUserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminRestController {
    @Autowired
    private IUserServices iUserServices;
    @Autowired
    private IAccountServices iAccountServices;
    @Autowired
    private IRecipeServices iRecipeServices;
    private static final int MAX_DISPLAY = 5;
    @GetMapping("/users")
    public ResponseEntity<Page<Users>> findAllUser(@RequestParam(name="username",defaultValue = "") String username,
                                                         @RequestParam(name="address",defaultValue = "") String address,
                                                         @RequestParam(name="phone_number",defaultValue = "") String phone_number,
                                                         @RequestParam(name="name",defaultValue = "") String name,
                                                         @PageableDefault(size = MAX_DISPLAY) Pageable pageable){
        return new ResponseEntity<>(this.iUserServices.findAllUsers(username,address,phone_number,name,pageable,1), HttpStatus.OK);
    }
    @GetMapping("/employees")
    public ResponseEntity<Page<Users>> findAllEmployees(@RequestParam(name="username",defaultValue = "") String username,
                                                   @RequestParam(name="address",defaultValue = "") String address,
                                                   @RequestParam(name="phone_number",defaultValue = "") String phone_number,
                                                   @RequestParam(name="name",defaultValue = "") String name,
                                                   @PageableDefault(size = MAX_DISPLAY) Pageable pageable){
        return new ResponseEntity<>(this.iUserServices.findAllUsers(username,address,phone_number,name,pageable,2), HttpStatus.OK);
    }
    @DeleteMapping("/deleteUser")
    public ResponseEntity<?> deleteUser(@RequestParam(name = "username") String username){
        this.iAccountServices.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @DeleteMapping("/deleteEmployee")
    public ResponseEntity<?> deleteEmployee(@RequestParam(name = "username") String username){
        this.iAccountServices.deleteUser(username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/listRecipe")
    public ResponseEntity<?> listRecipe(@RequestParam(name = "name") String name, @PageableDefault(size = MAX_DISPLAY) Pageable pageable){
            return new ResponseEntity<>(this.iRecipeServices.findAll("",pageable),HttpStatus.OK);
    }
}
