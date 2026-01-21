document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('users.json');
            const users = await response.json();

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                window.location.href = 'table.html';
            } else {
                alert('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error verifying login:', error);
            alert('An error occurred while trying to log in.');
        }
    });
});