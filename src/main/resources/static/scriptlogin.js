async function login() {
            // Clear previous studId if exists
            localStorage.removeItem('studId');

            let studId = document.getElementById('studId').value;
            let password = document.getElementById('password').value;

            try {
                let response = await fetch(`http://localhost:8090/studentRegistrationcontroller/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studId, password }),
                });

                let result = await response.json();

                if (result.success) {
                    // Set the studId in localStorage
                    localStorage.setItem('studId', studId);
                    window.location.href = `http://localhost:8090/home.html`;
                } else {
                    let loginError = document.getElementById('loginError');
                    loginError.innerText = result.message;
                    return false; // Prevent form submission on error
                }
            } catch (error) {
                console.error('Error during login:', error);
                let loginError = document.getElementById('loginError');
                loginError.innerText = 'An unexpected error occurred';
                return false; // Prevent form submission on error
            }
        }