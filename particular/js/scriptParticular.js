document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // USUÁRIO LOGADO
    // ============================================================

    const nomeUsuario = document.getElementById('nome-usuario');

    const usuarioLogado = sessionStorage.getItem('usuarioLogado');

    // Se não estiver logado, volta para o login
    if (!usuarioLogado) {
        window.location.href = '../login/index.html';
        return;
    }

    // Mostra o nome do usuário
    if (nomeUsuario) {
        nomeUsuario.textContent = usuarioLogado;
    }


    // ============================================================
    // BOTÃO SAIR
    // ============================================================

    const btnSair = document.getElementById('sair');
    const confirmarSair = document.getElementById('confirmarSair');

    if (btnSair) {
        btnSair.addEventListener('click', () => {

            const modal = new bootstrap.Modal(
                document.getElementById('modalSair')
            );

            modal.show();

        });
    }

    if (confirmarSair) {
        confirmarSair.addEventListener('click', () => {

            // Remove o usuário da sessão
            sessionStorage.removeItem('usuarioLogado');

            // Volta para o login
            window.location.href = '../login/index.html';

        });
    }


    // ============================================================
    // BOTÃO PERFIL
    // ============================================================

    const btnPerfil = document.getElementById('btnPerfil');

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            alert('Área de perfil em desenvolvimento.');
        });
    }


    // ============================================================
    // BOTÃO CONFIGURAÇÕES
    // ============================================================

    const btnConfiguracoes = document.getElementById('btnConfiguracoes');

    if (btnConfiguracoes) {
        btnConfiguracoes.addEventListener('click', () => {
            alert('Área de configurações em desenvolvimento.');
        });
    }


    // ============================================================
    // LEITURA POR VOZ
    // ============================================================

    const btnVoz = document.getElementById('voz');

    if (btnVoz) {
        btnVoz.addEventListener('click', () => {

            window.speechSynthesis.cancel();

            const texto =
                `Área Particular do INSEP Acessível. Olá, ${usuarioLogado}! Você está na sua área particular.`;

            const utterance = new SpeechSynthesisUtterance(texto);

            utterance.lang = 'pt-BR';

            window.speechSynthesis.speak(utterance);

        });
    }


    // ============================================================
    // ALTERNÂNCIA DE TEMA
    // ============================================================

    const btnTema = document.getElementById('tema');

    if (btnTema) {
        btnTema.addEventListener('click', () => {

            document.body.classList.toggle('dark');

            const modoEscuroAtivo =
                document.body.classList.contains('dark');

            btnTema.textContent =
                modoEscuroAtivo ? '☀️' : '🌙';

        });
    }

});