// Function to handle login
async function loginFormHandler(event) {
  event.preventDefault();

  // Get values from the form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
      try {
          const response = await fetch('/api/users/login', {
              method: 'POST',
              body: JSON.stringify({
                  email,
                  password
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              // Redirect to dashboard on successful login
              document.location.replace('/dashboard');
          } else {
              // Display an error message if login fails
              const error = await response.json();
              alert(`Login failed: ${error.message || response.statusText}`);
          }
      } catch (error) {
          console.error('Login request failed:', error);
          alert('An error occurred while trying to log in.');
      }
  } else {
      alert('Please enter both email and password.');
  }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
