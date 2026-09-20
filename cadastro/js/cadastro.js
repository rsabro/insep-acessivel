document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // INTERATIVIDADE DOS BOTÕES DE LIBRAS
    // ============================================================

    const containersLibras = document.querySelectorAll('.libras-help-container');
    const temporizadores = {};
    const TEMPO_PARA_FECHAR = 8000;

    containersLibras.forEach((container, index) => {

        const btn = container.querySelector('.btn-info-libras');

        if (btn) {

            btn.addEventListener('click', (e) => {

                e.preventDefault();
                e.stopPropagation();

                const estaAtivo = container.classList.contains('active');

                fecharTodosTooltips();

                if (!estaAtivo) {

                    container.classList.add('active');

                    btn.setAttribute('aria-expanded', 'true');

                    temporizadores[index] = setTimeout(() => {

                        container.classList.remove('active');

                        btn.setAttribute('aria-expanded', 'false');

                    }, TEMPO_PARA_FECHAR);
                }
            });
        }
    });


    function fecharTodosTooltips() {

        Object.keys(temporizadores).forEach(key => {
            clearTimeout(temporizadores[key]);
        });

        containersLibras.forEach(container => {

            container.classList.remove('active');

            const btn = container.querySelector('.btn-info-libras');

            if (btn) {
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    }


    document.addEventListener('click', (e) => {

        if (!e.target.closest('.libras-help-container')) {
            fecharTodosTooltips();
        }
    });


    document.addEventListener('keydown', (e) => {

        if (e.key === 'Escape') {
            fecharTodosTooltips();
        }
    });


    // ============================================================
    // VALIDAÇÃO DO CADASTRO
    // ============================================================

    const form = document.getElementById("registerForm");

    if (!form) {
        return;
    }

    let campoParaFocar = null;


    // ============================================================
    // ELEMENTOS DO MODAL
    // ============================================================

    const modalValidacao = document.getElementById("modalValidacao");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalMensagem = document.getElementById("modalMensagem");
    const modalGif = document.getElementById("modalGif");


    // ============================================================
    // ABRIR MODAL DE VALIDAÇÃO
    // ============================================================

    function abrirModalValidacao(titulo, mensagem, gif, campoFoco) {

        campoParaFocar = campoFoco;

        modalTitulo.innerText = titulo;

        modalMensagem.innerText = mensagem;

        modalGif.src = gif;

        modalGif.alt = "GIF Libras: " + mensagem;

        const modal = bootstrap.Modal.getOrCreateInstance(modalValidacao);

        modalValidacao.addEventListener("hidden.bs.modal", function () {

            if (campoParaFocar) {

                campoParaFocar.focus();

                campoParaFocar = null;
            }

        }, { once: true });

        modal.show();
    }


    // ============================================================
    // ELEMENTOS DO FORMULÁRIO
    // ============================================================

    const nome = document.getElementById("nome");
    const sobrenome = document.getElementById("sobrenome");
    const sexo = document.getElementById("sexo");
    const telefone = document.getElementById("telefone");
    const email = document.getElementById("email");
    const confirmEmail = document.getElementById("confirmEmail");
    const senha = document.getElementById("senha");
    const confirmSenha = document.getElementById("confirmSenha");
    const registerMessage = document.getElementById("registerMessage");


    // ============================================================
    // SUBMIT
    // ============================================================

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        registerMessage.innerText = "";


        // ========================================================
        // NOME
        // ========================================================

        if (nome.value.trim() === "") {

            registerMessage.innerText = "Digite seu nome.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Digite seu nome.",
                "videos/nome.gif",
                nome
            );

            return;
        }


        // ========================================================
        // SOBRENOME
        // ========================================================

        if (sobrenome.value.trim() === "") {

            registerMessage.innerText = "Digite seu sobrenome.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Digite seu sobrenome.",
                "videos/sobrenome.gif",
                sobrenome
            );

            return;
        }


        // ========================================================
        // SEXO
        // ========================================================

        if (sexo.value === "") {

            registerMessage.innerText = "Selecione o sexo.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Selecione o sexo.",
                "videos/sexo.gif",
                sexo
            );

            return;
        }


        // ========================================================
        // TELEFONE
        // ========================================================

        if (telefone.value.trim() === "") {

            registerMessage.innerText = "Digite seu telefone.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Digite seu telefone.",
                "videos/telefone.gif",
                telefone
            );

            return;
        }


        // ========================================================
        // VALIDAÇÃO DO TELEFONE
        // ========================================================

        const regexTelefone = /^[0-9]{2}\s?[0-9]{4,5}-?[0-9]{4}$/;

        if (!regexTelefone.test(telefone.value.trim())) {

            registerMessage.innerText =
                "Digite um telefone válido com DDD.";

            abrirModalValidacao(
                "Telefone inválido",
                "Digite um telefone válido com DDD.",
                "videos/telefone.gif",
                telefone
            );

            return;
        }


        // ========================================================
        // E-MAIL
        // ========================================================

        if (email.value.trim() === "") {

            registerMessage.innerText = "Digite seu e-mail.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Digite seu e-mail.",
                "videos/email.gif",
                email
            );

            return;
        }


        // ========================================================
        // CONFIRMAR E-MAIL
        // ========================================================

        if (confirmEmail.value.trim() === "") {

            registerMessage.innerText = "Confirme seu e-mail.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Confirme seu e-mail.",
                "videos/confirmar-email.gif",
                confirmEmail
            );

            return;
        }


        // ========================================================
        // E-MAILS DIFERENTES
        // ========================================================

        if (
            email.value.trim().toLowerCase() !==
            confirmEmail.value.trim().toLowerCase()
        ) {

            registerMessage.innerText =
                "Os e-mails não conferem!";

            abrirModalValidacao(
                "E-mails diferentes",
                "Os e-mails não conferem!",
                "videos/confirmar-email.gif",
                confirmEmail
            );

            return;
        }


        // ========================================================
        // SENHA
        // ========================================================

        if (senha.value.trim() === "") {

            registerMessage.innerText = "Digite sua senha.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Digite sua senha.",
                "videos/senha.gif",
                senha
            );

            return;
        }


        // ========================================================
        // CONFIRMAR SENHA
        // ========================================================

        if (confirmSenha.value.trim() === "") {

            registerMessage.innerText = "Confirme sua senha.";

            abrirModalValidacao(
                "Campo obrigatório",
                "Confirme sua senha.",
                "videos/igualsenha.gif",
                confirmSenha
            );

            return;
        }


        // ========================================================
        // SENHAS DIFERENTES
        // ========================================================

        if (senha.value !== confirmSenha.value) {

            registerMessage.innerText =
                "As senhas não conferem!";

            abrirModalValidacao(
                "Senhas diferentes",
                "As senhas não conferem!",
                "videos/igualsenha.gif",
                confirmSenha
            );

            return;
        }


        // ========================================================
        // SENHA FORTE (Regras da Imagem)
        // ========================================================

        const valSenha = senha.value;
        const valEmail = email.value.trim().toLowerCase();
        const partesEmail = valEmail.split('@')[0];

        // 1. Tamanho entre 8 e 16 caracteres
        if (valSenha.length < 8 || valSenha.length > 16) {
            registerMessage.innerText = "A senha deve conter entre 8 e 16 caracteres.";
            abrirModalValidacao(
                "Senha inválida",
                "A senha deve ter entre 8 e 16 caracteres.",
                "videos/confirmar-senha.gif",
                senha
            );
            return;
        }

        // 2. Não utilizar o e-mail (ou o nome do e-mail) como senha
        if (valEmail !== "" && (valSenha.toLowerCase() === valEmail || (partesEmail.length >= 3 && valSenha.toLowerCase().includes(partesEmail)))) {
            registerMessage.innerText = "Não use seu e-mail como senha.";
            abrirModalValidacao(
                "Senha insegura",
                "Não use seu e-mail como senha.",
                "videos/confirmar-senha.gif",
                senha
            );
            return;
        }

        // 3. Sequências numéricas simples (ex: 1234, 0123, 9876)
        const sequenciasComuns = ["0123", "1234", "2345", "3456", "4567", "5678", "6789", "9876", "8765"];
        const temSequencia = sequenciasComuns.some(seq => valSenha.includes(seq));
        if (temSequencia) {
            registerMessage.innerText = "Não utilize sequências numéricas do teclado.";
            abrirModalValidacao(
                "Senha insegura",
                "Não utilize sequências numéricas do teclado.",
                "videos/confirmar-senha.gif",
                senha
            );
            return;
        }

        // 4. Mínimo 2 das 4 opções (maiúscula, minúscula, número, caractere especial)
        let opcoesAtendidas = 0;
        if (/[A-Z]/.test(valSenha)) opcoesAtendidas++;
        if (/[a-z]/.test(valSenha)) opcoesAtendidas++;
        if (/[0-9]/.test(valSenha)) opcoesAtendidas++;
        if (/[@$!%*?&#^()_\-+=~`]/.test(valSenha)) opcoesAtendidas++;

        if (opcoesAtendidas < 2) {
            registerMessage.innerText = "Sua senha deve atender a pelo menos duas das opções recomendadas.";
            abrirModalValidacao(
                "Senha fraca",
                "Utilize pelo menos duas das opções: letra maiúscula, minúscula, número ou caractere especial.",
                "videos/confirmar-senha.gif",
                senha
            );
            return;
        }


        // ========================================================
        // CADASTRO REALIZADO
        // ========================================================

        registerMessage.innerText =
            "Conta criada com sucesso!";

    });

});

// Exibir instruções de senha apenas ao focar no campo
const campoSenha = document.getElementById('senha');
const dicasSenha = document.getElementById('dicasSenha');

if (campoSenha && dicasSenha) {
    campoSenha.addEventListener('focus', () => {
        dicasSenha.classList.remove('d-none');
    });

    campoSenha.addEventListener('blur', () => {
        dicasSenha.classList.add('d-none');
    });
}