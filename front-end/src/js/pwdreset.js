var loading = document.getElementById("lding");

loading.classList.add("hideloading");

var session = window.localStorage.getItem("session");
if(session != null) {
  if(session.length == 50) {
    ifLogged(session);
  }
}

user.focus();

function updatePass() {
  loading.classList.remove("hideloading");

  var cpfvalue = document.getElementById("cpf")
  var user = document.getElementById("user");
  var senha1 = document.getElementById("senha1");
  var senha2 = document.getElementById("senha2");

  var cpf = parseInt(cpfvalue.value.split(/\D+/).join(""), 10) + "";

  if(cpf.length != 11) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="CPF Inválido";
    
    cpfvalue.focus();
  }
  else if(user.value.length < 6) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Usuário Inválido";
    
    user.focus();
  }
  else if(senha1.value != senha2.value) {
    erro.classList.remove("azul");
    erro.classList.remove("verde");
    erro.classList.add("vermelho");
    textoerro.textContent="Senhas diferentes";
    
    senha2.focus();
  }
  else {
    erro.classList.remove("verde");
    erro.classList.remove("vermelho");
    erro.classList.add("azul");

    textoerro.textContent="Altere sua senha";

    var parseUser = btoa(user.value);
    var parsePass = btoa(senha1.value);

    var url = "http://3.144.171.211:8186/LocadoraVeiculos/clientes/pwdReset";
    var json = '{"user": "' + parseUser + '","cpf": "' + cpf + '","newPass": "' + parsePass + '"}';

    console.log(JSON.parse(json))

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(json);

    xhttp.addEventListener('loadend', () => {
      loading.classList.add("hideloading");
      console.log(xhttp.status)
      if(xhttp.status == 200) {
        if(session != null) {
          if(session.length == 50) {
            window.location.replace("/?p=pu");
            window.localStorage.setItem("p", 'pu');
          }
          else {
            window.location.replace("/src/pages/login.html?p=pu");
            window.localStorage.setItem("p", 'pu');
          }
        }
        else {
          window.location.replace("/src/pages/login.html?p=pu");
          window.localStorage.setItem("p", 'pu');
        }
      }
      else {
        erro.classList.remove("azul");
        erro.classList.remove("verde");
        erro.classList.add("vermelho");
        textoerro.textContent="Senha não alterada";
        
        user.focus();
      }
    });
  }
}