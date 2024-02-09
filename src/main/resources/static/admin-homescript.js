// admin-homescript.js

document.addEventListener('DOMContentLoaded', function () {
    function viewRegisteredStudents() {
        // Redirect to viewStudents.html when "View Registered Students" is clicked
        window.location.href = 'admin-viewregisterd_details.html';
    }
    
    function viewCollegeRegistrationCounts() {
        // Redirect to admin-registration_counts.html when "View College Registration Counts" is clicked
        window.location.href = 'admin-registration_counts.html';
    }

    function logout() {
        // Redirect to admin-login.html when logout button is clicked
        window.location.href = 'admin-login.html';
    }
    function back() {
 
    window.location.href = 'admin-login.html'; 
}


   
    // Assign the functions to the global scope so they can be accessed in the HTML onclick attributes
    window.viewRegisteredStudents = viewRegisteredStudents;
    window.viewCollegeRegistrationCounts = viewCollegeRegistrationCounts;
    
    window.logout = logout;
    window.back=back;
    
    
    
});
