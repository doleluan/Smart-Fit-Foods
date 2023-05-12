package com.example.backend.repository;

import com.example.backend.model.food.ConflicFood;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IConflicFoodRepository extends JpaRepository<ConflicFood,Integer> {
}
