// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {

  // Captura o formulário e o elemento de resultado
  const form = document.getElementById('formContato');
  const resultado = document.getElementById('resultado');

  // Se existir formulário, adiciona tratamento
  if (form) {
    // Define atributo de acessibilidade
    if (resultado) resultado.setAttribute('aria-live', 'polite');

    // Evento de envio do formulário
    form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores dos campos
    const nome = (document.getElementById('nome') || { value: '' }).value.trim();
    const email = (document.getElementById('email') || { value: '' }).value.trim();
    const mensagem = (document.getElementById('mensagem') || { value: '' }).value.trim();

    // Validação de campos vazios
    if (!nome || !email || !mensagem) {
      if (resultado) {
        resultado.textContent = 'Por favor, preencha todos os campos.';
        resultado.className = 'error';
      } else {
        alert('Por favor, preencha todos os campos.');
      }
      return;
    }

    // Validação de e-mail com expressão regular
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      if (resultado) {
        resultado.textContent = 'E-mail inválido.';
        resultado.className = 'error';
      } else {
        alert('E-mail inválido.');
      }

      // Foca no campo de e-mail
      const emailInput = document.getElementById('email');
      if (emailInput) emailInput.focus();
      return;
    }

    // Desativa botão para evitar múltiplos envios
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Simulação de envio
    setTimeout(function() {

      // Simulação de envio (não envia dados reais para servidor)
      if (resultado) {
        resultado.textContent = 'Mensagem enviada com sucesso!';
        resultado.className = 'success';
      } else {
        alert('Mensagem enviada com sucesso!');
      }

      // Limpa formulário
      form.reset();

      // Reativa botão
      if (submitBtn) submitBtn.disabled = false;

    }, 500);
    });
  }
  
    // Modo escuro: toggle e persistência
    (function() {
      const THEME_KEY = 'theme';
      const root = document.documentElement;

      function applyTheme(theme) {
        if (theme === 'dark') {
          root.setAttribute('data-theme', 'dark');
        } else {
          root.setAttribute('data-theme', 'light');
        }
        updateToggleButton(theme);
      }

      function getPreferredTheme() {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) return saved;
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      function toggleTheme() {
        const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
      }

      function createToggle() {
        const btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.className = 'theme-toggle';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Alternar modo (claro/escuro)');
        btn.addEventListener('click', toggleTheme);
        const nav = document.querySelector('nav');
        if (nav) {
          // agrupa os links em .nav-links para permitir centralização
          let wrapper = nav.querySelector('.nav-links');
          if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.className = 'nav-links';
            // move todos os anchors atuais para o wrapper
            const anchors = Array.from(nav.querySelectorAll('a'));
            anchors.forEach(a => wrapper.appendChild(a));
            // adiciona o wrapper no início do nav
            nav.appendChild(wrapper);
          }
          // adiciona o botão após o wrapper (ficará à direita)
          nav.appendChild(btn);
        } else {
          const container = document.querySelector('.container');
          if (container) container.insertBefore(btn, container.firstChild);
        }
        return btn;
      }

      let toggleBtn = document.getElementById('theme-toggle') || createToggle();

      function updateToggleButton(theme) {
        if (!toggleBtn) return;
        // mostrar ícone correspondente ao modo atual (lua para escuro, sol para claro)
        toggleBtn.textContent = theme === 'dark' ? '🌙' : '☀️';
        toggleBtn.setAttribute('aria-pressed', theme === 'dark');
        toggleBtn.title = theme === 'dark' ? 'Modo escuro ativado' : 'Modo claro ativado';
      }

      // Inicializa
      const initial = getPreferredTheme();
      applyTheme(initial);
    })();

  });
