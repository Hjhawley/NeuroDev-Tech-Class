const correctPassword = "love2code!";

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.protected-link').forEach(link => {
        link.addEventListener('click', function (event) {
            if (localStorage.getItem('isAuthenticated') !== 'true') {
                event.preventDefault();
                const enteredPassword = prompt("Please enter the course password:");
                if (enteredPassword === correctPassword) {
                    localStorage.setItem('isAuthenticated', 'true');
                    alert("Access Granted! You can now view all course materials.");
                    window.open(link.href, '_blank');
                } else {
                    alert("Incorrect password. Please try again.");
                }
            }
        });
    });
});

function logout() {
    localStorage.removeItem('isAuthenticated');
    alert("You have been logged out.");
}
