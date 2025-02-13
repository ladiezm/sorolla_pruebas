import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup,createUserWithEmailAndPassword, signInWithRedirect,getRedirectResult, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc,getDoc, setDoc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
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

function isMobile() {
    // Esto verifica si el dispositivo es móvil basándose en el userAgent.
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

const loginWithGoogle = () => {
    if (isMobile()) {
        // Iniciar redirección de Google
        signInWithRedirect(auth, provider);
        
        // Asegurarse de que el resultado de la redirección se maneje
        setTimeout(() => {
            getRedirectResult(auth)
                .then((result) => {
                    if (result) {
                        const user = result.user;
                        console.log("Usuario autenticado tras redirección:", user);
                        // Guardar el usuario en Firestore
                        checkAndSaveUserToFirestore(user); 
                    } else {
                        console.log("No se obtuvo un resultado de redirección en móvil");
                        alert("No se obtuvo un resultado de redirección. Intenta de nuevo.");
                    }
                })
                .catch((error) => {
                    console.error("Error al manejar la redirección en móvil:", error);
                    alert("Error al manejar la redirección: " + error.message);
                });
        }, 2000);  // Esperamos un poco más de tiempo antes de intentar obtener el resultado
    } else {
        // Para escritorio, usamos el popup
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Usuario autenticado:", user);
                // Verificar si el usuario ya está en Firestore
                checkAndSaveUserToFirestore(user);
            })
            .catch((error) => {
                console.error("Error al manejar el popup en escritorio:", error);
                alert("Error al manejar la redirección: " + error.message);
            });
    }
};

// Verificar si el usuario ya está en Firestore y guardarlo si no existe
const checkAndSaveUserToFirestore = (user) => {
    const userRef = doc(db, "users", user.uid); // Referencia en la colección 'users'
    
    // Verificar si el usuario ya existe en Firestore
    getDoc(userRef)
        .then((docSnapshot) => {
            if (!docSnapshot.exists()) {
                // Si el usuario no existe en Firestore, lo guardamos
                console.log("El usuario no existe en Firestore, guardando...");
                saveUserToFirestore(user);
            } else {
                console.log("El usuario ya existe en Firestore");
            }
        })
        .catch((error) => {
            console.error("Error al verificar usuario en Firestore:", error);
        });
};

// Función para iniciar sesión con correo y contraseña
const emailLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // El usuario se autenticó con éxito
            const user = userCredential.user;
            console.log("Usuario autenticado:", user);
            window.location.href = 'ind.html';
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
    // Lógica de registro
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Usuario registrado:", user);
            // Guardar en Firestore si el registro es exitoso
            saveUserToFirestore(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error al registrar el usuario:", errorCode, errorMessage);
            alert("Error al registrar el usuario: " + errorMessage);  // Muestra un mensaje de error
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
        window.location.href = 'ind.html';
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

