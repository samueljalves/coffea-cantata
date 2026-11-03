// Add the second business email address when supplied.
const enquiryRecipients = ['vivek@originfoodventures.com'];
const emailButton = document.getElementById('email-button');
const emailLink = document.getElementById('contact-email');
const recipientList = enquiryRecipients.join(',');
emailLink.href = `mailto:${recipientList}`;
emailButton.href = `mailto:${recipientList}?subject=Business%20enquiry`;

document.querySelectorAll('[data-pack]').forEach(link => {
  link.addEventListener('click', () => {
    emailButton.href = `mailto:${recipientList}?subject=${encodeURIComponent(`Coffee enquiry — ${link.dataset.pack}`)}`;
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionEnabled = !reducedMotion.matches;
try {
  const savedMotion = localStorage.getItem('coffea-motion');
  if (savedMotion) motionEnabled = savedMotion === 'full';
} catch { /* Storage is optional. */ }
const motionToggle = document.getElementById('motion-toggle');
function updateMotion() {
  document.documentElement.dataset.motion = motionEnabled ? 'full' : 'reduced';
  motionToggle.textContent = motionEnabled ? 'Animation on' : 'Animation off';
  motionToggle.setAttribute('aria-pressed', String(motionEnabled));
}
updateMotion();
motionToggle.hidden = false;
motionToggle.addEventListener('click', () => {
  motionEnabled = !motionEnabled;
  updateMotion();
  try { localStorage.setItem('coffea-motion', motionEnabled ? 'full' : 'reduced'); } catch { /* Storage is optional. */ }
});
reducedMotion.addEventListener('change', () => {
  let savedMotion;
  try { savedMotion = localStorage.getItem('coffea-motion'); } catch { /* Storage is optional. */ }
  if (!savedMotion) { motionEnabled = !reducedMotion.matches; updateMotion(); }
});
{
  let letterIndex = 0;
  document.querySelectorAll('.wordmark h1 > span').forEach(line => {
    const text = line.textContent;
    line.setAttribute('aria-label', text);
    line.replaceChildren(...[...text].map(character => {
      const letter = document.createElement('span');
      letter.className = 'letter';
      letter.textContent = character;
      letter.setAttribute('aria-hidden', 'true');
      letter.style.setProperty('--letter', letterIndex++);
      return letter;
    }));
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

const progress = document.querySelector('.reading-progress');
let scrollPending = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0})`;
  scrollPending = false;
}
addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateProgress); }
}, { passive: true });
addEventListener('resize', updateProgress, { passive: true });
updateProgress();

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  const wordmark = document.querySelector('.wordmark');
  wordmark.addEventListener('pointermove', event => {
    if (!motionEnabled) return;
    const rect = wordmark.getBoundingClientRect();
    wordmark.style.setProperty('--tilt-x', `${-(event.clientY - rect.top - rect.height / 2) / rect.height * 8}deg`);
    wordmark.style.setProperty('--tilt-y', `${(event.clientX - rect.left - rect.width / 2) / rect.width * 8}deg`);
  });
  wordmark.addEventListener('pointerleave', () => {
    wordmark.style.setProperty('--tilt-x', '0deg');
    wordmark.style.setProperty('--tilt-y', '0deg');
  });
  document.querySelectorAll('.profile-portrait').forEach(portrait => {
    portrait.addEventListener('pointermove', event => {
      if (!motionEnabled) return;
      const rect = portrait.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      portrait.style.setProperty('--pointer-x', `${x}px`);
      portrait.style.setProperty('--pointer-y', `${y}px`);
      portrait.style.setProperty('--portrait-x', `${(x / rect.width - .5) * 12}px`);
      portrait.style.setProperty('--portrait-y', `${(y / rect.height - .5) * 12}px`);
    });
    portrait.addEventListener('pointerleave', () => {
      portrait.style.setProperty('--portrait-x', '0px');
      portrait.style.setProperty('--portrait-y', '0px');
    });
  });
}
