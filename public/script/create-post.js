// Function to create a post
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_content = document.querySelector('textarea[name="post-content"]').value.trim(); // Changed to textarea to match your form

  if (title && post_content) {
      try {
          const response = await fetch('/api/posts', {
              method: 'POST',
              body: JSON.stringify({
                  title,
                  post_content
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              document.location.replace('/dashboard');
          } else {
              const error = await response.json();
              alert(`Error: ${error.message || response.statusText}`);
          }
      } catch (error) {
          console.error('Failed to create post:', error);
          alert('An error occurred while creating the post.');
      }
  } else {
      alert('Please fill in both the title and content.');
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
