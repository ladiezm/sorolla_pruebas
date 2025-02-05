import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAuLI1Uc7oQJjc-cSD1fx0LdMnytzWjKAM",
    authDomain: "sorollainsights.firebaseapp.com",
    projectId: "sorollainsights",
    storageBucket: "sorollainsights.firebasestorage.app",
    messagingSenderId: "294026666781",
    appId: "1:294026666781:web:ea0a570fc4f8bc3dcd37f4",
    measurementId: "G-ZMGVHNPG7S"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// Inicializa Firestore
const db = getFirestore();

// Función para detectar si es un dispositivo móvil
function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Función para iniciar sesión con Google
const loginWithGoogle = () => {
    if (isMobile()) {
        // Si es un dispositivo móvil, usar redirección
        signInWithRedirect(auth, provider);
        // Llamar a esta función al cargar la página para manejar la redirección
        handleRedirectResult();
    } else {
        // Si es escritorio, usar ventana emergente
        signInWithPopup(auth, provider)
            .then((result) => {
                // El usuario se autenticó con éxito
                const user = result.user;
                console.log("Usuario autenticado:", user);
                // Guardar los datos del usuario en Firestore
                saveUserToFirestore(user);
            })
            .catch((error) => {
                // Manejo de errores
                console.error("Error al iniciar sesión con Google:", error);
            });
    }
};

// Manejar el resultado de la redirección (solo para dispositivos móviles)
const handleRedirectResult = () => {
    getRedirectResult(auth)
        .then((result) => {
            if (result) {
                const user = result.user;
                console.log("Usuario autenticado tras redirección:", user);
                // Guardar los datos del usuario en Firestore
                saveUserToFirestore(user);
            }
        })
        .catch((error) => {
            // Manejo de errores
            console.error("Error al manejar el resultado de la redirección:", error);
        });
};

// Función para iniciar sesión con correo y contraseña
const emailLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // El usuario se autenticó con éxito
            const user = userCredential.user;
            console.log("Usuario autenticado:", user);
        })
        .catch((error) => {
            // Manejo de errores
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error al iniciar sesión:", errorCode, errorMessage);
            alert("Error al iniciar sesión: " + errorMessage);  // Muestra un mensaje de error
        });
};

// Función para registrar usuario con correo y contraseña
const emailSignup = (email, password) => {
    let reg = $("#registrado");
    let inv = $("#invalido");
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
            reg.hide();
            inv.hide();
            saveUserToFirestore(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error al registrar usuario:", errorCode, errorMessage);

            if (errorCode === 'auth/email-already-in-use') {
               reg.removeClass('d-none').show();
            } else if (errorCode === 'auth/invalid-email') {
               inv.removeClass('d-none').show();
            } else {
                alert("Error: " + errorMessage);
            }
        });
};

const saveUserToFirestore = (user) => {
    const userRef = doc(db, "users", user.uid); // Referencia en la colección 'users'

    // Obtener nombre predeterminado si no existe
    const defaultDisplayName = user.email.split('@')[0]; // Parte anterior al '@'
    const defaultPhotoURL = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"; // URL de imagen predeterminada

    // Guardar los datos del usuario en Firestore
    setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || defaultDisplayName, // Usar nombre o parte anterior al '@'
        photoURL: user.photoURL || defaultPhotoURL, // Usar foto o imagen predeterminada
        lastLogin: new Date() // Fecha de inicio de sesión
    })
    .then(() => {
        console.log("Usuario guardado en Firestore con UID:", user.uid);
        window.location.href = '/menu';
    })
    .catch((error) => {
        console.error("Error al guardar usuario en Firestore:", error);
    });
};

const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
        .then(() => {
            alert("Correo de recuperación de contraseña enviado. Revisa tu bandeja de entrada.");
        })
        .catch((error) => {
            console.error("Error al enviar correo de recuperación:", error);
            if (error.code === 'auth/user-not-found') {
                alert("No se encontró una cuenta con ese correo electrónico.");
            } else if (error.code === 'auth/invalid-email') {
                alert("El formato del correo electrónico es inválido.");
            } else {
                alert("Error: " + error.message);
            }
        });
};


// Manejar el evento de inicio de sesión con Google
$("#google-login-btn").on("click", loginWithGoogle);

// Manejar el evento de inicio de sesión con correo y contraseña
$("#email-login-form").on("submit", (e) => {
    e.preventDefault();
    const email = $("#email").val();
    const password = $("#password").val();
    emailLogin(email, password);
});

// Manejar el evento de registro con correo y contraseña
$("#email-signup-form").on("submit", (e) => {
    e.preventDefault();
    const email = $("#email_reg").val();
    const password = $("#password_reg").val();
    let long = $("#longitud");
    let especial = $("#especial");
    if (!long.is(":visible") || !especial.is(":visible")) {
        emailSignup(email, password);
    }    
});

$("#password_reg").on("input",function(){
    let long = $("#longitud");
    let especial = $("#especial");
    // Validaciones de contraseña antes de registrar
    if (this.value.length < 6) {
       long.removeClass('d-none').show();
    }else{
        long.hide();
    }

    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!regex.test(this.value)) {
        especial.removeClass('d-none').show();
    }else{
        especial.hide();
    }
});
