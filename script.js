    function validateForm() {
        // Get form elements
        // const idNumberInput = document.getElementById('idNumber');
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const addressInput = document.getElementById('address');
        const qualificationInput = document.getElementById('qualification');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const registrationStatus = document.getElementById('registrationStatus');
    
        if (
            // !idNumberInput.value ||
            !nameInput.value ||
            !ageInput.value ||
            !addressInput.value ||
            !qualificationInput.value ||
            !emailInput.value ||
            !passwordInput.value
        ) {
            registrationStatus.innerHTML = 'All fields are required.';
            return;
        }
     
        // Age should be a positive number
        if (isNaN(ageInput.value) || ageInput.value <= 0) {
            registrationStatus.innerHTML = 'Please enter a valid age.';
            return;
        }
     
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            registrationStatus.innerHTML = 'Please enter a valid email address.';
            return;
        }
     
        // If all validations pass, proceed with registration
        registerUser();
    }
    function registerUser() {
    const registrationForm = document.getElementById('registrationForm');
    const registrationStatus = document.getElementById('registrationStatus');
     
    const formData = new FormData(registrationForm);

    fetch('http://localhost:8090/studentRegistrationcontroller/addstudentRegistration', {     
        method: 'POST',     
        body: JSON.stringify(Object.fromEntries(formData)), // Convert FormData to JSON    
        headers: { 
                    'Content-Type': 'application/json', 
                 },
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Registration failed');
        })
        .then(data => {
            registrationStatus.innerHTML = 'Registration successful!';
            console.log('Registration successful:', data);
     
            registrationForm.reset();
        })
        .catch(error => {
            registrationStatus.innerHTML = 'Registration failed. Please try again.';
            console.error('Error during registration:', error);
        });
    }
        

