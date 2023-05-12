package com.example.backend.controller;

import com.example.backend.model.food.ConflicFood;
import com.example.backend.services.IConflicFoodServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/conflicFood")
public class ConflicRestController {
    @Autowired
    private IConflicFoodServices iConflicFoodServices;
    @GetMapping("")
    private ResponseEntity<List<ConflicFood>> findAll(){
        System.out.println(this.iConflicFoodServices.findAll().size());
        return new ResponseEntity<>(this.iConflicFoodServices.findAll(), HttpStatus.OK);
    }
}
