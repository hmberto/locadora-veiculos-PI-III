const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('e');
const emailToken = urlParams.get('t');

var url = "http://3.144.171.211:8186/LocadoraVeiculos/email/confirm";
var json = '{ "email": "' + email + '", "emailToken": "' + emailToken + '" }';

var xhttp = new XMLHttpRequest();
xhttp.open("POST", url, true);
xhttp.setRequestHeader("Content-Type", "application/json");

xhttp.send(json);

xhttp.addEventListener('loadend', () => {
  if(xhttp.status == 200) {
    window.location.replace("/?d=lw");
    window.localStorage.setItem("d", 'lw');
  }
  else {
    window.location.replace("/?g=zk");
    window.localStorage.setItem("g", 'zk');
  }
});