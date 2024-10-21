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
