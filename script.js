// Add the second business email address when supplied.
const enquiryRecipients = ['vivek@originfoodventures.com'];
const emailButton = document.getElementById('email-button');
const recipientList = enquiryRecipients.join(',');
document.getElementById('contact-email').href = `mailto:${recipientList}`;
emailButton.href = `mailto:${recipientList}?subject=Business%20enquiry`;
document.querySelectorAll('[data-pack]').forEach(link => {
  link.addEventListener('click', () => {
    emailButton.href = `mailto:${recipientList}?subject=${encodeURIComponent(`Coffee enquiry — ${link.dataset.pack}`)}`;
  });
});

// Old links pointed straight at the information section. A new visit should
// introduce the brand first; navigation within the page still scrolls normally.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
if (['#information', '#coffee'].includes(location.hash)) history.replaceState(null, '', location.pathname + location.search);
function openAtBeginning() {
  if (!location.hash || location.hash === '#home') window.scrollTo({top:0,left:0,behavior:'instant'});
}
openAtBeginning();
window.addEventListener('load', openAtBeginning, {once:true});
window.addEventListener('pageshow', event => { if (!event.persisted) openAtBeginning(); });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
// Preserve a visitor's previous explicit animation preference, without showing
// the temporary development switch on the finished website.
let explicitMotion = false;
try { explicitMotion = localStorage.getItem('coffea-motion') === 'full'; } catch { /* Storage is optional. */ }
document.documentElement.dataset.motion = (!reducedMotion.matches || explicitMotion) ? 'full' : 'reduced';
reducedMotion.addEventListener('change', () => {
  document.documentElement.dataset.motion = (!reducedMotion.matches || explicitMotion) ? 'full' : 'reduced';
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    });
  }, {threshold:.08});
  document.documentElement.classList.add('motion');
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}

const progress = document.querySelector('.reading-progress');
let scrollPending = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1,Math.max(0,scrollY/distance)) : 0})`;
  scrollPending = false;
}
addEventListener('scroll', () => { if (!scrollPending) { scrollPending=true; requestAnimationFrame(updateProgress); } }, {passive:true});
addEventListener('resize', updateProgress, {passive:true});
updateProgress();

if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
  const wordmark = document.querySelector('.wordmark');
  wordmark.addEventListener('pointermove', event => {
    if (reducedMotion.matches && !explicitMotion) return;
    const r=wordmark.getBoundingClientRect();
    wordmark.style.setProperty('--tilt-x',`${-(event.clientY-r.top-r.height/2)/r.height*6}deg`);
    wordmark.style.setProperty('--tilt-y',`${(event.clientX-r.left-r.width/2)/r.width*6}deg`);
  });
  wordmark.addEventListener('pointerleave',()=>{wordmark.style.setProperty('--tilt-x','0deg');wordmark.style.setProperty('--tilt-y','0deg');});
  document.querySelectorAll('.profile-portrait').forEach(portrait=>{
    portrait.addEventListener('pointermove',event=>{
      if(reducedMotion.matches && !explicitMotion)return;
      const r=portrait.getBoundingClientRect();
      portrait.style.setProperty('--portrait-x',`${((event.clientX-r.left)/r.width-.5)*12}px`);
      portrait.style.setProperty('--portrait-y',`${((event.clientY-r.top)/r.height-.5)*12}px`);
    });
    portrait.addEventListener('pointerleave',()=>{portrait.style.setProperty('--portrait-x','0px');portrait.style.setProperty('--portrait-y','0px');});
  });
}
