$( "#hiderButton" ).click(function() {
    $( "#effect" ).toggle( "fold", 1000 );
  });

function actualizarFondo() {
  let fotoUno = document.getElementById("ck2a").checked
  let fotoDos = document.getElementById("ck2b").checked
  let fotoTres = document.getElementById("ck2c").checked
  let fotoCuatro = document.getElementById("ck2d").checked
  if (fotoUno == true) {
    //document.body.style.backgroundImage = "url('public/img/annie-spratt.jpg')";
    document.getElementById('box').classList.add('bg-image')
  }
}