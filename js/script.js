// trocar tema dia/noite

const tema = document.querySelector("#tema");

tema.onclick = function(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        tema.innerHTML="☀️";
    }
    else{
        tema.innerHTML="🌙";
    }

};


// leitura por voz

const voz = document.querySelector("#voz");


voz.onclick=function(){

let texto=document.body.innerText;


let leitura = new SpeechSynthesisUtterance(texto);

leitura.lang="pt-BR";

speechSynthesis.speak(leitura);

};