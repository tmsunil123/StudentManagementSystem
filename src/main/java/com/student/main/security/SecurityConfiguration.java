//package com.student.main.security;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.DefaultSecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfiguration extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
//
//	@Override
//	public void configure(HttpSecurity http) throws Exception {
//		
//		http.authorizeRequests()
//		.requestMatchers("/studentRegistrationcontroller/addstudentRegistration").permitAll()
//		.anyRequest().authenticated()
//		.and().csrf().disable();
//	}
//	
//	
//	
//
//}
