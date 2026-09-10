document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    //  DINÂMICA ENTRE RADIO BUTTONS (E-MAIL / SMS)
    // ============================================================
    const radioEmail = document.getElementById('radio-email');
    const radioSms = document.getElementById('radio-sms');
    const labelUserInput = document.getElementById('label-user-input');
    const userInput = document.getElementById('user-input');
    const inputIcon = document.getElementById('input-icon');
    const gifInputHelp = document.getElementById('gif-input-help');
    const textInputHelp = document.getElementById('text-input-help');

    function atualizarTipoMetodo() {
        if (radioEmail.checked) {
            labelUserInput.textContent = "E-mail registrado";
            userInput.placeholder = "exemplo@email.com";
            userInput.type = "email";
            inputIcon.className = "bx bxs-envelope input-icon";
            gifInputHelp.src = "../gif/e-mailgif.gif";
            textInputHelp.textContent = "Sinal: E-mail";
        } else {
            labelUserInput.textContent = "Celular registrado";
            userInput.placeholder = "(11) 99999-9999";
            userInput.type = "tel";
            inputIcon.className = "bx bxs-phone input-icon";
            gifInputHelp.src = "../images/libras/tutorial-sms.gif";
            textInputHelp.textContent = "Sinal: Celular";
        }
    }

    if (radioEmail && radioSms) {
        radioEmail.addEventListener('change', atualizarTipoMetodo);
        radioSms.addEventListener('change', atualizarTipoMetodo);
    }

    // ============================================================
    //  VALIADÇÃO DO FORMULÁRIO
    // ============================================================
    const formRecuperar = document.getElementById('form-recuperar');

    if (formRecuperar) {
        formRecuperar.addEventListener('submit', (e) => {
            e.preventDefault();

            const valor = userInput.value.trim();

            if (valor === '') {
                const modalTitulo = document.getElementById('modalCampoBrancoTitulo');
                const modalGif = document.getElementById('modalCampoBrancoGif');
                const modalTexto = document.getElementById('modalCampoBrancoTexto');

                if (radioEmail.checked) {
                    modalTitulo.textContent = "Digite seu e-mail registrado.";
                    modalGif.src = "../gif/e-mailgif.gif";
                    modalTexto.textContent = "Sinal: E-mail";
                } else {
                    modalTitulo.textContent = "Digite seu número de celular.";
                    modalGif.src = "../images/libras/tutorial-sms.gif";
                    modalTexto.textContent = "Sinal: Celular";
                }

                const modal = new bootstrap.Modal(document.getElementById('modalCampoBranco'));
                modal.show();
                userInput.focus();
                return;
            }

            alert("Código de verificação enviado com sucesso!");
        });
    }

    // ============================================================
    //  INTERATIVIDADE DOS BOTÕES DE LIBRAS ("i")
    // ============================================================
    const containersLibras = document.querySelectorAll('.libras-help-container');
    const temporizadores = {};
    const TEMPO_PARA_FECHAR = 10000;

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
        Object.keys(temporizadores).forEach(key => clearTimeout(temporizadores[key]));
        containersLibras.forEach(container => {
            container.classList.remove('active');
            const btn = container.querySelector('.btn-info-libras');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.libras-help-container')) fecharTodosTooltips();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') fecharTodosTooltips();
    });

    // ============================================================
    //  LEITURA POR VOZ
    // ============================================================
    const btnVoz = document.getElementById('voz');
    if (btnVoz) {
        btnVoz.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            const texto = "Página de Recuperação de Conta INSEP Acessível. Escolha se deseja receber o código por e-mail ou SMS e digite suas informações nos campos indicados.";
            
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            window.speechSynthesis.speak(utterance);
        });
    }

    // ============================================================
    //  ALTERNÂNCIA DE TEMA (MODO ESCURO)
    // ============================================================
    const btnTema = document.getElementById('tema');
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            const modoEscuroAtivo = document.body.classList.contains('dark');
            btnTema.textContent = modoEscuroAtivo ? '☀️' : '🌙';
        });
    }
});