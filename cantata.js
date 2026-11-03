const opening = document.querySelector('#home');
const panels = document.querySelectorAll('main > section');
const links = document.querySelectorAll('.site-nav nav a');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window) {
  new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('js-opening', entry.isIntersecting);
  }, { threshold: 0.6 }).observe(opening);

  const panelsInView = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.querySelector('.panel-inner')?.classList.add('section-enter');
      for (const link of links) {
        if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    }
  }, { threshold: 0, rootMargin: '-40% 0px -40% 0px' });
  panels.forEach(panel => panelsInView.observe(panel));
}

const prompt = document.querySelector('#coffee-prompt');
const prompts = [
  'What kind of coffee do your guests enjoy?',
  'Which roast profile fits your menu?',
  'What flavours would you like in the cup?',
  'How do your customers take their coffee?'
];
const dialogue = document.querySelector('#coffee-dialogue');
const question = document.querySelector('#question');
let currentPrompt = 0;
setInterval(() => {
  if (document.hidden || dialogue.matches(':focus-within')) return;
  currentPrompt = (currentPrompt + 1) % prompts.length;
  prompt.textContent = prompts[currentPrompt];
  if (!reducedMotion.matches) {
    prompt.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'none' }], {
      duration: 450,
      easing: 'ease-out'
    });
  }
}, 6500);

dialogue.addEventListener('submit', event => {
  event.preventDefault();
  const message = question.value.trim();
  if (!message) {
    question.focus();
    return;
  }
  const email = document.querySelector('#business-email').href;
  location.href = email + '?subject=Coffee%20enquiry&body=' + encodeURIComponent(message);
});
dialogue.querySelector('button').disabled = false;
