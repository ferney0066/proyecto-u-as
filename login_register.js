// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAzrG9T3jL6h4d-5lb7cp7F6xv2SNb3opY",
    authDomain: "login-final-project-712de.firebaseapp.com",
    projectId: "login-final-project-712de",
    storageBucket: "login-final-project-712de.appspot.com",
    messagingSenderId: "865343182877",
    appId: "1:865343182877:web:222d673e7caf12ac8fcef4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Initialize variables
    const auth = firebase.auth()
    const database = firebase.database()
    
    function register () {
      // Obtenemos los ids
      email = document.getElementById('email').value
      password = document.getElementById('password').value
      full_name = document.getElementById('full_name').value
     
      if (validate_field(email) == false || validate_field(password) == false || validate_field(full_name)==false){
        alert("Debe digitar todos los campos")
        return
      }
      else 
        if (validate_email(email) == false){
          alert('¡El correo electrónico está mal escrito!')
          return
        }
        else 
          if (validate_password(password) == false){ 
            alert('La contraseña debe tener mínimo 6 caracteres')    
            return
          }
    
     
      auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Declarar  variables
        var user = auth.currentUser
    
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          email : email,
          full_name : full_name,
          
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
    
        // DOne
        alert('Usuario creado!!')
      })
      .catch(function(error) {
        // Firebase will use this to alert of its errors
        var error_code = error.code
        var error_message = error.message
    
         if (error_message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.")
           alert("Verifique su conexión")
         else 
          alert(error_message)
      })
    }
    
    // Set up our login function
    function login () {
      // Get all our input fields
      email = document.getElementById('email').value
      password = document.getElementById('password').value
    
      // Validate input fields
      if (validate_email(email) == false || validate_password(password) == false) {
        alert('¡El correo electrónico esta mal escrito')
        return
        // Don't continue running the code
      }
    
      auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)
    
        // DOne
        alert('¡¡Usuario registrado!!')
    
      })
      .catch(function(error) {
        var error_code = error.code
    
        alert("hola")
      }).then()
    }
    
    
    
    
    
    function validate_email(email) {
      expression = /^[^@]+@\w+(\.\w+)+\w$/
      if (expression.test(email) == true) {
        return true
      } else {
        return false
      }
    }
  
    // Valida la longitud de la contraseña
    
    function validate_password(password) {
      
      if (password < 6) {
        return false
      } else {
        return true
      }
    }
    
    function validate_field(field) {
      if (field == null) {
        return false
      }
    
      if (field.length <= 0) {
        return false
      } else {
        return true
      }
    }
  

    document.getElementById('formRegistro').addEventListener('submit', function(event) {
      event.preventDefault();
      const nombre = document.getElementById('full_name').value;
      const correo = document.getElementById('email').value;
      const genero = document.getElementById('genero').value;

      // Guardar los datos en localStorage
      localStorage.setItem('full_name', nombre);
      localStorage.setItem('email', correo);
      localStorage.setItem('genero', genero);

      alert('Registro exitoso');
  });
