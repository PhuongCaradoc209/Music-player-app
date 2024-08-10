
function check_Login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const standard_name = "DongPhuong";
    const standard_pass = "Phuongphuong209#";
    if (username == '' || password == '') {
        document.getElementById("warning_text").innerHTML = '*Please enter all fields';
        return false;
    }

    if (username == standard_name && password != standard_pass) {
        document.getElementById("warning_text").innerHTML = "*Wrong password";
        return false;
    } else if (username != standard_name) {
        document.getElementById("warning_text").innerHTML = "*Wrong username";
        return false;
    } else if (username == standard_name && password == standard_pass) {
        window.location.href = 'playSong.html';
        return false;
    }
}