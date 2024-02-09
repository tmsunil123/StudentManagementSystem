package com.student.main.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="student_registration")
public class StudentRegistration{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String studId;
	private int age;
	private String address;
	private String state;
	private int zipcode;
	private String qualification;
	private long phoneNumber;
	private String email;
	private String password;
		
	 @ManyToOne
	 @JoinColumn(name = "college_id")
	 private CollegeRegistration collegeRegistration;

}


