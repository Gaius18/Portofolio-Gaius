// Animation effet machine à écrire pour l'intro
const phrases = [
  "Bonjour, je suis Gaïus Dogbe.",
  "Développeur Full Stack, créatif et ambitieux.",
  "Basé en Côte d’Ivoire.",
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typedText = document.getElementById('typed-text');
const cursor = document.querySelector('.cursor');

function typeWriter() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    charIndex--;
    typedText.textContent = current.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeWriter, 600);
    } else {
      setTimeout(typeWriter, 40);
    }
  } else {
    charIndex++;
    typedText.textContent = current.substring(0, charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1200);
    } else {
      setTimeout(typeWriter, 80);
    }
  }
}
typeWriter();

// =====================
// Gestion dynamique des projets
// =====================
// Pour ajouter un projet :
// 1. Ouvre le fichier 'projects.js'
// 2. Ajoute un objet dans le tableau 'projets' avec :
//    - image: chemin de l'image (ex: 'images/voiceflow.jpg')
//    - titre: nom du projet
//    - desc: description courte
//    - tech: tableau des technos (ex: ['Flutter', 'Firebase'])
//    - demo: lien vers la démo (URL)
//    - github: lien vers le repo GitHub (URL)
// 3. Enregistre et rafraîchis la page !

// Charge les projets depuis projects.js
const grille = document.getElementById('grille-projets');

function afficherProjets() {
  if (typeof window.projets === 'undefined') return;
  grille.innerHTML = '';
  window.projets.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'projet-card';
    card.innerHTML = `
      <img src="${p.image}" alt="${p.titre}" class="projet-image">
      <div class="projet-titre">${p.titre}</div>
      <div class="projet-desc">${p.desc}</div>
      <div class="projet-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="projet-liens">
        <a href="${p.demo}" target="_blank" rel="noopener">Demo</a>
        <a href="${p.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    `;
    grille.appendChild(card);
  });
  revealOnScroll();
}

// Animation d'apparition au scroll (scroll reveal)
function revealOnScroll() {
  const cards = document.querySelectorAll('.projet-card');
  const trigger = window.innerHeight * 0.92;
  cards.forEach(card => {
    const top = card.getBoundingClientRect().top;
    if (top < trigger) {
      card.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Dark mode toggle
const darkToggle = document.getElementById('darkmode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('darkmode', document.body.classList.contains('dark'));
});
// Init dark mode from storage
if (localStorage.getItem('darkmode') === 'true') {
  document.body.classList.add('dark');
}

// Formulaire de contact (mailto)
// Toast notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}
// Compteur de visiteurs local (démo)
function updateVisitorCounter() {
  let count = parseInt(localStorage.getItem('visitorCount') || '0', 10);
  count++;
  localStorage.setItem('visitorCount', count);
  document.getElementById('visitor-counter').textContent = `👁️ ${count}`;
}
window.addEventListener('DOMContentLoaded', updateVisitorCounter);

// Apparition dynamique du carrousel de compétences + défilement automatique
// Carrousel de compétences : animation type "marquee" CSS
window.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('competences-carousel-container');
  if (!el) return;
  setTimeout(() => {
    el.style.display = 'block';
    setTimeout(() => {
      el.classList.add('visible');
      el.style.opacity = 1;
      // Marquee dynamique
      const carousel = el.querySelector('.competences-carousel');
      if (carousel && carousel.children.length > 0) {
        // Crée un wrapper track
        const track = document.createElement('div');
        track.className = 'marquee-track';
        // Clone le contenu 2x pour effet infini
        track.innerHTML = carousel.innerHTML + carousel.innerHTML;
        carousel.innerHTML = '';
        carousel.appendChild(track);
        // Pause au survol
        carousel.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
        carousel.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
      }
    }, 50);
  }, 2000);
});

// Formulaire de contact (mailto)
const formContact = document.getElementById('form-contact');
if (formContact) {
  formContact.addEventListener('submit', function(e) {
    e.preventDefault();
    const nom = this.nom.value;
    const email = this.email.value;
    const message = this.message.value;
    const subject = encodeURIComponent('Contact depuis le portfolio');
    const body = encodeURIComponent(
      `Bonjour Gaïus,%0A%0AMon nom : ${nom}%0AMon email : ${email}%0AMon message : ${message}`
    );
    showToast('Merci pour ton message, Gaïus te répondra vite !');
    setTimeout(() => {
      window.location.href = `mailto:dogbegaius@gmail.com?subject=${subject}&body=${body}`;
    }, 600);
  });
}

// Loader animé personnalisé
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
  }, 1200); // délai pour l'effet
});

// Initialise AOS.js pour la timeline et autres animations scroll reveal
window.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 900, once: true });
});

// SUPPRIMER toute la logique multilingue (translations, setLang, etc.)

// Charge le fichier projects.js dynamiquement
const scriptProjet = document.createElement('script');
scriptProjet.src = 'projects.js';
scriptProjet.onload = afficherProjets;
document.body.appendChild(scriptProjet);

// Générateur PDF de CV
function telechargerCV() {
  // Utilise jsPDF via CDN
  if (typeof window.jspdf === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    script.onload = telechargerCV;
    document.body.appendChild(script);
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Gaïus Dogbe', 20, 20);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text('Développeur passionné, curieux et engagé dans l\'innovation technologique en Afrique francophone.', 20, 32, { maxWidth: 170 });
  doc.setFontSize(15);
  doc.text('Compétences', 20, 48);
  doc.setFontSize(12);
  doc.text('- Flutter\n- Firebase\n- Python\n- Flask\n- HTML/CSS', 20, 56);
  doc.setFontSize(15);
  doc.text('Parcours', 20, 80);
  doc.setFontSize(12);
  doc.text('2023 : Début Flutter\n2024 : Création VoiceFlow\n2025 : Hackathon AI, projets IA, etc.', 20, 88);
  doc.save('CV-Gaius-Dogbe.pdf');
}
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', telechargerCV);
}

// =====================
// Dynamique section À propos de moi (original)
// =====================

// Effet machine à écrire sur l'accroche
const aproposTyped = document.getElementById('apropos-typed');
if (aproposTyped) {
  const accroches = [
    'avec passion.',
    'pour l’Afrique.',
    'avec créativité.',
    'qui changent la donne.',
    'et je ne m’arrête jamais !',
  ];
  let accIndex = 0, accChar = 0, accDeleting = false;
  function typeApropos() {
    const current = accroches[accIndex];
    if (accDeleting) {
      accChar--;
      aproposTyped.textContent = current.substring(0, accChar);
      if (accChar === 0) {
        accDeleting = false;
        accIndex = (accIndex + 1) % accroches.length;
        setTimeout(typeApropos, 600);
      } else {
        setTimeout(typeApropos, 40);
      }
    } else {
      accChar++;
      aproposTyped.textContent = current.substring(0, accChar);
      if (accChar === current.length) {
        accDeleting = true;
        setTimeout(typeApropos, 1200);
      } else {
        setTimeout(typeApropos, 80);
      }
    }
  }
  typeApropos();
}

// Carrousel de compétences (simple, défilement horizontal auto)
const competences = [
  { nom: 'Flutter', icon: 'flutter' },
  { nom: 'Firebase', icon: 'firebase' },
  { nom: 'Python', icon: 'python' },
  { nom: 'Flask', icon: 'flask' },
  { nom: 'HTML/CSS', icon: 'htmlcss' },
  { nom: 'React', icon: 'react' },
  { nom: 'PostgreSQL', icon: 'postgresql' },
  { nom: 'MySQL', icon: 'mysql' },
  { nom: 'Whisper (OpenAI)', icon: 'whisper' },
  { nom: 'Machine Learning', icon: 'ml' },
];
const carousel = document.getElementById('competences-carousel');
if (carousel) {
  let idx = 0;
  function renderCompetence(i) {
    const c = competences[i];
    return `<span class="competence-item ${c.icon}">${c.nom}</span>`;
  }
  function updateCarousel() {
    carousel.innerHTML =
      renderCompetence(idx % competences.length) +
      renderCompetence((idx + 1) % competences.length) +
      renderCompetence((idx + 2) % competences.length);
    idx = (idx + 1) % competences.length;
  }
  updateCarousel();
  setInterval(updateCarousel, 1700);
}

// Fun fact/citation dynamique
const funfacts = [
  "J'ai appris à coder avant de savoir faire du vélo !",
  "Je peux faire un site web plus vite que mon ombre.",
  "Je rêve de créer une IA qui parle baoulé.",
  "J'ai déjà codé 12h d'affilée... pour le fun !",
  "Je collectionne les stickers de hackathons.",
  "Ma playlist de code : 80% gospel, 20% lo-fi.",
  "Un bug ? Un défi de plus à relever !",
  "Je crois que le café, c'est du code liquide.",
  "J'ai pitché un projet devant Google !",
  "Je code même en vacances (chut 🤫)"
];
const funfactBtn = document.getElementById('funfact-btn');
const funfactText = document.getElementById('funfact-text');
if (funfactBtn && funfactText) {
  funfactBtn.addEventListener('click', () => {
    const idx = Math.floor(Math.random() * funfacts.length);
    funfactText.textContent = funfacts[idx];
    funfactText.style.color = `hsl(${Math.floor(Math.random()*360)},70%,45%)`;
  });
  // Affiche un fun fact au chargement
  funfactBtn.click();
} 