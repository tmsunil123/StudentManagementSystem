async function validateAndSubmit() {
    let studId = localStorage.getItem('studId');
    let college = document.getElementById('college').value;
    let branch = document.getElementById('branch').value;
    let collegeCategory = document.getElementById('collegeCategory').value;
    let hostelFacility = document.getElementById('hostelFacility').value;
    let yearsOfAdmission = document.getElementById('yearsOfAdmission').value;

    try {
        // Check if the student has already registered for a college 
        let checkResponse = await fetch(`http://localhost:8090/collegeRegistrationcontroller/checkRegistration?studId=${studId}`);
        let checkResult = await checkResponse.json();

        let messageRow = document.getElementById('messageRow');
        let messageCell = document.getElementById('messageCell');

        if (checkResult.alreadyRegistered) {
            messageCell.textContent = 'You have already registered for college.';
            messageRow.className = 'error-message';
        } else {
            let response = await fetch('http://localhost:8090/collegeRegistrationcontroller/submitRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studId: studId,
                    college: college,
                    branch: branch,
                    collegeCategory: collegeCategory,
                    hostelFacility: hostelFacility,
                    yearsOfAdmission: yearsOfAdmission,
                }),
            });

            let result = await response.json();

            if (result.status === 'success') {
                messageCell.textContent = 'College registration successful!';
                messageRow.className = 'success-message';
                // Move to student-details.html after user clicks 'OK'
                setTimeout(() => {
                    window.location.href = 'student-details.html';
                }, 2000); // Redirect after 2 seconds (adjust as needed)
            } else {
                messageCell.textContent = 'Error registering college: ' + result.message;
                messageRow.className = 'error-message';
            }
        }

        messageRow.style.display = 'table-row';
    } catch (error) {
        console.error('Error registering college:', error);
    }
}

function goBack() {
    window.history.back();
}
