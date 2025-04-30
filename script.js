document.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs) {
    emailjs.init('orajXSyDCNOvfOSBN');
  }
  loadSeedUsers();
  const toggleButton = document.querySelector(".menu-toggle");
  const menuItems = document.querySelector(".menu-items");

  toggleButton?.addEventListener("click", () => {
    menuItems.classList.toggle("active");
  });

  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const recoverPasswordForm = document.getElementById("recoverPasswordForm");
  const forgotPasswordForm = document.getElementById("forgotPassword");
  registerForm?.addEventListener("submit", register);
  loginForm?.addEventListener("submit", login);
  recoverPasswordForm?.addEventListener("submit", recoverPassword);
  forgotPasswordForm?.addEventListener("submit", sendRecoveryEmail);
});

function togglePassword(icon) {
  const input = icon.nextElementSibling;
  if (input.type === "password") {
    input.type = "text";
    icon.classList = "bi bi-eye";
  } else {
    input.type = "password";
    icon.classList = "bi bi-eye-slash";
  }
}

async function loadSeedUsers() {
  const response = await fetch("./data/users.json");
  const data = await response.json();
  users = JSON.parse(localStorage.getItem("users"));

  if (users) return;

  localStorage.setItem("users", JSON.stringify(data));
}

function register(event) {
  event.preventDefault();
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  users = JSON.parse(localStorage.getItem("users"));

  const userObj = {
    id: Math.random(),
    name,
    email,
    password,
  };

  users.push(userObj);

  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "./dashboard.html";

  this.reset();
}

function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  users = JSON.parse(localStorage.getItem("users"));

  const validUser = users.find(
    (x) => x.email === email && x.password === password
  );

  if (!validUser) {
    showNotification('Usuario o contraseña incorrectos', 'error');
    return;
  }

  const userObj = {
    id: Math.random(),
    email,
    password,
  };

  localStorage.setItem("user", JSON.stringify(userObj));
  this.reset();

  window.location.href = "./dashboard.html";
}

function sendRecoveryEmail(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  users = JSON.parse(localStorage.getItem("users"));

  const user = users.find((x) => x.email === email);
  
  if (!user) {
    showNotification('No se encontró ninguna cuenta con este correo electrónico', 'error');
    return;
  }

  emailjs
    .send("service_3b3ea8j", "template_6r646vw", {
      email: email,
      link: `${window.location.origin}/recover-password.html?token=${user.id}`,
    })
    .then(
      function (response) {
        console.log("Correo enviado!", response.status, response.text);
        showNotification(`Se ha enviado un correo de recuperación a ${email}`);
        document.getElementById("forgotPassword").reset();
      },
      function (error) {
        console.log("Fallo al enviar el correo...", error);
        showNotification('Error al enviar el correo de recuperación', 'error');
      }
    );
}

function showNotification(message, type = 'success') {
  const notification = document.getElementById('notification');
  const notificationMessage = document.getElementById('notification-message');
  
  notification.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
  notificationMessage.textContent = message;
  notification.style.display = 'block';
  
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}


function recoverPassword(event) {
  event.preventDefault();
  const password = document.getElementById("password").value;

  const token = getUrlParam('token')

  users = JSON.parse(localStorage.getItem("users"));

  const userIndex = users.findIndex(x => x.id == token)

  if(userIndex > -1) {
    users[userIndex].password = password
  }

  localStorage.setItem("users", JSON.stringify(users));

  this.reset()
  window.location.href = "./login.html";
}

function getUrlParam(param) {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const value = params.get(param);
  return value
}
