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
   
   // Set up our register function
   function register () {
     // Get all our input fields
     email = document.getElementById('email').value
     password = document.getElementById('password').value
     full_name = document.getElementById('full_name').value
     // favourite_song = document.getElementById('favourite_song').value
     // milk_before_cereal = document.getElementById('milk_before_cereal').value
   
     // Validate input fields
     if (validate_email(email) == false || validate_password(password) == false) {
       alert('¡El correo electrónico o la contraseña están fuera de línea!')
       return
       // Don't continue running the code
     }
     if (validate_field(full_name) == false  /*validate_field(favourite_song) == false ||*/ ) {
       alert('¡Uno o más campos adicionales están fuera de línea!')
       return
     }
    
     // Move on with Auth
     auth.createUserWithEmailAndPassword(email, password)
     .then(function() {
       // Declare user variable
       var user = auth.currentUser
   
       // Add this user to Firebase Database
       var database_ref = database.ref()
   
       // Create User data
       var user_data = {
         email : email,
         full_name : full_name,
         // favourite_song : favourite_song,
         // milk_before_cereal : milk_before_cereal,
         last_login : Date.now()
       }
   
       // Push to Firebase Database
       database_ref.child('users/' + user.uid).set(user_data)
   
       // DOne
       alert('Usuario creado!')
     })
     .catch(function(error) {
       // Firebase will use this to alert of its errors
       var error_code = error.code
       var error_message = error.message
         
     })
   }
   
   // Set up our login function
   function login () {
     // Get all our input fields
     email = document.getElementById('email').value
     password = document.getElementById('password').value
   
     // Validate input fields
     if (validate_field(email) == false || validate_field(password) == false){
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
   
       location.href = "main.html";
       var x = document(main.html).getElementById("entrar");
       x.login = true;
  
       // Push to Firebase Database
       database_ref.child('users/' + user.uid).update(user_data)
   
       // // DOne
       // alert('User Logged In!!')
   
     })
     .catch(function(error) {
       // Firebase will use this to alert of its errors
       var error_code = error.code
      var error_message = error.message
      if (error_message == "A network error (such as timeout, interrupted connection or unreachable host) has occurred.")
       alert("Verifique su conexión a internet")
     else 
     if (error_message == "The password is invalid or the user does not have a password.")
     alert("La contraseña es incorrecta")
     })
   }
   
   // Validate Functions
   function validate_email(email) {
     expression = /^[^@]+@\w+(\.\w+)+\w$/
     if (expression.test(email) == true) {
       // Email is good
       return true
     } else {
       // Email is not good
       return false
     }
   }
   
   function validate_password(password) {
     // Firebase only accepts lengths greater than 6
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