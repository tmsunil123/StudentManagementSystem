package com.student.main.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.student.main.model.StudentRegistration;
import com.student.main.repository.CollegeRegistrationRepository;
import com.student.main.repository.StudentRegistrationRepository;

@Service
public class StudentRegistrationService {
	
	@Autowired
	StudentRegistrationRepository studentRegistrationRepository;
	
	@Autowired
	CollegeRegistrationService collegeRegistrationService;
	
	@Autowired
	CollegeRegistrationRepository collegeRegistrationRepository;
		
	public List<StudentRegistration> allStudentRegistration() {
	
		return studentRegistrationRepository.findAll();
	}
	
	public StudentRegistration getStudentById(int id) {
	    return studentRegistrationRepository.findById(id).orElse(null);
	}
	
	public StudentRegistration saveStudent(StudentRegistration studentRegistration) {
	    return studentRegistrationRepository.save(studentRegistration);
	}

	public StudentRegistration addStudentRegistration(StudentRegistration studentRegistration) {
		
		return studentRegistrationRepository.save(studentRegistration);
	}
	
	public void deleteStudent(int id) {
		studentRegistrationRepository.deleteById(id);
	}
	
	public StudentRegistration findByStudIdAndPassword(String studId, String password ) {
        return studentRegistrationRepository.findByStudIdAndPassword(studId,password);
    }
	public boolean checkStudIdExists(String studId) {
        return studentRegistrationRepository.existsByStudId(studId);
    }
	

    public boolean isValidLogin(String studId, String password) {
        StudentRegistration studentRegistration = studentRegistrationRepository.findByStudIdAndPassword(studId, password);
        return studentRegistration != null;
    }
    public boolean authenticate(String studId, String password) {
    	StudentRegistration studentRegistration = studentRegistrationRepository.findByStudIdAndPassword(studId, password);
        return studentRegistration != null;
    }
    
    public List<Object[]> getRegistrationCounts() {
        return studentRegistrationRepository.getRegistrationCounts();
    }
    public StudentRegistrationService(StudentRegistrationRepository studentRegistrationRepository) {
        this.studentRegistrationRepository = studentRegistrationRepository;
    }

	public StudentRegistration findByStudId(String studId) {
		
		return studentRegistrationRepository.findByStudId(studId);
	}

}