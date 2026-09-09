document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    //  INTERATIVIDADE DOS BOTÕES DE LIBRAS ("i") COM FECHAMENTO AUTOMÁTICO
    // ============================================================
    const containersLibras = document.querySelectorAll('.libras-help-container');
    const temporizadores = {};
    const TEMPO_PARA_FECHAR = 8000; // 8 segundos

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
});

document.getElementById("registerForm").addEventListener("submit", function(e) {
    // Função para abrir os modais de alerta
    function abrirModal(idModal) {
        const elemento = document.getElementById(idModal);

        if (elemento) {
            const modal = new bootstrap.Modal(elemento);
            modal.show();
        }
    }
    e.preventDefault();
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    // Regex para senha forte
    const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if(email !== confirmEmail) {
    document.getElementById("registerMessage").innerText = "Os e-mails não conferem!";
    } else if(senha !== confirmSenha) {
    document.getElementById("registerMessage").innerText = "As senhas não conferem!";
    } else if(!regexSenha.test(senha)) {
        abrirModal('modalSenhaOito');
        emailInput.focus();
        document.getElementById("registerMessage").innerText =
        "A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e símbolo.";
    } else {
    document.getElementById("registerMessage").innerText = "Conta criada com sucesso!";
    }
});