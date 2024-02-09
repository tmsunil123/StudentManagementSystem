package com.student.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.student.main.service.StudentRegistrationService;

@RestController

public class ApiRegistrationController {

 private final StudentRegistrationService studentRegistrationService;

 @Autowired
 public ApiRegistrationController(StudentRegistrationService studentRegistrationService) {
     this.studentRegistrationService = studentRegistrationService;
 }

 @GetMapping("/users/api/login")
 public ApiResponse loginUser(@RequestParam String studId, @RequestParam String password) {
     if (studentRegistrationService.isValidLogin(studId, password)) {
         return new ApiResponse(true, "Login successful");
     } else {
         return new ApiResponse(false, "Invalid login credentials");
     }
 }

}