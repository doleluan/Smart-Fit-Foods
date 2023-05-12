package com.example.backend.services;

import com.example.backend.model.food.ConflicFood;

import java.util.List;

public interface IConflicFoodServices {
    List<ConflicFood> findAll();
}
