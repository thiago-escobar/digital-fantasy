document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is logged in by retrieving data from sessionStorage
    const name = sessionStorage.getItem('name');
    const role = sessionStorage.getItem('role');

    if (!name) {
        // User is not logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }

    // Display a welcome message in the main area
    const welcomeSpot = document.querySelector('#welcome-message');
    const welcomeMsg = document.createElement('h2');
    welcomeMsg.textContent = `Welcome, ${name} (${role})`;
    welcomeMsg.style.textAlign = 'center';
    welcomeSpot.appendChild(welcomeMsg);
});