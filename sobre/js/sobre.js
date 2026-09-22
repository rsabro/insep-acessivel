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


const librasModal = document.getElementById('librasModal');

librasModal.addEventListener('show.bs.modal', function (event) {

    const botao = event.relatedTarget;

    const nome = botao.getAttribute('data-nome');
    const gif = botao.getAttribute('data-gif');

    document.getElementById('nomeIntegrante').textContent = nome;

    const imagem = document.getElementById('gifLibras');

    imagem.src = gif;
    imagem.alt = `Sinal em Libras de ${nome}`;
});

const professorModal = document.getElementById("professorModal");

professorModal.addEventListener("show.bs.modal", function (event) {

    const botao = event.relatedTarget;

    const nome = botao.getAttribute("data-nome");
    const foto = botao.getAttribute("data-foto");

    const nomeProfessor = document.getElementById("nomeProfessor");
    const fotoProfessor = document.getElementById("fotoProfessor");
    const tituloModal = document.getElementById("professorModalLabel");

    nomeProfessor.textContent = nome;
    tituloModal.textContent = nome;

    fotoProfessor.src = foto;
    fotoProfessor.alt = `Foto de ${nome}`;
});