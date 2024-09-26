package com.datavisualization.driverday.controller;


import org.springframework.web.bind.annotation.CrossOrigin;
import com.datavisualization.driverday.model.Driver;
import com.datavisualization.driverday.repository.DriverRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/drivers")
@CrossOrigin(origins = "http://localhost:4200")
public class DriverController {

  private final DriverRepository repository;

  public DriverController(DriverRepository driverRepository) {
    this.repository = driverRepository;
  }

  @GetMapping
  public List<Driver> findAll() {
    return repository.findAll();
  }

  @GetMapping("/{id}")
  public Driver findById(@PathVariable Long id) {
    return repository.findById(id).orElse(null);
  }
}
