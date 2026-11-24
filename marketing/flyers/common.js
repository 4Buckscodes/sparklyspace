const P = {
  sparkle: '<path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" fill="currentColor" stroke="none"/>',
  desk: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  kitchen: '<path d="M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2M8 3v2M12 3v2"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  floor: '<path d="M4 21h16M7 21l1.5-9h7L17 21"/><path d="M10 12V4h4v8"/>',
  shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 5-5"/>',
  reclean: '<path d="M20 12a8 8 0 1 1-2.6-5.9M20 4v4.5h-4.5"/><path d="M9 12l2 2 4-4"/>',
  leaf: '<path d="M5 19c0-8 5-13 15-14 0 10-5 15-13 15"/><path d="M5 19c3-5 6-8 10-10"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  chat: '<path d="M4 20l1.4-4A8 8 0 1 1 8 18.6L4 20z"/><path d="M9 10c0 3 2 5 5 5l1.2-1.4-2-1-1 .7a3 3 0 0 1-1.5-1.5l.7-1-1-2L9 10z" fill="currentColor" stroke="none"/>',
  pin: '<path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
  building: '<rect x="5" y="3" width="14" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
  store: '<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 6 0 2.5 2.5 0 0 0 5 0"/><path d="M10 20v-5h4v5"/>',
  gym: '<path d="M3 9v6M6 7v10M18 7v10M21 9v6M6 12h12"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  door: '<path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17M4 21h16"/><circle cx="15" cy="12.5" r=".8" fill="currentColor"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
};
document.querySelectorAll('[data-i]').forEach(el => {
  const n = el.dataset.i;
  el.innerHTML = `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${el.dataset.w || 1.8}" stroke-linecap="round" stroke-linejoin="round" style="width:100%;height:100%">${P[n]}</svg>`;
});
