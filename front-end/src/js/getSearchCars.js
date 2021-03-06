var loading = document.getElementById("lding");

const urlParams = new URLSearchParams(window.location.search);
function searchCar() {
  var session = window.localStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
  
  loading.classList.remove("hideloading");
  const urlParamCars = urlParams.get('search');

  var parseBack = atob(urlParamCars);
  var param = JSON.parse(parseBack);

  var text = document.querySelector(".txt");
  
  document.title = param['localRetirada'] + ' - Carros encontrados';

  var url = "http://3.144.171.211:8186/LocadoraVeiculos/veiculos/disponibilidade";
  
  var consulta = new XMLHttpRequest();
  consulta.open("POST", url, true);
  consulta.setRequestHeader("Content-Type", "application/json");
  consulta.send(parseBack);

  consulta.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if (consulta.status == 200) {
      var root = document.getElementById("cars");
      var json = JSON.parse(consulta.response);
      var tamanho = Object.keys(json['data']).length;

      var txt = tamanho + " carros encontrados para retirada na agência " + param['localRetirada'];
      text.innerHTML=txt;
      
      for(i = 0; i < tamanho; i++) {
        var div = document.createElement("div");
        div.classList.add("showcar");
        div.classList.add("white-color-bg");

        var div1 = document.createElement("div");
        div1.classList.add("showcar1");
        div.appendChild(div1);
    
        var name = "car" + i;
        var data = json['data'][name];
    
        var img = document.createElement("img");
        img.classList.add("car");
        img.setAttribute('src', data['imgPath']);
        div1.appendChild(img);
    
        var span = document.createElement("span");
        span.classList.add("titlecar");
        span.textContent=data['modelo'];
        span.classList.add("font-green");
        div.appendChild(span);
    
        var p = document.createElement("p");
        p.classList.add("subcar");
        p.innerHTML=data['subtitles'];
        p.classList.add("font-black");
        div.appendChild(p);
    
        var a = document.createElement("a");
        a.classList.add("detalhes");
        a.classList.add("font-white1");
        a.classList.add("black-green-color-bg");
        a.textContent="DETALHES"
        a.setAttribute('href', "/src/pages/car.html?carId=" + data['idCarro'])
        div.appendChild(a);
    
        root.appendChild(div)
    
        if(i+1 == tamanho) { return; }
      }
    }
    else {
      document.getElementById("erro").classList.remove("esconde-erro")
    }
  });
}

searchCar();