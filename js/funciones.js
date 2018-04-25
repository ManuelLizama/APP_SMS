var lat = '-33.4349083';
var lon = '-70.6170132';
document.addEventListener("deviceready", onDeviceReady, false);
 
function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   }
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}

function watchPosition() {
   var options = {
      maximumAge: 3600000,
      timeout: 3000,
      enableHighAccuracy: true,
   }
   var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

   function onSuccess(position) {
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
   };

   function onError(error) {
      alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
   }
}

function showAlert(msj)
{
    navigator.notification.alert(
        msj,  // message
        'UNAB',   // title
        ''    // buttonName
    );
}//fin function mensaje.

// PhoneGap is ready
function onDeviceReady() 
{
// Do cool things here...
  //getPosition();
  getPosition();
  if (! SMS ) { alert( 'SMS plugin not ready' ); return; }
  
  
}
 

function soloLetras(e)
{
   key = e.keyCode || e.which;
   tecla = String.fromCharCode(key).toLowerCase();
   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
   //especiales = [8,37,39,46];

   tecla_especial = false;

  if(letras.indexOf(tecla)==-1 && !tecla_especial)
  {
    return false;
  }
}
//function soloNumeros(evt)
function soloNumeros(e)
{
  tecla = (document.all) ? e.keyCode : e.which; 
  if (tecla==8) return true; 
  patron =/^[0-9.]+$/;//este acepta punto(.), si se quiere eliminar borrar el punto despues del 9. 
  te = String.fromCharCode(tecla); 
  return patron.test(te);
}

function validaralpha(e) 
{ 
  tecla = (document.all) ? e.keyCode : e.which; 
  if (tecla==8) return true; 
  patron =/[\ w\w.&ñ]/;//este acepta espacios entre medio, si se quiere eliminar los espacios poner [\w] 
  te = String.fromCharCode(tecla); 
  return patron.test(te);
}

function verUbicacion(){
        if(lat == 0)
        {
            alert('Primero enciende el GPS!');
        }
        else{
        	link="https://www.google.com/maps?q="+lat+","+lon;
            var ref = window.open(link, '_blank', 'location=yes');
         	ref.addEventListener('loadstart', function(event) { showAlert('Url: ' + event.url); });
           
        }
}


function sendSMS()
{
  var fono=document.getElementById('fono').value;
  var msg = document.getElementById('msg').value;
  if(fono=='' || msg =='')
  {
	  if(fono==''){
      alert('Debe Ingresar el numero!');
    }
    else if(msg==''){
      alert('Debe Ingresar el mensaje!');
    }
  }
  else
  {

  	// lat=position.coords.latitude;
  	// lon=position.coords.longitude;
    var textoURl = "y no tengo GPS Activado,";
	  if(lat != 0){
		  textoURl = "https://www.google.com/maps?q="+lat+","+lon;
	  }
	  
	 if(SMS) 
	 {
	   SMS.sendSMS(fono, msg + "Ubicacion: "+ textoURl, function () { alert('Message sent successfully');}, function (e) { alert('Message Failed:' + e);});
	 }
	  
  }
}
   


function reiniciar()
{
	document.getElementById('fono').value='';
	document.getElementById('msg').value='';
}
