function validateLogin(fName, session, name, logout) {
  sessionStorage.setItem("fName", fName);
  
  name.innerHTML=fName;
  name.setAttribute("href", "#");

  logout.innerHTML="Sair";
  logout.setAttribute("href", "#");

  logout.addEventListener("click", () => {
    var url2 = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/logout";
    var json2 = '{"session": "' + session + '"}';

    var xhttp2 = new XMLHttpRequest();
    xhttp2.open("POST", url2, true);
    xhttp2.setRequestHeader("Content-Type", "application/json");

    xhttp2.send(json2);

    xhttp2.addEventListener('loadend', () => {
      if(xhttp2.status == 200) {
        sessionStorage.setItem("session", null);
        sessionStorage.setItem("fName", null);
        window.location.replace("/");
      }
    });
  });

  name.addEventListener("click", () => {
    window.location.replace("/src/pages/user.html");
  })
}

function ifLogged(session, t) {
  var name = document.querySelector(".btn1");
  var logout = document.querySelector(".btn2");

  var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/clientes/user";
  var json = '{"session": "' + session + '"}';

  var jsonRes = "";

  if(t == 1) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    xhttp.send(json);

    xhttp.addEventListener('loadend', () => {
      if(xhttp.status == 200) {
        var resp = JSON.parse(xhttp.response);
        var uName = resp['nome'].split(" ");
        var fName = uName[0];

        validateLogin(fName, session, name, logout);
      }
      var t = document.getElementById("userInfoInpt");
      if(t != null) {
        t.value=xhttp.response;
      }
    });
  }
  else {
    var name = document.querySelector(".btn1");
    var logout = document.querySelector(".btn2");

    var session = sessionStorage.getItem("session");
    var fName = sessionStorage.getItem("fName");

    if(session != null && fName != null) {
      if(session.length == 50 && fName.length > 1) {
        validateLogin(fName, session, name, logout);
      }
    }
  }
  return xhttp;
}