package com.datavisualization.driverday.repository;

import com.datavisualization.driverday.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DriverRepository extends JpaRepository<Driver, Long> {
  List<Driver> findBySupervisor(String supervisor);
}
