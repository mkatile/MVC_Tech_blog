// Function to add a comment
async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  // Extract the post ID from the URL
  const post_id = window.location.pathname.split('/').pop();

  if (comment_text) {
      try {
          const response = await fetch('/api/comments', {
              method: 'POST',
              body: JSON.stringify({
                  post_id,
                  comment_text
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          });

          if (response.ok) {
              document.location.reload();
          } else {
              const error = await response.json();
              alert(`Error: ${error.message || response.statusText}`);
          }
      } catch (error) {
          console.error('Failed to add comment:', error);
          alert('An error occurred while adding the comment.');
      }
  } else {
      alert('Please enter a comment.');
  }
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
