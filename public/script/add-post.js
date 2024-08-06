// Function to add a post
async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_text = document.querySelector('textarea[name="post-text"]').value.trim();

  // Validate form data
  if (!title || !post_text) {
      alert('Please fill in all fields.');
      return;
  }

  try {
      const response = await fetch(`/api/posts`, {
          method: 'POST',
          body: JSON.stringify({
              title,
              post_text
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
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

