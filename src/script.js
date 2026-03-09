const target = new Date('2026-03-15T00:00:00');

    // Progress: from some start date to target
    const start = new Date('2026-03-01T00:00:00');
    const totalDuration = target - start;

    function pad(n) { return String(n).padStart(2, '0'); }

    function updateFlip(el, newVal) {
      if (el.textContent !== newVal) {
        el.textContent = newVal;
        el.classList.remove('flip');
        void el.offsetWidth;
        el.classList.add('flip');
      }
    }

    function tick() {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('progress-fill').style.width = '100%';
        document.getElementById('progress-pct').textContent = '100%';
        return;
      }

      const days    = Math.floor(diff / 86400000);
      const hours   = Math.floor((diff % 86400000) / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      updateFlip(document.getElementById('days'),    pad(days));
      updateFlip(document.getElementById('hours'),   pad(hours));
      updateFlip(document.getElementById('minutes'), pad(minutes));
      updateFlip(document.getElementById('seconds'), pad(seconds));

      // Progress
      const elapsed = now - start;
      const pct = Math.min(100, Math.max(0, Math.round((elapsed / totalDuration) * 100)));
      document.getElementById('progress-fill').style.width = pct + '%';
      document.getElementById('progress-pct').textContent = pct + '%';
    }

    tick();
    setInterval(tick, 1000);