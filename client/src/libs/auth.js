const accessTokenKey = 'accessToken';

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
}

export const login = async (email, password) => {
  const response = await fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem(accessTokenKey, token);
  }
  return response.ok;
}

export const isLoggedIn = () => {
  return !!localStorage.getItem(accessTokenKey);
}

export const logout = () => {
  localStorage.removeItem(accessTokenKey);
}