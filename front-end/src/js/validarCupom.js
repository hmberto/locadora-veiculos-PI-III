var loading = document.getElementById("lding");

var dias3meses = parseInt(window.localStorage.getItem("dias3meses"));
var diffDays = parseInt(window.localStorage.getItem("diffDays"));

function validaCupom(t) {
  var getCupomFE = window.localStorage.getItem("cupom");

  var checkvalor1 = document.getElementById("checkvalor1");
  var checkvalor2 = document.getElementById("checkvalor2");

  var cupomvalue = document.querySelector(".cupom");
  var cupom = "";

  if(t == 1) {
    cupom = cupomvalue.value.toUpperCase();
  }
  else if(t == 2) {
    if(getCupomFE != null && getCupomFE != "") {
      cupom = getCupomFE;
    }
  }

  if(cupom != "") {
    loading.classList.remove("hideloading");

    var urlCupom = "http://3.144.171.211:8186/LocadoraVeiculos/cupons/validate";
    
    var jsonCupom = '{"cupom": "' + cupom + '"}'

    var xhttpCupom = new XMLHttpRequest();
    xhttpCupom.open("POST", urlCupom, true);
    xhttpCupom.setRequestHeader("Content-Type", "application/json");

    xhttpCupom.send(jsonCupom);

    xhttpCupom.addEventListener('loadend', () => {
      loading.classList.add("hideloading");
      if(xhttpCupom.status == 200) {
        var respCupom = JSON.parse(xhttpCupom.response);
        var cupomdesconto = respCupom['cupom'];

        var porcentagemdescontos = document.querySelector(".porcentagemdescontos");

        window.localStorage.setItem("cupom", cupom);

        if(checkvalor1.checked) {
          var calcDiarias = (parseFloat(getValorfull.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');

          newValorDescontos = (parseFloat(calcDiarias.replace(',', '.') * cupomdesconto / 100)).toFixed(2).replace('.', ',');
          newValorfull = (parseFloat(calcDiarias.replace(',', '.')) - (parseFloat(calcDiarias.replace(',', '.')) * cupomdesconto / 100)).toFixed(2).replace('.', ',');

          document.querySelector(".cupomvalue").innerHTML=cupom;
          document.querySelector(".valordescontos").innerHTML="- R$ " + newValorDescontos;
          document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValorfull;

          porcentagemdescontos.innerHTML=cupomdesconto + "%";

          document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.add("hidecupominvalid");
        }
        else if(checkvalor2.checked) {
          var calc3meses = (parseFloat(getValor3meses.replace(',', '.')) * diffDays).toFixed(2).replace('.', ',');

          newValorDescontos3meses = (parseFloat(calc3meses.replace(',', '.') * cupomdesconto / 100)).toFixed(2).replace('.', ',');
          newValor3meses = (parseFloat(calc3meses.replace(',', '.')) - (parseFloat(calc3meses.replace(',', '.')) * cupomdesconto / 100)).toFixed(2).replace('.', ',');

          document.querySelector(".cupomvalue").innerHTML=cupom;
          document.querySelector(".valordescontos").innerHTML="- R$ " + newValorDescontos3meses;
          document.querySelector(".totalvalorLocacao").innerHTML="R$ " + newValor3meses;

          porcentagemdescontos.innerHTML=cupomdesconto + "%";

          document.querySelector(".show-dados-cupom ").classList.remove("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.add("hidecupominvalid");
        }
        else {
          document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
          document.querySelector(".txtcupominvalid").classList.remove("hidecupominvalid");
        }
      }
      else {
        window.localStorage.setItem("cupom", "");

        document.querySelector(".show-dados-cupom ").classList.add("hide-dados-cupom");
        document.querySelector(".txtcupominvalid").classList.remove("hidecupominvalid");
      }
      cupomvalue.value = "";
    });
  }
}