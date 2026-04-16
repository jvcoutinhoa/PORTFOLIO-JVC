document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-theme');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        if (body.classList.contains('dark-theme')) {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'light');
        }
    });

    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero');

    let width, height;
    let columns;
    let drops = [];
    const fontSize = 16;
    const chars = '01'.split(''); 

    function initMatrix() {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
        columns = Math.floor(width / fontSize) + 1;
        drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }

    window.addEventListener('resize', initMatrix);
    setTimeout(initMatrix, 50);

    function drawMatrix() {
        if (!width || !height) return;

        const isDark = document.body.classList.contains('dark-theme');
        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.15)' : 'rgba(241, 245, 249, 0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = '#2563eb';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 40);
});

const formulario = document.querySelector('#meu-formulario');

function validarFormulario(event) {
    event.preventDefault(); 

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const msg = document.querySelector('#msg').value;

    if (nome === "" || email === "" || msg === "") {
        alert("Por favor, preencha todos os campos antes de enviar.");
    } else {
        alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
        formulario.reset(); 
    }
}

formulario.addEventListener('submit', validarFormulario);

const meusProjetos = [
    {
        titulo: "Projeto 01 - E-commerce",
        descricao: "Uma loja virtual feita com HTML, CSS e JavaScript.",
        link: "https://github.com/jvcoutinhoa?tab=repositories"
    },
    {
        titulo: "Projeto 02 - Portfólio",
        descricao: "Meu portfólio de apresentação feito com tecnologias modernas.",
        link: "https://github.com/jvcoutinhoa?tab=repositories"
    },
    {
        titulo: "Projeto 03 - Registro de Ponto",
        descricao: "Sistema web para registrar o ponto dos funcionários das empresas.",
        link: "https://github.com/jvcoutinhoa?tab=repositories"
    }
];

function renderizarProjetos() {
    const container = document.querySelector('.projetos-container');
    
    container.innerHTML = "";

    meusProjetos.forEach(projeto => {
        const cardHTML = `
            <article class="card-projeto">
                <h3>${projeto.titulo}</h3>
                <p>${projeto.descricao}</p>
                <a href="${projeto.link}" target="_blank">Ver no GitHub</a>
            </article>
        `;
        container.innerHTML += cardHTML;
    });
}

renderizarProjetos();

