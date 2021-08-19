window.onload = function (){
    btnRegistrar = document.getElementById("btnRegistrar");
    ingreso = document.getElementById("ingreso");
    registro = document.getElementById("registro");
    principal= document.getElementById("principal");
    txtCorreo = document.getElementById("correoR");
    txtNombre = document.getElementById("nombreR");
    txtContrasena = document.getElementById("contrasenaR");
    txtConfirmacion = document.getElementById("confirmacionR");
    txtFecha = document.getElementById("fechaR");
    btnRegistro = document.getElementById("btnRegistro");
    btnIngresar = document.getElementById("btnIngresar");
    txtCorreoI = document.getElementById("correoI");
    txtContrasenaI = document.getElementById("contrasenaI");
    nombreP =  document.getElementById("nombreP");

    btnEnvia = document.getElementById("btnEnviaM");
    txtPara = document.getElementById("correoM");
    txtMensaje = document.getElementById("mensajeM");
    photo = document.getElementById("photo");
    camera = document.getElementById("camera");
    mapa = document.getElementById("mapa");
    //open = document.getElementById("open");
     
    /*temporal mientras se activa el servidor
    localStorage.setItem("login", 1);
    localStorage.setItem("nombre", "Regis");
    localStorage.setItem("correo", "regis@prueba.com");

    if(localStorage.getItem("login") !== "1"){
      ingreso.style.display ="block";
      principal.style.display = "none";
      redactar.style.display = "none";
      document.getElementById("camara").style.display = "none";
    }
    else{
      ingreso.style.display = "none";
      principal.style.display = "block";
      redactar.style.display = "block";
      nombre = localStorage.getItem("nombre");
      correo = localStorage.getItem("correo");
      document.getElementById("nombreP").innerHTML = nombre;
      leerM();
    }*/
}

btnRegistrar.addEventListener("click", function () {
  ingreso.style.display="none";
  registro.style.display="block";

});


btnRegistro.addEventListener("click", function () {
  if(txtCorreo.value == ""){
    alert ("Debe escribir el correo");
    txtCorreo.classList.add("errorCampo");
    return false;
  }
  else{
    txtCorreo.classList.remove("errorCampo");
  }

  if(txtNombre.value == ""){
    alert ("Debe escribir el nombre");
    txtNombre.classList.add("errorCampo");
    return false;
  }
  else{
    txtNombre.classList.remove("errorCampo");
  }

  if(txtContrasena.value == "")
  {
      alert("Debe escribir una contraseña");
      txtContrasena.classList.add("errorCampo");
      return false;
  }
  else{
    txtContrasena.classList.remove("errorCampo");
  }

  if(txtConfirmacion.value == "")
  {
      alert("Debe escribir la contraseña para que coincidan");
      txtConfirmacion.classList.add("errorCampo");
      return false;
  }
  else{
    txtConfirmacion.classList.remove("errorCampo");
  }

  if(txtContrasena.value !== txtConfirmacion.value){
    alert ("Ingrese la misma contrasena");
    txtContrasena.classList.add("errorCampo");
    txtConfirmacion.classList.add("errorCampo");
    return false;
  }
  else{
    txtContrasena.classList.remove("errorCampo");
    txtConfirmacion.classList.remove("errorCampo");
  }

  if(txtFecha.value == "")
  {
      alert("Debe escribir la fecha");
      txtFecha.classList.add("errorCampo");
      return false;
  }
  else{
    txtFecha.classList.remove("errorCampo");
  }

  let datos = new FormData();
  datos.append("correoR", txtCorreo.value);
  datos.append("nombreR", txtNombre.value);
  datos.append("contrasenaR", txtContrasena.value);
  datos.append("fechaR", txtFecha.value);

  fetch("http://tpadrs.orgfree.com/registro.php",{
   method:  'POST', //*GET,POST,PUT,DELETE, ETC.
   body: datos
  })

  .then(function (response) {
   if(response.ok){
    alert("Usuario registrado");
   }
    else{
     alert("Ocurrio un error al registrar");
     console.log(response);
    }
  })

  .catch (function(err){
    alert("Ocurrio un error inesperado");
    console.log(err);
  })
});

btnIngresar.addEventListener("click", function(){
       
  if(txtCorreoI.value == "")
  {
      alert("Debe escribir el correo");
      txtCorreoI.classList.add("errorCampo");
      return false;
  }
  else{
      txtCorreoI.classList.remove("errorCampo");
  }

  if(txtContrasenaI.value == "")
  {
      alert("Debe escribir una contraseña");
      txtContrasenaI.classList.add("errorCampo");
      return false;
  }
  else {
      txtContrasenaI.classList.remove("errorCampo");
  }
  //preparar datos para poder enviar al servidor
  let datosI = new FormData();
  datosI.append("correoI" , txtCorreoI.value);
  datosI.append("contrasenaI" , txtContrasenaI.value);

  fetch("http://tpadrs.orgfree.com/ingreso.php",{
      method: 'POST', // * GET, POST, PUT, DELETE, ETC.
      body:datosI
  })
  .then(function(response){//then lo que sucede despues de los ingresos de php y manda resultado
      return response.json();
  })
  .then(function(data)
  {
      if(data.fallo == "contrasena") 
      {
        alert("Debe escribir la contraseña correcta");  
      }
      else if( data.fallo == "usuario")
      {
        alert("El correo no está registrado");
      }
      else 
      {
        nombre = data.nombre;
        correo = data.correo;
        //mostrar y ocultar ventanas
        ingreso.style.display = "none";
        principal.style.display = "block";
        nombreP.innerHTML = nombre;
        redactar.style.display = "block";
        //document.getElementById("nombreP").innerHTML = nombre;
        localStorage.setItem("login", 1);
        localStorage.setItem("nombre", nombre);
        localStorage.setItem("correo", correo);
        //conectar a base de datos y mostrar mensajes en la pantalla
        leerM();
          
      }
  })

  .catch(function(err){
      alert("Ocurrio un error inesperado");
      console.log(err);
 });


  btnEnvia.addEventListener("click", function() 
        {
            if(txtPara.value=="")
            {
                alert("Debe escribir para quien es el mensaje");
                txtPara.classList.add("errorCampo");
                return false;
            }
            else
            {
                txtPara.classList.remove("errorCampo");
            }
            if(txtMensaje.value=="")
            {
                alert("Debe escribir un mensaje");
                txtMensaje.classList.add("errorCampo");
                return false;
            }
            else
            {
                txtMensaje.classList.remove("errorCampo");
            }

            let datosM = new FormData();
            datosM.append("correoM", txtPara.value);
            datosM.append("mensajeM", txtMensaje.value);
            //datosM.append("fechaM", txtFechaM.value);

        fetch("http://tpadrs.orgfree.com/registrarMensaje.php",{
            method: 'POST', // * GET, POST, PUT, DELETE, ETC.
            body:datosM
        })
        .then(function(response){
            if(response.ok){
                alert("Mensaje Enviado");
            }
            else{
                alert("Ocurrio un error al enviar");
                console.log(response);
            }
        })
        .catch(function(err){
            alert("Ocurrio un error inesperado");
            console.log(err);
        })
        })
});

function abrirBarra(){
  document.getElementById("barraMenu").style.width = "250px";
}

function cerrarBarra(){
  document.getElementById("barraMenu").style.width = "0";
}

function leerM(){
  let datosLM = new FormData();
  datosLM.append("correoMensaje", correo);

  fetch("http://tpadrs.orgfree.com/leerMensajes.php",{
    method: 'POST', 
    body:datosLM
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    for(let x = 0; x < data.length; x++) {
      document.getElementById("mensajes").innerHTML = 
      document.getElementById("mensajes").innerHTML + data[x].mensaje + "<br>" +
      data[x].fechaHora + "<br>";
    }
  })
  .catch(function(err){
    alert("Ocurrio un error inesperado");
    console.log(err);
  });
}
function tomarFoto(){
  cerrarBarra();
  redactar.style.display = "none";
  document.getElementById("mensajes").style.display = "none";
  document.getElementById("camara").style.display = "block";
}
document.getElementById("open").addEventListener("click", function(){
  camera.click();
});

camera.addEventListener("change", function(e){
  ruta = URL.createObjectURL(e.target.files[0]);
  obtenerLugar();
  photo.src = ruta;
  if(obtenerSO() == "iOS"){
    let link = document.createElement('a');
    //createElement('a');- crear etiqueta de html
    link.download = "ad.png" //lo que descargue la etiqueta se le asigna un nombre a la img
    //link.href = photo.toDataURL("image/png").replace("image/png", "image/octect-stream");
    //se relaciona el vinculo con la imagen
    link.herf = ruta;
    link.click();
    alert("Foto capturada");
  }
});

function cerrarSesion(){
  cerrarBarra();
  localStorage.removeItem("nombre");
  localStorage.removeItem("correo");
  localStorage.setItem("login", 0);
  redactar.style.display = "none";
  document.getElementById("principal").style.display = "none";
  document.getElementById("mensajes").style.display = "none";
  document.getElementById("camara").style.display = "none";
  document.getElementById("ingreso").style.display = "block";
} 

function mensajes(){
  redactar.style.display = "block";
  document.getElementById("mensajes").style.display = "block";
  document.getElementById("camara").style.display = "none";
  cerrarBarra();

}

function obtenerSO(){
  let so = null
  let plataform = window.navigator.platform,
  iosPlatforms = ['iPhone','iPad', 'iPod'];
  if (iosPlatforms.includes(platform)){
    so = 'iOS';
  }
  return so;
}
function obtenerLugar(){
  coordenadas = {lat: 0, lon:0};
  navigator.geolocation.getCurrentPosition(function(position) {
    coordenadas = {lat: position.coords.latitude, lon: position.coords.longitude}

  fetch("https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=" + coordenadas.lat + "&lon=" + coordenadas.lon)
  .then (response => response.json())
  .then(data =>{
    document.getElementById("lugar").value = data.address.country + " " + data.address.state;
  })
  .catch(error => {
    console.log(error);
    coordenadas = {lat: 0, lon: 0};
  });
});
}
function map(){
  alert ("Tome una foto");
}
mapa.addEventListener("click", function(){
  window.open("http://www.openstreetmap.org/?mlat=" + coordenadas.lat + "&mlon=" + coordenadas.lon + "&zoom=20");
  //window.open es para abrir enlace en otra pestaña del navegador
});

