// Function to edit a post
async function editFormHandler(event) {
  event.preventDefault();

  // Get values from the form
  const title = document.querySelector('input[name="post-title"]').value;
  const post_content = document.querySelector('textarea[name="post-content"]').value; // Changed to textarea if applicable
  const id = window.location.toString().split('/').pop(); // Get the post ID from the URL

  try {
      const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
              title,
              post_content
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      });

      if (response.ok) {
          document.location.replace('/dashboard/');
      } else {
          const error = await response.json();
          alert(`Error: ${error.message || response.statusText}`);
      }
  } catch (error) {
      console.error('Failed to update post:', error);
      alert('An error occurred while updating the post.');
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
