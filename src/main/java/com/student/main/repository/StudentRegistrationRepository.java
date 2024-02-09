package com.student.main.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.student.main.model.StudentRegistration;

@Repository
public interface StudentRegistrationRepository extends JpaRepository<StudentRegistration,Integer> {
	
       StudentRegistration findByStudIdAndPassword(String studId, String password);
       
       boolean existsByStudId(String studId);
       
       StudentRegistration findByStudId(String studId);
       
       @Query("SELECT s.collegeRegistration.college, COUNT(s) FROM StudentRegistration s GROUP BY s.collegeRegistration.college")
       List<Object[]> getRegistrationCounts();
       
       
}