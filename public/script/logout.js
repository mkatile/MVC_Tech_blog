// Function to handle logout
async function logout() {
  try {
      const response = await fetch('/api/users/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
          // Redirect to the homepage on successful logout
          document.location.replace('/');
      } else {
          // Display an error message if logout fails
          const error = await response.json();
          alert(`Logout failed: ${error.message || response.statusText}`);
      }
  } catch (error) {
      console.error('Logout request failed:', error);
      alert('An error occurred while trying to log out.');
  }
}

// Add event listener to the logout button
document.querySelector('#logout').addEventListener('click', logout);
