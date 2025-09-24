
document.getElementById('openInternLogin').onclick = function() {
  document.getElementById('internLoginModal').style.display = 'block';
};
document.getElementById('closeInternLogin').onclick = function() {
  document.getElementById('internLoginModal').style.display = 'none';
};
document.getElementById('internLoginForm').onsubmit = async function(e) {
  e.preventDefault();
  const email = document.getElementById('internLoginEmail').value.trim();
  const password = document.getElementById('internLoginPassword').value;
  const sector = document.getElementById('internLoginSector').value;
  const msgBox = document.getElementById('internLoginMsg');
  msgBox.style.display = 'none';
  if (!email || !password) {
    msgBox.textContent = "Enter email and password.";
    msgBox.style.color = "#e65700";
    msgBox.style.display = 'block';
    return;
  }
  document.getElementById('internLoginSubmit').disabled = true;
  document.getElementById('internLoginSubmit').textContent = "Signing in...";
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Login failed.');
    msgBox.textContent = result.message + " Redirecting...";
    msgBox.style.color = "#16a34a";
    msgBox.style.display = 'block';
    setTimeout(() => {
      window.location.href = sector + ".html";
    }, 1200);
  } catch (err) {
    msgBox.textContent = err.message;
    msgBox.style.color = "#e65700";
    msgBox.style.display = 'block';
    document.getElementById('internLoginSubmit').disabled = false;
    document.getElementById('internLoginSubmit').textContent = "Sign in";
  }
};

