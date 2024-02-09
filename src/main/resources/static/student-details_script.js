async function getAllColleges() {
    let studId = localStorage.getItem('studId');

    try {
        let response = await fetch(`http://localhost:8090/collegeRegistrationcontroller/getAllColleges?studId=${studId}`);
        let data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
            var collegesContainer = document.getElementById('collegesContainer');
            collegesContainer.innerHTML = ''; // Clear previous data

            data.forEach(college => {
                var collegeDetails = document.createElement('div');
                collegeDetails.classList.add('college-details'); // Add a class for styling

                // Create and append elements for each detail
                collegeDetails.innerHTML = `
                    <p><strong>College:</strong> ${college.college}</p>
                    <p><strong>Branch:</strong> ${college.branch}</p>
                    <p><strong>Category:</strong> ${college.collegeCategory}</p>
                    <p><strong>Hostel:</strong> ${college.hostelFacility}</p>
                    <p><strong>Admission Year:</strong> ${college.yearsOfAdmission}</p>
                `;

                collegesContainer.appendChild(collegeDetails);
            });
        } else {
            // Handle the case when no colleges are registered
            var noCollegesMessage = document.getElementById('noCollegesMessage');
            noCollegesMessage.textContent = 'No colleges registered.';
        }
    } catch (error) {
        console.error('Error fetching colleges:', error);
    }
}

// Call the function to fetch and display colleges when the student-details page loads
window.onload = getAllColleges;
function goBack() {
    window.history.back();
}
