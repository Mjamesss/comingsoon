// Set the date for the launch
const launchDate = new Date('Nov 30, 2024 00:00:00').getTime();

// Update the countdown every second
const timer = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = launchDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Display the result
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;

    // If the countdown is over
    if (timeRemaining < 0) {
        clearInterval(timer);
        document.getElementById('countdown').innerHTML = 'We are live!';
    }
}, 1000);

// Email validation function
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
};

// API URL based on environment
const apiUrl = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api/subscribe' 
    : 'https://your-production-url.com/api/subscribe';

document.getElementById('subscribe-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;

    // Validate the email format
    if (!email || !validateEmail(email)) {
        document.getElementById('message').innerText = 'Please enter a valid email.';
        return;
    }

    // Disable the submit button
    const submitButton = document.getElementById('subscribe-form').querySelector('button[type="submit"]');
    submitButton.disabled = true;

    // Send the email to your backend
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('message').innerText = data.message;
        document.getElementById('subscribe-form').reset(); // Reset the form
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Error submitting email.';

        if (error.response) {
            console.error('Response:', error.response);
        }
    })
    .finally(() => {
        submitButton.disabled = false; // Re-enable the button
    });
});
