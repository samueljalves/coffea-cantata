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
  'What kind of coffee experience do you want to offer?',
  'Do your customers prefer black or milk-based coffee?',
  'Which flavours suit your menu: chocolatey, nutty, sweet, fruity or bold?',
  'Are you looking for affordable, premium or specialty coffee?',
  'Would you prefer a consistent house blend or a rotating selection?'
];
const dialogue = document.querySelector('#coffee-dialogue');
const question = document.querySelector('#question');
let currentPrompt = 0;
let typedLength = prompts[0].length;
function advancePrompt() {
  if (document.hidden || dialogue.matches(':focus-within')) {
    setTimeout(advancePrompt, 500);
    return;
  }
  if (reducedMotion.matches) {
    currentPrompt = (currentPrompt + 1) % prompts.length;
    typedLength = prompts[currentPrompt].length;
    prompt.textContent = prompts[currentPrompt];
    setTimeout(advancePrompt, 6500);
    return;
  }
  if (typedLength === prompts[currentPrompt].length) {
    currentPrompt = (currentPrompt + 1) % prompts.length;
    typedLength = 0;
    prompt.textContent = '';
    setTimeout(advancePrompt, 260);
    return;
  }
  typedLength++;
  prompt.textContent = prompts[currentPrompt].slice(0, typedLength);
  setTimeout(advancePrompt, typedLength === prompts[currentPrompt].length ? 4500 : 38);
}
setTimeout(advancePrompt, 4500);

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
