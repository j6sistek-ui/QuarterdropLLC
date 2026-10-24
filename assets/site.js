/* Progressive enhancement only. Navigation and content work without JavaScript. */
(() => {
  'use strict';
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionButton = document.querySelector('.motion-toggle');
  const arcade = document.querySelector('#arcade');
  const dropButton = document.querySelector('[data-drop]');
  const coinStatus = document.querySelector('#arcade-status');
  const coinAnnouncement = document.querySelector('#coin-announcement');
  let manualPause = false;
  let dropTimer;
  let statusTimer;
  const motionAllowed = () => !reducedMotion.matches && !manualPause;

  function finishDrop() {
    clearTimeout(dropTimer);
    arcade?.classList.remove('is-dropping');
    if (dropButton) dropButton.disabled = false;
  }
  function updateMotion() {
    const paused = !motionAllowed();
    root.classList.toggle('motion-paused', paused);
    if (motionButton) {
      motionButton.hidden = false;
      motionButton.textContent = paused ? 'Motion: off' : 'Motion: on';
      motionButton.setAttribute('aria-pressed', String(paused));
      motionButton.setAttribute('aria-label', reducedMotion.matches ? 'Motion disabled by your system preference' : paused ? 'Enable site motion' : 'Pause site motion');
      motionButton.disabled = reducedMotion.matches;
    }
    if (paused) finishDrop();
  }
  motionButton?.addEventListener('click', () => { manualPause = !manualPause; updateMotion(); });
  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();

  if (dropButton && arcade) {
    dropButton.hidden = false;
    dropButton.addEventListener('click', () => {
      clearTimeout(statusTimer);
      if (coinStatus) coinStatus.textContent = 'One more round? Always.';
      if (coinAnnouncement) coinAnnouncement.textContent = 'Quarter dropped. Ready for one more round? Explore our games below.';
      if (motionAllowed()) {
        finishDrop();
        dropButton.disabled = true;
        arcade.classList.add('is-dropping');
        dropTimer = setTimeout(finishDrop, 1650);
      }
      statusTimer = setTimeout(() => {
        if (coinStatus) coinStatus.textContent = 'A little coin. A new world.';
        if (coinAnnouncement) coinAnnouncement.textContent = '';
      }, 4200);
    });
    arcade.addEventListener('pointermove', (event) => {
      if (!motionAllowed() || !finePointer.matches || event.pointerType === 'touch') return;
      const bounds = arcade.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      arcade.style.setProperty('--tilt-x', `${(-y * 7).toFixed(2)}deg`);
      arcade.style.setProperty('--tilt-y', `${(x * 9).toFixed(2)}deg`);
    });
    arcade.addEventListener('pointerleave', () => {
      arcade.style.setProperty('--tilt-x', '0deg');
      arcade.style.setProperty('--tilt-y', '0deg');
    });
  }

  if ('IntersectionObserver' in window && motionAllowed()) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
  }

  const dialog = document.querySelector('.gameplay-dialog');
  const openVideo = document.querySelector('[data-open-video]');
  const closeVideo = dialog?.querySelector('.close-dialog');
  const video = dialog?.querySelector('video');
  if (dialog && openVideo && video && typeof dialog.showModal === 'function') {
    openVideo.hidden = false;
    openVideo.addEventListener('click', () => {
      if (!video.getAttribute('src')) {
        video.poster = video.dataset.poster;
        video.preload = 'metadata';
        video.src = video.dataset.src;
      }
      dialog.showModal();
      document.body.classList.add('dialog-open');
      // Playback remains a deliberate user action and respects reduced motion.
      closeVideo?.focus();
    });
    closeVideo?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', () => {
      video.pause();
      document.body.classList.remove('dialog-open');
      openVideo.focus();
    });
  }
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { finishDrop(); video?.pause(); }
  });
})();
