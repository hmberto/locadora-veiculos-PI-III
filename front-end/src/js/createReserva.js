var loading = document.getElementById("lding");
function createReserva() {
  loading.classList.remove("hideloading");
  var localRetirada = window.localStorage.getItem("localRetirada");
  var dataRetirada = window.localStorage.getItem("dataRetirada");
  var horaRetirada = window.localStorage.getItem("horaRetirada");
  var localDevolucao = window.localStorage.getItem("localDevolucao");
  var dataDevolucao = window.localStorage.getItem("dataDevolucao");
  var horaDevolucao = window.localStorage.getItem("horaDevolucao");

  const urlParams = new URLSearchParams(window.location.search);
  const urlParam = urlParams.get('carId');
  var xhttp = ifLogged(session, 1);

  xhttp.addEventListener('loadend', () => {
    if(xhttp.status == 200) {
      var resp = JSON.parse(xhttp.response);

      var A = document.querySelector(".valorLocacao").textContent;
      var B = document.querySelector(".valordescontos").textContent;
      var C = document.querySelector(".totalvalorLocacao").textContent;
      var D = sessionStorage.getItem("cupom");
      var E = document.getElementById("cadeirinha").checked;
      var F = document.getElementById("animais").checked;

      if(A == "" || A == undefined) {
        A = null;
      }
      if(B == "" || B == undefined) {
        B = null;
      }
      if(C == "" || C == undefined) {
        C = A;
      }
      if(D == "" || D == undefined) {
        D = null;
      }

      var url = "http://ec2-18-119-13-255.us-east-2.compute.amazonaws.com:8186/LocadoraVeiculos/location/create";
      var json = '{"cpf_locatario": "' + resp['cpf'] + '","id_veiculo": "' + urlParam + '","data_retirada": "' + dataRetirada + '","hora_retirada": "' + horaRetirada + '","data_devolucao": "' + dataDevolucao + '","hora_devolucao": "' + horaDevolucao + '","tempo_locacao": "' + diffDays + '","id_funcionario": "111111","valor_total_locacao": "' + A + '","cupom_aplicado": "' + D + '","valor_descontos": "' + B + '","valor_total_a_pagar": "' + C + '","local_retirada": "' + localRetirada + '","local_devolucao": "' + localDevolucao + '","cadeirinha": "' + E + '","capa_cinto_animais": "' + F + '"}';

      var xhttp2 = new XMLHttpRequest();
      xhttp2.open("POST", url, true);
      xhttp2.setRequestHeader("Content-Type", "application/json");

      xhttp2.send(json);
      var parseCpf = btoa(resp['cpf']);

      xhttp2.addEventListener('loadend', () => {
        loading.classList.remove("hideloading");
        if(xhttp2.status == 201) {
          window.location.replace("/src/pages/detalhes.html?u=" + parseCpf);
        }
      });
    }
    else {
      loading.classList.remove("hideloading");
    }
  });
}