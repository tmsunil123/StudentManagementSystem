// Array of valid admin credentials
const adminCredentials = [
    { username: 'admin', password: 'admin' },
    // Add more admin credentials as needed
];

function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Check if the provided credentials match any entry in the adminCredentials array
    const isValidCredentials = adminCredentials.some(cred => cred.username === username && cred.password === password);

    const errorMessageRow = document.getElementById('errorMessageRow');
    const errorMessageCell = document.getElementById('errorMessageCell');

    if (isValidCredentials) {
        window.location.href = 'admin-home.html';
    } else {
        errorMessageCell.textContent = 'Invalid username or password. Please try again.';
        errorMessageRow.style.display = 'table-row';
    }
}

function logout() {
    window.location.href = 'home.html';
}
