// Function to delete a post
async function deleteFormHandler(event) {
  event.preventDefault();

  // Get the ID from the URL
  const id = window.location.toString().split('/').pop();

  // Confirm the action with the user
  const confirmDelete = confirm('Are you sure you want to delete this post?');
  if (!confirmDelete) return;

  try {
      const response = await fetch(`/api/posts/${id}`, {
          method: 'DELETE',
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
      console.error('Failed to delete post:', error);
      alert('An error occurred while deleting the post.');
  }
}

document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
