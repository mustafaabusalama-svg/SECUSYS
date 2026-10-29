(() => {
  const now = new Date();
  const riyadhParts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Riyadh', year: 'numeric', month: 'numeric'
  }).formatToParts(now);
  const year = Number(riyadhParts.find((part) => part.type === 'year').value);
  const month = Number(riyadhParts.find((part) => part.type === 'month').value);
  const offerMonth = document.getElementById('offer-month');
  if (offerMonth) {
    offerMonth.textContent = new Intl.DateTimeFormat('ar-SA', {
      timeZone: 'Asia/Riyadh', month: 'long'
    }).format(now);
  }
  const end = Date.UTC(year, month, 1) - (3 * 60 * 60 * 1000);
  const fields = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };
  if (Object.values(fields).some((field) => !field)) return;
  const render = () => {
    let remaining = Math.max(0, end - Date.now());
    const days = Math.floor(remaining / 86400000); remaining %= 86400000;
    const hours = Math.floor(remaining / 3600000); remaining %= 3600000;
    const minutes = Math.floor(remaining / 60000); remaining %= 60000;
    const seconds = Math.floor(remaining / 1000);
    fields.days.textContent = String(days).padStart(2, '0');
    fields.hours.textContent = String(hours).padStart(2, '0');
    fields.minutes.textContent = String(minutes).padStart(2, '0');
    fields.seconds.textContent = String(seconds).padStart(2, '0');
  };
  render();
  window.setInterval(render, 1000);
})();
