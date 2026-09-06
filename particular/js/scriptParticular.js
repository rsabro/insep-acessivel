document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // USUÁRIO LOGADO
    // ============================================================

    const nomeUsuario =
        document.getElementById('nomeUsuario');

    const imagemUsuario =
        document.getElementById('imagemUsuario');


    // Recupera usuário da sessão
    const usuarioSalvo =
        sessionStorage.getItem('usuarioLogado');


    // ============================================================
    // PROTEÇÃO DA ÁREA PARTICULAR
    // ============================================================

    if (!usuarioSalvo) {

        window.location.href =
            '../login/indexLogin.html';

        return;
    }


    // ============================================================
    // CONVERTE JSON PARA OBJETO
    // ============================================================

    let usuario;


    try {

        usuario = JSON.parse(usuarioSalvo);

    } catch (erro) {

        console.error(
            'Erro ao recuperar usuário:',
            erro
        );


        // Limpa sessão inválida
        sessionStorage.removeItem(
            'usuarioLogado'
        );


        window.location.href =
            '../login/indexLogin.html';

        return;
    }


    // ============================================================
    // MOSTRAR NOME
    // ============================================================

    if (nomeUsuario && usuario.nome) {

        nomeUsuario.textContent =
            usuario.nome;
    }


    // ============================================================
    // MOSTRAR IMAGEM
    // ============================================================

    if (imagemUsuario && usuario.imagem) {

        imagemUsuario.src =
            usuario.imagem;

        imagemUsuario.alt =
            `Imagem de ${usuario.nome}`;
    }


    // ============================================================
    // BOTÃO SAIR
    // ============================================================

    const btnSair =
        document.getElementById('sair');

    const confirmarSair =
        document.getElementById('confirmarSair');


    if (btnSair) {

        btnSair.addEventListener('click', () => {

            const elementoModal =
                document.getElementById('modalSair');


            if (elementoModal) {

                const modal =
                    bootstrap.Modal.getOrCreateInstance(
                        elementoModal
                    );

                modal.show();
            }

        });
    }


    // ============================================================
    // CONFIRMAR SAÍDA
    // ============================================================

    if (confirmarSair) {

        confirmarSair.addEventListener(
            'click',
            () => {

                // Remove dados da sessão
                sessionStorage.removeItem(
                    'usuarioLogado'
                );


                // Para leitura por voz
                window.speechSynthesis.cancel();


                // Volta para login
                window.location.href =
                    '../login/indexLogin.html';

            }
        );
    }


    // ============================================================
    // PERFIL
    // ============================================================

    const btnPerfil =
        document.getElementById('btnPerfil');


    if (btnPerfil) {

        btnPerfil.addEventListener('click', () => {

            alert(
                'Área de perfil em desenvolvimento.'
            );

        });

    }


    // ============================================================
    // CONFIGURAÇÕES
    // ============================================================

    const btnConfiguracoes =
        document.getElementById('btnConfiguracoes');


    if (btnConfiguracoes) {

        btnConfiguracoes.addEventListener(
            'click',
            () => {

                alert(
                    'Área de configurações em desenvolvimento.'
                );

            }
        );

    }


    // ============================================================
    // LEITURA POR VOZ
    // ============================================================

    const btnVoz =
        document.getElementById('voz');


    if (btnVoz) {

        btnVoz.addEventListener('click', () => {

            window.speechSynthesis.cancel();


            const texto =
                `Área Particular do INSEP Acessível. ` +
                `Olá, ${usuario.nome}! ` +
                `Você está na sua área particular.`;


            const utterance =
                new SpeechSynthesisUtterance(texto);


            utterance.lang = 'pt-BR';


            window.speechSynthesis.speak(
                utterance
            );

        });

    }


    // ============================================================
    // TEMA
    // ============================================================

    const btnTema =
        document.getElementById('tema');


    if (btnTema) {

        btnTema.addEventListener('click', () => {

            document.body.classList.toggle(
                'dark'
            );


            const modoEscuroAtivo =
                document.body.classList.contains(
                    'dark'
                );


            btnTema.textContent =
                modoEscuroAtivo
                    ? '☀️'
                    : '🌙';

        });

    }

});