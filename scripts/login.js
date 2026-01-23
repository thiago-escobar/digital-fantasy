document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            if (window.location.protocol !== 'file:') {
                const response = await fetch('data/users.json');
                const users = await response.json();

                const user = users.find(u => u.username === username && u.password === password);

                if (user) {
                    sessionStorage.setItem('name', user.name);
                    sessionStorage.setItem('id_user', user.id_user);
                    sessionStorage.setItem('role', user.role);
                    window.location.href = 'table.html';
                } else {
                    alert('Invalid username or password.');
                }
            }else{
                sessionStorage.setItem('name', "Thiago");
                sessionStorage.setItem('id_user', "1");
                sessionStorage.setItem('role', "dm");
                window.location.href = 'table.html';
            }
        } catch (error) {
            console.error('Error verifying login:', error);
            alert('An error occurred while trying to log in.');
        }
    });
});