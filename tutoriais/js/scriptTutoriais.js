document.addEventListener("DOMContentLoaded", () => {

    const botoes = document.querySelectorAll(".tutorial-link");
    const tutoriais = document.querySelectorAll(".tutorial-card");

    botoes.forEach(botao => {

        botao.addEventListener("click", () => {

            const idTutorial = botao.dataset.tutorial;
            const tutorial = document.getElementById(idTutorial);

            // Verifica se já está aberto
            const estavaAberto = tutorial.classList.contains("aberto");

            // Fecha todos
            tutoriais.forEach(item => {
                item.classList.remove("aberto");
            });

            // Remove ativo de todos
            botoes.forEach(item => {
                item.classList.remove("ativo");
            });

            // Se estava fechado, abre
            if (!estavaAberto) {
                tutorial.classList.add("aberto");
                botao.classList.add("ativo");
            }

        });

    });

});