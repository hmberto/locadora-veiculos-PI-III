var loading = document.getElementById("lding");

const urlParams = new URLSearchParams(window.location.search);
function searchCarMarca() {
  var session = window.localStorage.getItem("session");
  if(session != null) {
    if(session.length == 50) {
      ifLogged(session);
    }
  }
  
  loading.classList.remove("hideloading");
  const urlParamCars = urlParams.get('marca');

  document.title = urlParamCars + ' - Carros encontrados';

  jsonMarca = '{ "marca": "' + urlParamCars + '" }';

  var text = document.querySelector(".txt");
  var txt = "Carros encontrados para a fabricante " + urlParamCars;
  text.innerHTML=txt;
  var url = "http://3.144.171.211:8186/LocadoraVeiculos/veiculos/modelos";
  
  var consulta = new XMLHttpRequest();
  consulta.open("POST", url, true);
  consulta.setRequestHeader("Content-Type", "application/json");
  consulta.send(jsonMarca);

  consulta.addEventListener('loadend', () => {
    loading.classList.add("hideloading");
    if (consulta.status == 200) {      
      var root = document.getElementById("cars");
      var json = JSON.parse(consulta.response);
      var tamanho = Object.keys(json['data']).length;
      
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
        span.classList.add("font-green");
        span.textContent=data['modelo'];
        div.appendChild(span);
    
        var p = document.createElement("p");
        p.classList.add("subcar");
        p.classList.add("font-black");
        p.innerHTML=data['subtitles'];
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

searchCarMarca();