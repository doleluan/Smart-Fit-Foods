package com.example.backend.services.Impl;

import com.example.backend.model.food.ConflicFood;
import com.example.backend.repository.IConflicFoodRepository;
import com.example.backend.services.IConflicFoodServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class ConflicFoodServicesImpl implements IConflicFoodServices {
    @Autowired
    private IConflicFoodRepository iConflicFoodRepository;

    @Override
    public List<ConflicFood> findAll() {
        return this.iConflicFoodRepository.findAll();
    }
}
