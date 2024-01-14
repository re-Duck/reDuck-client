import axios from 'axios';

export default async function logoutUser() {
  console.log('a');
  try {
    await fetch('/api/deleteToken', {
      method: 'DELETE',
    });
  } catch {
    throw new Error('Logout Error');
  }

  axios.defaults.headers.common['Authorization'] = ``;
}
