// Configuración de Firebase (reemplaza con tus propias credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyCqmYlvwkHnNbzXHRqQCUCtXcHt7UdZR_0",
  authDomain: "saratonga-e93a9.firebaseapp.com",
  projectId: "saratonga-e93a9",
  
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Seleccionar elementos del DOM
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Función para agregar usuario a Firestore
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    db.collection("usuarios").add({
        nombre: name,
        email: email
    }).then(() => {
        console.log("Usuario añadido con éxito!");
        userForm.reset();
        loadUsers(); // Recargar la lista de usuarios después de añadir uno nuevo
    }).catch((error) => {
        console.error("Error añadiendo usuario: ", error);
    });
});

// Función para cargar usuarios desde Firestore
function loadUsers() {
    userList.innerHTML = ""; // Limpiar la lista antes de cargar
    db.collection("usuarios").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const user = doc.data();
            const li = document.createElement('li');
            li.textContent = `${user.nombre} - ${user.email}`;
            userList.appendChild(li);
        });
    });
}

// Cargar usuarios al iniciar
loadUsers();
