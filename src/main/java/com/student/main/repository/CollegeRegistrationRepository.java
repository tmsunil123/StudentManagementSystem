package com.student.main.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.student.main.model.CollegeRegistration;


public interface CollegeRegistrationRepository extends JpaRepository<CollegeRegistration, Long>{

	

	 CollegeRegistration findByStudIdOrderByRegistrationDateDesc(String studId);
	
	 @Query("SELECT c FROM CollegeRegistration c WHERE c.studId = :studId ORDER BY c.registrationDate DESC")
	    CollegeRegistration findLatestByStudId(@Param("studId") String studId);
	
	 List<CollegeRegistration> findByStudId(String studId);
	 
	 List<CollegeRegistration> findAllByStudId(String studId);
	 
	 CollegeRegistration findFirstByStudIdOrderByRegistrationDateDesc(String studId);  
	  boolean existsByStudId(String studId);

	 @Query("SELECT c.college AS college, COUNT(c) AS count FROM CollegeRegistration c GROUP BY c.college")
	    List<Map<String, Object>> getRegistrationCounts();
	 
}