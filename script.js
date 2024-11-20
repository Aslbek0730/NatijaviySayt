// Auth state management
let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

// Check auth status and update UI
function updateAuthUI() {
  const authLinks = document.querySelectorAll('.nav-links');
  
  authLinks.forEach(navLinks => {
    if (authToken) {
      navLinks.innerHTML = `
        <a href="/">Home</a>
        <a href="/page2.html">Portfolio</a>
        <a href="#" onclick="logout(event)">Logout</a>
        <span class="user-info">Welcome, ${currentUser.username}</span>
      `;
    } else {
      navLinks.innerHTML = `
        <a href="/">Home</a>
        <a href="/page2.html">Portfolio</a>
        <a href="/register.html">Register</a>
        <a href="/login.html">Login</a>
      `;
    }
  });
}

// Logout function
function logout(e) {
  e.preventDefault();
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
  authToken = null;
  currentUser = null;
  updateAuthUI();
  window.location.href = '/';
}

// Form handling
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();

  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          authToken = data.token;
          currentUser = data.user;
          window.location.href = '/';
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('An error occurred during login');
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        
        if (response.ok) {
          localStorage.setItem('authToken', data.token);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          authToken = data.token;
          currentUser = data.user;
          window.location.href = '/';
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error('Registration error:', err);
        alert('An error occurred during registration');
      }
    });
  }
});