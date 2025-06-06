// Menu mobile
const menuButton = document.querySelector('.mobile-menu-button');
const nav = document.querySelector('.nav ul');

menuButton.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dados dos profissionais
const profissionais = {
    diogo: {
        nome: "Diogo Moura",
        telefone: "5514997714972", // Substitua pelo número real
        numeroExibicao: "(14) 99771-4972",
        instagram: "https://www.instagram.com/diogomourabarbershop/",
        instagramUser: "@diogomourabarbershop"
    },
    luis: {
        nome: "Luis Gustavo",
        telefone: "5514997591398", // Substitua pelo número real
        numeroExibicao: "(14) 99759-1398",
        instagram: "https://www.instagram.com/lgustavomoura_/",
        instagramUser: "@lgustavomoura_"
    }
};

// Elementos do DOM
const professionalBtns = document.querySelectorAll('.professional-btn');
const professionalNumber = document.getElementById('professional-number');
const whatsappLink = document.getElementById('whatsapp-link');
let profissionalSelecionado = 'diogo';

// Atualizar dados do profissional selecionado
function atualizarProfissional() {
    const prof = profissionais[profissionalSelecionado];
    professionalNumber.textContent = prof.numeroExibicao;
    document.getElementById('professional-instagram').innerHTML = 
        `<a href="${prof.instagram}" target="_blank" rel="noopener">${prof.instagramUser}</a>`;
    whatsappLink.href = `https://wa.me/${prof.telefone}`;
}

// Selecionar profissional
professionalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        professionalBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        profissionalSelecionado = btn.dataset.professional;
        atualizarProfissional();
    });
});

// Enviar para WhatsApp
const whatsappForm = document.getElementById('whatsapp-form');

whatsappForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const servico = document.getElementById('servico').value;
    const dataHora = document.getElementById('data-hora').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Formatar a data
    const dataFormatada = formatarData(dataHora);
    
    // Criar mensagem
    let texto = `Olá ${profissionais[profissionalSelecionado].nome}, gostaria de agendar um horário!\n\n`;
    texto += `*Nome:* ${nome}\n`;
    texto += `*Telefone:* ${telefone}\n`;
    texto += `*Serviço:* ${servico}\n`;
    texto += `*Data/Hora:* ${dataFormatada}\n`;
    
    if (mensagem) {
        texto += `*Observações:* ${mensagem}\n`;
    }
    
    texto += `\nAguardo confirmação, obrigado!`;
    
    // Codificar para URL
    const textoCodificado = encodeURIComponent(texto);
    const numeroWhatsApp = profissionais[profissionalSelecionado].telefone;
    
    // Abrir WhatsApp
    window.open(`https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`, '_blank');
});

function formatarData(dataHora) {
    if (!dataHora) return 'A definir';
    
    const [data, horaCompleta] = dataHora.split('T');
    const [ano, mes, dia] = data.split('-');
    const [hora, minutos] = horaCompleta.split(':');
    
    return `${dia}/${mes}/${ano} às ${hora}:${minutos}h`;
}

// Máscara para telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 11) {
        value = value.substring(0, 11);
    }
    
    // Formatação: (00) 00000-0000
    if (value.length > 2) {
        value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
    }
    if (value.length > 10) {
        value = `${value.substring(0, 10)}-${value.substring(10)}`;
    }
    
    e.target.value = value;
});

// Inicializar
atualizarProfissional();

document.querySelectorAll('.map-info a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(link.href, '_blank');
    });
});
