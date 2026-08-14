document.addEventListener('DOMContentLoaded', () => {

    // E-mail fictício para testes
    const EMAIL_CADASTRADO = "usuario@teste.com";

    // ============================================================
    //  VALIDAÇÃO DO FORMULÁRIO COM MODAIS DE ALERTA
    // ============================================================
    const formLogin = document.getElementById('form-login');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailValor = emailInput.value.trim();
            const senhaValor = passwordInput.value.trim();

            // 1. Valida e-mail em branco
            if (emailValor === '') {
                const modal = new bootstrap.Modal(document.getElementById('modalEmailBranco'));
                modal.show();
                emailInput.focus();
                return;
            }

            // 2. Valida senha em branco
            if (senhaValor === '') {
                const modal = new bootstrap.Modal(document.getElementById('modalSenhaBranco'));
                modal.show();
                passwordInput.focus();
                return;
            }

            // 3. Valida se o e-mail existe
            if (emailValor !== EMAIL_CADASTRADO) {
                const modal = new bootstrap.Modal(document.getElementById('modalEmailInvalido'));
                modal.show();
                return;
            }

            // Sucesso
            alert("Login efetuado com sucesso!");
        });
    }

    // ============================================================
    //  INTERATIVIDADE DOS BOTÕES DE LIBRAS ("i") COM FECHAMENTO AUTOMÁTICO
    // ============================================================
    const containersLibras = document.querySelectorAll('.libras-help-container');
    const temporizadores = {};
    const TEMPO_PARA_FECHAR = 5000; // 5 segundos

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
    //  LEITURA POR VOZ
    // ============================================================
    const btnVoz = document.getElementById('voz');
    if (btnVoz) {
        btnVoz.addEventListener('click', () => {
            window.speechSynthesis.cancel();
            const texto = "Página de Login INSEP Acessível. Digite seu e-mail e senha. Para ver a tradução em Libras de qualquer item, clique no botão de informação azul.";
            
            const utterance = new SpeechSynthesisUtterance(texto);
            utterance.lang = 'pt-BR';
            window.speechSynthesis.speak(utterance);
        });
    }

    // ============================================================
    //  ALTERNÂNCIA DE TEMA (CLARO / ESCURO)
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