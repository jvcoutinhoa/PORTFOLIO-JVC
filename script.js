document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Lógica do Dark Mode ---
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

    // --- 2. Lógica da Animação Matrix Azul ---
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    const heroSection = document.getElementById('hero');

    let width, height;
    let columns;
    let drops = [];
    const fontSize = 16;
    const chars = '01'.split(''); 

    // Função para ajustar o tamanho do canvas com precisão
    function initMatrix() {
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
        columns = Math.floor(width / fontSize) + 1;
        drops = [];
        for(let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
    }

    // Inicia e ajusta as gotas quando a janela muda de tamanho
    window.addEventListener('resize', initMatrix);
    // Dá um pequeno atraso (50ms) para garantir que o CSS carregou antes de medir a secção
    setTimeout(initMatrix, 50);

    // Função que desenha a chuva frame a frame
    function drawMatrix() {
        if (!width || !height) return; // Proteção para caso não tenha carregado

        // Fundo com opacidade para o rastro da animação
        const isDark = document.body.classList.contains('dark-theme');
        ctx.fillStyle = isDark ? 'rgba(15, 23, 42, 0.15)' : 'rgba(241, 245, 249, 0.15)';
        ctx.fillRect(0, 0, width, height);

        // Cor dos códigos (Azul do tema)
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
    
    // Inicia a animação (a cada 40 milissegundos)
    setInterval(drawMatrix, 40);
});