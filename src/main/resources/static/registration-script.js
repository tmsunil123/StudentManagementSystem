async function validateForm() {
    const studIdInput = document.getElementById('studId');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const addressInput = document.getElementById('address');
    const qualificationInput = document.getElementById('qualification');
    const stateInput = document.getElementById('state');
    const zipcodeInput = document.getElementById('zipcode');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
   
   
   
    const registrationStatus = document.getElementById('registrationStatus');

    // Clear previous error messages
    document.querySelectorAll('.error').forEach(errorElement => {
        errorElement.textContent = '';
    });

    if (
        !studIdInput.value ||
        !nameInput.value ||
        !ageInput.value ||
        !addressInput.value ||
        !qualificationInput.value ||
        !emailInput.value ||
        !passwordInput.value ||
        !phoneNumberInput.value ||
        !stateInput.value ||
        !zipcodeInput.value
    ) {
        registrationStatus.innerHTML = '<span style="color: red;">All fields are required.</span>';
        return;
    }

    // Age should be a positive number
    if (isNaN(ageInput.value) || ageInput.value <= 0) {
        document.getElementById('ageError').innerHTML = '<span style="color: red;">Please enter a valid age.</span>';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        document.getElementById('emailError').innerHTML = '<span style="color: red;">Please enter a valid email address.</span>';
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(passwordInput.value)) {
        document.getElementById('passwordError').innerHTML = '<span style="color: red;">Password must include lowercase, capital, number, special character, and be at least 8 characters long.</span>';
        return;
    }
    // Phone Number validation
    const phoneNumberRegex = /^\d{10}$/;
    if (!phoneNumberRegex.test(phoneNumberInput.value)) {
        document.getElementById('phoneNumberError').innerHTML = '<span style="color: red;">Please enter a valid 10-digit phone number.</span>';
        return;
    }

    // State validation (you can customize this validation)
    if (stateInput.value.length < 2) {
        document.getElementById('stateError').innerHTML = '<span style="color: red;">Please enter a valid state.</span>';
        return;
    }

    // Zipcode validation
    const zipcodeRegex = /^\d{6}$/;
    if (!zipcodeRegex.test(zipcodeInput.value)) {
        document.getElementById('zipcodeError').innerHTML = '<span style="color: red;">Please enter a valid 6-digit zipcode.</span>';
        return;
    }
    const studIdExists = await checkStudIdExists(studIdInput.value);

    if (studIdExists) {
        document.getElementById('studIdError').innerHTML = '<span style="color: red;">The provided Stud ID is already in use.</span>';
        return;
    }
    
    // If all validations pass, proceed with registration
    registerUser();
}
async function checkStudIdExists(studId) {
    try {
        const response = await fetch(`http://localhost:8090/studentRegistrationcontroller/checkStudIdExists/${studId}`);
        const data = await response.json();
        return data.studIdExists;
    } catch (error) {
        console.error('Error checking studId existence:', error);
        return false;
    }
}
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePasswordIcon = document.getElementById('togglePassword');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePasswordIcon.textContent = '👁️';
    } else {
        passwordInput.type = 'password';
        togglePasswordIcon.textContent = '👁️';
    }
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
            registrationStatus.style.color = '#4caf50';
            console.log('Registration successful:', data);
     
            registrationForm.reset();
        })
        .catch(error => {
            registrationStatus.innerHTML = 'Registration failed. Please try again.';
            registrationStatus.style.color = 'red';
            console.error('Error during registration:', error);
        });
    }
