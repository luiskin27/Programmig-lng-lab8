// === sendhw.js ===
// Только для страницы sendhw.html

// 1. Фоновая музыка (menu.mp3) — зацикленная
const bgMusic = new Audio('../sound/menu.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4; // громкость 40%

// Автозапуск при загрузке
window.addEventListener('load', () => {
  bgMusic.play().catch(e => {
    console.log("Автозапуск музыки заблокирован браузером. Требуется взаимодействие.");
  });
});

// 2. Звук клика при переходе (click.mp3)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.href && !link.href.startsWith('#')) {
    const clickSound = new Audio('../sound/click.mp3');
    clickSound.volume = 0.6;
    clickSound.play();
  }
});