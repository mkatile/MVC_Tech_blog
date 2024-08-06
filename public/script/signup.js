// Function to handle user signup
async function signupFormHandler(event) {
  event.preventDefault();

  // Retrieve values from the form
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const twitter = document.querySelector('#twitter-signup').value.trim();
  const github = document.querySelector('#github-signup').value.trim();

  // Check that required fields are filled out
  if (username && email && password) {
      try {
          const response = await fetch('/api/users', {
              method: 'POST',
              body: JSON.stringify({
                  username,
                  email,
                  twitter,
                  github,
                  password
              }),
              headers: { 'Content-Type': 'application/json' }
          });

          // Check if the response is okay
          if (response.ok) {
              console.log('Signup successful');
              document.location.replace('/dashboard');
          } else {
              const error = await response.json();
              alert(`Signup failed: ${error.message || response.statusText}`);
          }
      } catch (error) {
          console.error('Signup request failed:', error);
          alert('An error occurred during signup. Please try again.');
      }
  } else {
      alert('Please fill out all required fields.');
  }
}

// Add event listener to the signup form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
