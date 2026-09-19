document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    //  VALIDAÇÃO DO FORMULÁRIO COM MODAIS DE ALERTA
    // ============================================================
    const formLogin = document.getElementById('form-login');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    // Função para abrir os modais de alerta
    function abrirModal(idModal) {
        const elemento = document.getElementById(idModal);

        if (elemento) {
            const modal = new bootstrap.Modal(elemento);
            modal.show();
        }
    }

    // Função auxiliar simples para validação básica de formato de e-mail
    function validarFormatoEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailValor = emailInput.value.trim().toLowerCase();
            const senhaValor = passwordInput.value.trim();

            // 1. Validação: E-mail em branco (Vídeo 1)
            if (emailValor === '') {
                abrirModal('modalCampoVazio'); // Utiliza o modal existente com o GIF do e-mail
                emailInput.focus();
                return;
            }

            // 2. Validação: Senha em branco (Vídeo 2)
            if (senhaValor === '') {
                abrirModal('modalSenhaVazia'); // Utiliza o novo modal com o GIF da senha
                passwordInput.focus();
                return;
            }

            // 3. Validação: E-mail inválido (formato incorreto)
            if (!validarFormatoEmail(emailValor)) {
                abrirModal('modalEmailInvalido');
                emailInput.focus();
                return;
            }

            try {
                // Busca o arquivo usuarios.json
                const resposta = await fetch('../dados/usuarios.json');

                if (!resposta.ok) {
                    throw new Error('Erro ao carregar usuarios.json');
                }

                const dados = await resposta.json();

                // Procura o usuário pelo e-mail
                const usuario = dados.usuarios.find(
                    u => u.email.toLowerCase() === emailValor
                );

                // 4. Validação: Credenciais incorretas (usuário não encontrado ou senha errada)
                if (!usuario || usuario.senha !== senhaValor) {
                    abrirModal('modalCredenciaisIncorretas');
                    passwordInput.focus();
                    return;
                }

                // Salva o nome do usuário para usar na próxima página
                sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));

                // Redireciona para a página principal
                window.location.href = '../particular/index.html';

            } catch (erro) {
                console.error('Erro no login:', erro);
                alert('Não foi possível realizar o login. Tente novamente.');
            }
        });
    }

    // ============================================================
    //  INTERATIVIDADE DOS BOTÕES DE LIBRAS ("i") COM FECHAMENTO AUTOMÁTICO
    // ============================================================
    const containersLibras = document.querySelectorAll('.libras-help-container');
    const temporizadores = {};

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

                    const tempoGif = parseInt(btn.getAttribute('data-tempo')) || 5000;

                    temporizadores[index] = setTimeout(() => {
                        container.classList.remove('active');
                        btn.setAttribute('aria-expanded', 'false');
                    }, tempoGif);
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