const menuDocs = document.querySelectorAll(".doc-menu nav a");
const secoesDocs = document.querySelectorAll(".doc-section");

window.addEventListener("scroll", () => {
    let secaoAtual = "";
    secoesDocs.forEach(secao => {
        const distancia = secao.offsetTop - 150;
        if (window.scrollY >= distancia) {
            secaoAtual = secao.id;
        }
    });
    menuDocs.forEach(link => {
        link.classList.remove("ativo");
        if (link.getAttribute("href") === "#" + secaoAtual) {
            link.classList.add("ativo");
        }
    });
});