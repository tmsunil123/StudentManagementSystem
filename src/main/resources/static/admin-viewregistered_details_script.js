// view-students-scripts.js

document.addEventListener('DOMContentLoaded', function () {
    loadStudents();

    function loadStudents() {
        // Fetch and display the list of registered students
        fetch('http://localhost:8090/studentRegistrationcontroller') // Adjust the endpoint according to your Spring Boot mapping
            .then(response => response.json())
            .then(students => displayStudents(students))
            .catch(error => console.error('Error fetching students:', error));
    }
   

       function displayStudents(students) {
        const studentTableBody = document.getElementById('studentTableBody');
        studentTableBody.innerHTML = '';

        students.forEach(student => {
            const tableRow = document.createElement('tr');

            const tableDataId = document.createElement('td');
            tableDataId.textContent = student.id;
            tableRow.appendChild(tableDataId);

            const tableDataName = document.createElement('td');
            tableDataName.textContent = student.name;
            tableRow.appendChild(tableDataName);

            const tableDataStudId = document.createElement('td');
            tableDataStudId.textContent = student.studId;
            tableRow.appendChild(tableDataStudId);

            const tableDataAge = document.createElement('td');
            tableDataAge.textContent = student.age;
            tableRow.appendChild(tableDataAge);

            const tableDataAddress = document.createElement('td');
            tableDataAddress.textContent = student.address;
            tableRow.appendChild(tableDataAddress);
            
            const tableDataState = document.createElement('td');
            tableDataState.textContent = student.state;
            tableRow.appendChild(tableDataState);
            
            const tableDataZipcode = document.createElement('td');
            tableDataZipcode.textContent = student.zipcode;
            tableRow.appendChild(tableDataZipcode);
            
            const tableDataPhoneNumber = document.createElement('td');
            tableDataPhoneNumber.textContent = student.phoneNumber;
            tableRow.appendChild(tableDataPhoneNumber);
            

            const tableDataEmail = document.createElement('td');
            tableDataEmail.textContent = student.email;
            tableRow.appendChild(tableDataEmail);

            const tableDataPassword = document.createElement('td');
            tableDataPassword.textContent = student.password;
            tableRow.appendChild(tableDataPassword);

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editStudent(student);

            const tableDataAction = document.createElement('td');
            tableDataAction.appendChild(editButton);
            tableRow.appendChild(tableDataAction);

            studentTableBody.appendChild(tableRow);
        });
    }



     function editStudent(student) {
        // Populate form fields with student details
        document.getElementById('editName').value = student.name;
        document.getElementById('editStudId').value = student.studId;
        document.getElementById('editAge').value = student.age;
        document.getElementById('editAddress').value = student.address;
        document.getElementById('editState').value = student.state;
        document.getElementById('editZipcode').value = student.zipcode;
        document.getElementById('editPhoneNumber').value = student.phoneNumber;
        document.getElementById('editEmail').value = student.email;
        document.getElementById('editPassword').value = student.password;

        // Show the edit form
        document.getElementById('editForm').style.display = 'block';

        const updateButton = document.getElementById('updateButton');
        updateButton.onclick = () => updateStudent(student.id);
    }

 function updateStudent(id) {
        // Update student details
        const updatedName = document.getElementById('editName').value;
        const updatedStudId = document.getElementById('editStudId').value;
        const updatedAge = document.getElementById('editAge').value;
        const updatedAddress = document.getElementById('editAddress').value;
        const updatedState = document.getElementById('editState').value;
        const updatedZipcode = document.getElementById('editZipcode').value;
        const updatedPhoneNumber = document.getElementById('editPhoneNumber').value;
        const updatedEmail = document.getElementById('editEmail').value;
        const updatedPassword = document.getElementById('editPassword').value;

        fetch(`http://localhost:8090/studentRegistrationcontroller/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updatedName,
                studId: updatedStudId,
                age: updatedAge,
                address: updatedAddress,
                state: updatedState,
                zipcode: updatedZipcode,
                phoneNumber: updatedPhoneNumber,
                email: updatedEmail,
                password: updatedPassword
            })
        })
        .then(response => response.json())
        .then(updatedStudent => {
            console.log('Student updated:', updatedStudent);
            loadStudents(); // Reload the student list after updating
        })
        .catch(error => console.error('Error updating student:', error));

        // Hide the edit form after updating
        document.getElementById('editForm').style.display = 'none';
    }
  function logout() {
    // Implement logout logic here
    // Redirect to the logout page or perform necessary actions
    window.location.href = 'admin-home.html'; // Example: Redirect to admin login page
}
window.logout = logout;
});
