function adminLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        window.location.href = 'admin-home.html';
    } else {
        alert('Invalid credentials. Please try again.');
    }
}
