const API_URL = 'http://localhost:8000/api'; // Change if your backend is hosted elsewhere

// Reusable function to get access and refresh tokens
export const getTokens = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }), // Use username instead of email
  });
  
    if (!response.ok) {
      throw new Error('Login failed');
    }
  
    const data = await response.json();
    
    // Store tokens in local storage
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
}

export const registerUser = async (username: string, email: string, password: string) => {
  const response = await fetch(`${API_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  
  if (!response.ok) {
    throw new Error('Registration failed');
  }

  console.log('Registration successful');

  await getTokens(username, password);
}

export const loginUser = async (username: string, password: string) => {
  await getTokens(username, password);
  console.log('Login successful');
}


export const readAccessToken = async () => {
  const response = await fetch(`${API_URL}/user/`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    }
  });

  if (!response.ok) {
    localStorage.removeItem('accessToken');
    return null;
  }

  return localStorage.getItem('accessToken');
}

export const logoutUser = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  console.log('Logout successful');
  // window.location.href = '/login'; // Redirect to login page after logout
}