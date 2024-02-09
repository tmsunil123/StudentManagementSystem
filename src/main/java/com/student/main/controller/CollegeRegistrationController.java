package com.student.main.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.student.main.model.CollegeRegistration;
import com.student.main.model.StudentRegistration;
import com.student.main.repository.StudentRegistrationRepository;
import com.student.main.service.CollegeRegistrationService;

@RestController
@RequestMapping("collegeRegistrationcontroller")
public class CollegeRegistrationController {
	
	@Autowired
	private CollegeRegistrationService collegeRegistrationService;
	
	@Autowired
	StudentRegistrationRepository studentRegistrationRepository;

    @Autowired
    public void CollegeController(CollegeRegistrationService collegeRegistrationService) {
        this.collegeRegistrationService = collegeRegistrationService;
    }
  
    @RequestMapping(value = "/submitForm", method = RequestMethod.POST, consumes = org.springframework.http.MediaType.APPLICATION_JSON_VALUE,produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CollegeRegistration> submitForm(@RequestBody CollegeRegistration collegeRegistration) {
		try {
       
			CollegeRegistration savedCollegeRegistration = collegeRegistrationService.submitForm(collegeRegistration);
 
           
            return ResponseEntity.ok(savedCollegeRegistration);
        } catch (Exception e) {
            
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("/submitRegistration")
    public ResponseEntity<Map<String, Object>> submitRegistration(@RequestBody CollegeRegistration collegeRegistration) {
        try {
            
            String studId = collegeRegistration.getStudId();
            
            CollegeRegistration savedCollege = collegeRegistrationService.registerCollege(collegeRegistration);

            List<CollegeRegistration> registeredColleges = collegeRegistrationService.getRegisteredColleges(studId);

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Successfully registered college");
            response.put("collegeDetails", savedCollege);
            response.put("registeredColleges", registeredColleges); 
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            Map<String, Object> response = new HashMap<>();
            response.put("status", "error");
            response.put("message", "Error registering college");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getAllColleges")
    public ResponseEntity<List<CollegeRegistration>> getAllColleges(@RequestParam String studId) {
        try {
            List<CollegeRegistration> colleges = collegeRegistrationService.getAllColleges(studId);
            return ResponseEntity.ok(colleges);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
    
    @GetMapping("/checkRegistration")
    public ResponseEntity<Map<String, Boolean>> checkRegistration(@RequestParam String studId) {
        boolean alreadyRegistered = collegeRegistrationService.isStudentRegistered(studId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("alreadyRegistered", alreadyRegistered);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/counts")
    public ResponseEntity<List<Map<String, Object>>> getRegistrationCounts() {
        List<Map<String, Object>> counts = collegeRegistrationService.getRegistrationCounts();
        return ResponseEntity.ok(counts);
    }
    
    private String generateStudentId() {
        
        return UUID.randomUUID().toString();
    }

}