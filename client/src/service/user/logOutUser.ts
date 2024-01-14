import axios from 'axios';

export default async function logoutUser() {
  try {
    await fetch('/api/deleteToken', {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Logout Error');
  }

  axios.defaults.headers.common['Authorization'] = ``;
}
