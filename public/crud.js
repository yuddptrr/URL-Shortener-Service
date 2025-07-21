document.querySelectorAll('.crud-form').forEach(form => {
  const code = form.dataset.code;

  // Handle Update
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const longUrl = form.querySelector('input[name="longUrl"]').value;
    const expiresAt = form.querySelector('input[name="expiresAt"]').value;

    const response = await fetch(`/api/urls/${code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl, expiresAt })
    });

    if (response.ok) {
      alert('Updated!');
      location.reload();
    } else {
      alert('Update failed');
    }
  });

  // Handle Delete
  form.querySelector('.delete-btn').addEventListener('click', async () => {
    if (!confirm('Are you sure you wanna delete this shortened url?')) return;

    const response = await fetch(`/api/urls/${code}`, { method: 'DELETE' });
    if (response.ok) {
      alert('Deleted!');
      location.reload();
    } else {
      alert('Delete failed');
    }
  });
});
