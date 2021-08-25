var user = document.getElementById("user");
var pass = document.getElementById("senha");
var button = document.getElementById("button");
var erro = document.getElementById("erro");
var textoerro = document.getElementById("textoerro");
var loading = document.getElementById("lding");

user.focus();

function getValue() {
  loading.classList.remove("hideloading");
  
  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/login";
  var usuario = user.value;
  var senha = pass.value;
  var json = '{"user":"' + usuario + '","pass":"' + senha + '"}'

  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");

  xhttp.send(json);

  xhttp.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if(xhttp.status == 200) {
      var resp = JSON.parse(xhttp.response);

      erro.classList.remove("azul");
      erro.classList.remove("vermelho");
      erro.classList.add("verde");

      textoerro.textContent="Bem vindo!";

      var session = JSON.parse(xhttp.response);

      sessionStorage.setItem("session", session['session']);
      
      // console.log(sessionStorage.getItem("session"));
      window.location.replace("/");
    }
    else {
      erro.classList.remove("azul");
      erro.classList.remove("verde");
      erro.classList.add("vermelho");
      textoerro.textContent="Login inválido";
    }
  });

  user.value = "";
  pass.value = "";

  user.focus();
}