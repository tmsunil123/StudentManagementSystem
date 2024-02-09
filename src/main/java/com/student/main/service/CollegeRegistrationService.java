package com.student.main.service;


import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.main.model.CollegeRegistration;

import com.student.main.repository.CollegeRegistrationRepository;

@Service
public class CollegeRegistrationService {
	
        @Autowired
	    private CollegeRegistrationRepository collegeRegistrationRepository;

	    @Autowired
	    public void CollegeService(CollegeRegistrationRepository collegeRegistrationRepository) {
	        this.collegeRegistrationRepository = collegeRegistrationRepository;
	    }

	    public CollegeRegistration submitForm(CollegeRegistration collegeRegistration) {
	       
	        return collegeRegistrationRepository.save(collegeRegistration);
	    }

	    public CollegeRegistration registerCollege(CollegeRegistration collegeRegistration) {
	        return collegeRegistrationRepository.save(collegeRegistration);
	    }

	    public List<Map<String, Object>> getRegistrationCounts() {
	        return collegeRegistrationRepository.getRegistrationCounts();
	    }

	    public List<CollegeRegistration> getRegisteredColleges(String studId) {
	        return collegeRegistrationRepository.findByStudId(studId);
	    }
		
		public CollegeRegistration getLatestRegistration(String studId) {    
	        return collegeRegistrationRepository.findByStudIdOrderByRegistrationDateDesc(studId);
	    }

		public Optional<CollegeRegistration> getLatestRegistrationByStudId(String studId) {
			return null;
		}
		 public List<CollegeRegistration> getAllColleges(String studId) {
		        return collegeRegistrationRepository.findAllByStudId(studId);
		    }

		 public CollegeRegistration findLatestByStudId(String studId) {
		        return collegeRegistrationRepository.findLatestByStudId(studId);
		    }
		 public boolean isStudentRegistered(String studId) {
		        return collegeRegistrationRepository.existsByStudId(studId);
		    }
		 public boolean hasStudentRegisteredColleges(String studId) {
		        return collegeRegistrationRepository.existsByStudId(studId);
		    }

}