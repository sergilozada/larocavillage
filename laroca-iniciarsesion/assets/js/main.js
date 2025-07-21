// ✅ Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCxtdDswO9Ua7raxrKDOuFHt0_l2aILofQ",
  authDomain: "inmobiliariaaccesos.firebaseapp.com",
  databaseURL: "https://inmobiliariaaccesos-default-rtdb.firebaseio.com",
  projectId: "inmobiliariaaccesos",
  storageBucket: "inmobiliariaaccesos.appspot.com",
  messagingSenderId: "982195590492",
  appId: "1:982195590492:web:9320cb8d812951ddb45d99",
  measurementId: "G-8C9ESL0Z3T"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// 🔒 Mostrar/Ocultar contraseña
const showHiddenPass = (loginPass, loginEye) => {
  const input = document.getElementById(loginPass),
        iconEye = document.getElementById(loginEye);

  iconEye.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text';
      iconEye.classList.add('ri-eye-line');
      iconEye.classList.remove('ri-eye-off-line');
    } else {
      input.type = 'password';
      iconEye.classList.remove('ri-eye-line');
      iconEye.classList.add('ri-eye-off-line');
    }
  });
};

showHiddenPass('login-pass', 'login-eye');

// 🚪 Login
document.querySelector('.login__form').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value.trim();

  const userKey = email.replace(/[@.]/g, "_");

  db.ref('usuarios/' + userKey).once('value', snapshot => {
    if (!snapshot.exists()) {
      alert('Usuario no registrado.');
    } else if (snapshot.val().password === password) {
      localStorage.setItem("acceso", "ok");
      window.location.href = "dashboard.html"; // redirige al dashboard
    } else {
      alert('Contraseña incorrecta.');
    }
  });
});
