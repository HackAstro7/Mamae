// ============================================
// SISTEMA DE VALIDAÇÃO DE ACESSO + MENU
// ============================================

// 🔐 SENHA PARA ACESSO
const SENHA_CORRETA = "RELLSON2024";

// URLs
const URL_BLAZE = "https://blaze.com/pt/";
const URL_JONBET = "https://jonbet.com/pt/";

// Elementos
const accessCodeInput = document.getElementById('accessCode');
const btnBlaze = document.getElementById('btnBlaze');
const btnJonbet = document.getElementById('btnJonbet');
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const iframeContainer = document.getElementById('iframe-container');
const loginIframe = document.getElementById('login-iframe');
const closeIframeBtn = document.getElementById('close-iframe');

// Elementos do menu
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');

// Itens do menu
const menuHome = document.getElementById('menuHome');
const menuPerfil = document.getElementById('menuPerfil');
const menuBlaze = document.getElementById('menuBlaze');
const menuJonbet = document.getElementById('menuJonbet');
const menuSuporte = document.getElementById('menuSuporte');
const menuWhatsapp = document.getElementById('menuWhatsapp');
const menuSair = document.getElementById('menuSair');

// ============================================
// FUNÇÕES DO MENU
// ============================================

function toggleMenu() {
    sideMenu.classList.toggle('open');
    menuOverlay.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.classList.remove('active');
    menuToggle.classList.remove('active');
}

if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);

// Ações do menu
if (menuHome) {
    menuHome.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (menuPerfil) {
    menuPerfil.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        alert('👤 Perfil: Gusttavo RELLSON\n📧 contato@rellson.com\n🎖️ Plano: VIP Exclusivo');
    });
}

if (menuBlaze) {
    menuBlaze.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        // Redireciona para a página da Blaze/sinais
        window.location.href = 'ia-hacker/index.html';
    });
}

if (menuJonbet) {
    menuJonbet.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        const codigo = accessCodeInput ? accessCodeInput.value : '';
        if (validateAccess(codigo)) {
            openIframe(URL_JONBET);
        } else {
            showError('❌ Digite o código de acesso primeiro!');
        }
    });
}

if (menuSuporte) {
    menuSuporte.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        window.open('https://wa.me/5562998136026?text=Ol%C3%A1%2C%20preciso%20de%20suporte!', '_blank');
    });
}

if (menuWhatsapp) {
    menuWhatsapp.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        window.open('https://wa.me/5562998136026?text=Ol%C3%A1%2C%20quero%20entrar%20no%20grupo%20VIP!', '_blank');
    });
}

if (menuSair) {
    menuSair.addEventListener('click', function(e) {
        e.preventDefault();
        closeMenu();
        if (confirm('⚠️ Tem certeza que deseja sair?')) {
            if (accessCodeInput) accessCodeInput.value = '';
            localStorage.removeItem('access_granted');
            alert('🚪 Você saiu do sistema.');
        }
    });
}

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

function validateAccess(senha) {
    return senha.trim() === SENHA_CORRETA;
}

function showLoading() {
    if (loadingMessage) {
        loadingMessage.style.display = 'block';
        loadingMessage.textContent = '🔐 Validando acesso...';
    }
}

function hideLoading() {
    if (loadingMessage) loadingMessage.style.display = 'none';
}

function showError(msg) {
    if (errorMessage) {
        errorMessage.textContent = msg;
        errorMessage.style.display = 'block';
        setTimeout(() => errorMessage.style.display = 'none', 3000);
    }
}

function openIframe(url) {
    if (!url) return;
    loginIframe.src = url;
    iframeContainer.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeIframe() {
    iframeContainer.style.display = 'none';
    loginIframe.src = '';
    document.body.style.overflow = '';
}

function processAccess(callback, siteNome) {
    const codigo = accessCodeInput ? accessCodeInput.value : '';
    if (!codigo) {
        showError('❌ Digite o código de acesso!');
        return;
    }
    showLoading();
    setTimeout(() => {
        if (validateAccess(codigo)) {
            hideLoading();
            callback();
            accessCodeInput.value = '';
        } else {
            hideLoading();
            showError(`❌ Código inválido! Acesso negado ao ${siteNome}.`);
            accessCodeInput.value = '';
        }
    }, 500);
}

// Eventos dos botões
if (btnBlaze) {
    btnBlaze.addEventListener('click', function(e) {
        e.preventDefault();
        const codigo = accessCodeInput ? accessCodeInput.value : '';
        if (validateAccess(codigo)) {
            // Redireciona para a página da Blaze
            window.location.href = 'ia-hacker/index.html';
        } else {
            showError('❌ Digite o código de acesso para continuar!');
        }
    });
}

if (btnJonbet) {
    btnJonbet.addEventListener('click', function(e) {
        e.preventDefault();
        processAccess(() => openIframe(URL_JONBET), 'Jonbet');
    });
}

// Tecla Enter
if (accessCodeInput) {
    accessCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && btnBlaze) btnBlaze.click();
    });
}

// Fechar iframe
if (closeIframeBtn) closeIframeBtn.addEventListener('click', closeIframe);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && iframeContainer && iframeContainer.style.display === 'block') closeIframe();
});
if (iframeContainer) {
    iframeContainer.addEventListener('click', (e) => { if (e.target === iframeContainer) closeIframe(); });
}

console.log('✅ Sistema de validação ativado!');
