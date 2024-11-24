// Mock user data for demonstration
const users = [
    { username: "admin", password: "123", role: "Admin" },
    { username: "manager", password: "123", role: "Manager" },
    { username: "employee", password: "123", role: "Employee" },
];

// Handle login
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Authenticate user
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
        // Save session data
        localStorage.setItem("user", JSON.stringify(user));
        redirectUser(user.role);
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});

// Redirect based on role
function redirectUser(role) {
    if (role === "Admin") window.location.href = "../Admin/admin.html";
    else if (role === "Manager") window.location.href = "../Manager/manager.html";
    else if (role === "Employee") window.location.href = "../Employee/employee.html";
}
