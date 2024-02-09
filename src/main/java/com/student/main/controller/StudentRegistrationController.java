package com.student.main.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.student.main.model.CollegeRegistration;
import com.student.main.model.StudentRegistration;
import com.student.main.repository.CollegeRegistrationRepository;
import com.student.main.repository.StudentRegistrationRepository;
import com.student.main.service.CollegeRegistrationService;
import com.student.main.service.StudentRegistrationService;

@RestController
@RequestMapping("studentRegistrationcontroller")
//@CrossOrigin(origins="http://localhost:3000")
//Controller class
public class StudentRegistrationController {
	
	@Autowired
	StudentRegistrationService studentRegistrationService;
	
	@Autowired
    private CollegeRegistrationRepository collegeRepository;
	
	@Autowired
	StudentRegistrationRepository studentRegistrationRepository;
	
	@Autowired
	CollegeRegistrationService collegeRegistrationService;
		
	@RequestMapping(value = "/addstudentRegistration", method = RequestMethod.POST, consumes = org.springframework.http.MediaType.APPLICATION_JSON_VALUE,produces = org.springframework.http.MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<StudentRegistration> addStudentRegistration(@RequestBody StudentRegistration studentRegistration) {
		try {
       
            StudentRegistration savedStudentRegistration = studentRegistrationService.addStudentRegistration(studentRegistration);
 
           
            return ResponseEntity.ok(savedStudentRegistration);
        } catch (Exception e) {
            
            return ResponseEntity.status(500).body(null);
        }
    }
	
	@GetMapping("/registration")
    public String showRegistrationPage() {
        return "registration";
    }
	
	@GetMapping("/allstudentRegistration")
	public List<StudentRegistration> allStudentRegistration(){
		return studentRegistrationService.allStudentRegistration();
		
	}
	
    @GetMapping("/login")
    public String loginForm(Model model) {
        model.addAttribute("studentRegistration", new StudentRegistration());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute StudentRegistration studentRegistration, Model model) {
        if (studentRegistrationService.isValidLogin(studentRegistration.getStudId(), studentRegistration.getPassword())) {
            return "redirect:/users/home";
        } else {
            model.addAttribute("error", "Invalid login credentials");
            return "login";
        }
    }
    
    @PostMapping("/api/login")
    public ApiResponse login(@RequestBody StudentRegistration studentRegistration) {
        String studId = studentRegistration.getStudId();
        String password = studentRegistration.getPassword();
        boolean isValidCredentials = studentRegistrationService.authenticate(studId, password);

        if (isValidCredentials) {
            return new ApiResponse(true, "Login successful");
        } else {
            return new ApiResponse(false, "Invalid student ID or password");
        }
    }    

    @GetMapping("/home")
    public String home() {
        return "home";
    }

    @GetMapping("/colleges")
    public List<CollegeRegistration> getAllColleges() {
        return collegeRepository.findAll();
    }
    
    @GetMapping("/checkStudIdExists/{studId}")
    public ResponseEntity<Map<String, Boolean>> checkStudIdExists(@PathVariable String studId) {
        boolean exists = studentRegistrationService.checkStudIdExists(studId);
        Map<String, Boolean> response = new HashMap<>();
        response.put("studIdExists", exists);
        return ResponseEntity.ok(response);
    }
    @PostMapping("/register")
    public String registerStudent(@RequestBody StudentRegistration student) {
        // Validate that student selects only one college
        if (student.getCollegeRegistration() != null) {
            return "Student can only select one college!";
        }

        studentRegistrationRepository.save(student);
        return "Student registered successfully!";
    }
    
    @GetMapping("/welcome")
    public String welcomeMessage() {
        return "Welcome to Student Registration!";
    }
    
    @GetMapping
    public List<StudentRegistration> getAllStudents() {
        return studentRegistrationService.allStudentRegistration();
    }

    @GetMapping("/{id}")
    public StudentRegistration getStudentById(@PathVariable int id) {
        return studentRegistrationService.getStudentById(id);
    }

    @PostMapping
    public StudentRegistration saveStudent(@RequestBody StudentRegistration student) {
        return studentRegistrationService.saveStudent(student);
    }

    @PutMapping("/{id}")
    public StudentRegistration updateStudent(@PathVariable int id, @RequestBody StudentRegistration updatedStudent) {
        StudentRegistration existingStudent = studentRegistrationService.getStudentById(id);

        if (existingStudent != null) {
            existingStudent.setName(updatedStudent.getName());
            existingStudent.setStudId(updatedStudent.getStudId());
            existingStudent.setAge(updatedStudent.getAge());
            existingStudent.setAddress(updatedStudent.getAddress());
            existingStudent.setState(updatedStudent.getState());
            existingStudent.setZipcode(updatedStudent.getZipcode());
            existingStudent.setQualification(updatedStudent.getQualification());
            existingStudent.setPhoneNumber(updatedStudent.getPhoneNumber());
            existingStudent.setEmail(updatedStudent.getEmail());
            existingStudent.setPassword(updatedStudent.getPassword());

            return studentRegistrationService.saveStudent(existingStudent);
        } else {
            throw new RuntimeException("Student not found with id: " + id);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable int id) {
    	studentRegistrationService.deleteStudent(id);
    }
}
    
