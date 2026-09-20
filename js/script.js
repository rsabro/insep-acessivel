// trocar tema dia/noite
const tema = document.querySelector("#tema");
document.body.classList.toggle(localStorage.getItem("dianoite"));
tema.onclick = function(){
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")){
        tema.innerHTML="☀️";
        localStorage.setItem("dianoite", "dark");
    }
    else{
        tema.innerHTML="🌙";
        localStorage.removeItem("dianoite");
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

const linksMenu = document.querySelectorAll(".menu-link");

linksMenu.forEach(link => {
    link.addEventListener("click", function () {

        linksMenu.forEach(item => {
            item.classList.remove("ativo");
        });

        this.classList.add("ativo");
    });
});