function validatesignupForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var email = document.getElementById('email').value;

    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
        alert('Please fill in all fields');
        return false;
    }
    return true;
}

function validateloginForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields');
        return false;
    }
    return true;
}