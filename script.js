/* ===================================================== */
/* Fichier JavaScript externe contenant la logique du test et de l'animation */
/* ===================================================== */

/* --------------------------------------------------------------------- */
/* Déclaration du tableau de questions pour le test, avec leurs options   */
/* --------------------------------------------------------------------- */
const questions = [
  {
    // Question 1 : Rapport à l'échec
    question: "Votre rapport à l'échec", // Texte de la question
    options: [
      // Option 1 : Perception positive de l'échec
      "Je perçois l'échec comme une opportunité d'apprentissage et j'en tire des leçons.",
      // Option 2 : Echec décourageant mais possibilité de rebondir
      "L'échec me décourage, mais j'essaie de rebondir.",
      // Option 3 : Peur de l'échec, évitement des risques
      "L'échec me fait peur et j'évite de prendre des risques."
    ]
  },
  {
    // Question 2 : Dialogue intérieur
    question: "Votre dialogue intérieur", // Texte de la question
    options: [
      // Option 1 : Discours intérieur positif
      "J'ai un discours intérieur majoritairement positif et encourageant.",
      // Option 2 : Alternance entre pensées positives et négatives
      "J'alterne entre pensées positives et négatives, selon les situations.",
      // Option 3 : Discours intérieur critique et auto-sabotant
      "Mon discours intérieur est souvent critique et auto-sabotant."
    ]
  },
  {
    // Question 3 : Réaction face aux défis de la vie
    question: "Face aux défis de la vie…", // Texte de la question
    options: [
      // Option 1 : Confiance et persévérance face aux défis
      "Je me sens confiant(e) et je trouve des solutions avec persévérance.",
      // Option 2 : Doute initial mais capacité à avancer
      "Je doute parfois, mais je finis par trouver un moyen d'avancer.",
      // Option 3 : Sensation d'être dépassé(e) et paralysé(e)
      "Je me sens souvent dépassé(e) et paralysé(e) par les difficultés."
    ]
  },
  {
    // Question 4 : Rapport aux émotions
    question: "Votre rapport aux émotions", // Texte de la question
    options: [
      // Option 1 : Acceptation et gestion saine des émotions
      "Je reconnais et accepte mes émotions sans les laisser me submerger.",
      // Option 2 : Gestion des émotions avec quelques pertes de contrôle
      "Je gère mes émotions, mais certaines situations me font perdre le contrôle.",
      // Option 3 : Dominance des émotions affectant négativement les décisions
      "Mes émotions prennent souvent le dessus et influencent négativement mes décisions."
    ]
  },
  {
    // Question 5 : Niveau d'introspection
    question: "Votre niveau d'introspection", // Texte de la question
    options: [
      // Option 1 : Pratique régulière de la réflexion personnelle
      "Je prends régulièrement du temps pour réfléchir à mes pensées et comportements.",
      // Option 2 : Réflexion occasionnelle sans approfondissement
      "J'y pense de temps en temps, mais sans approfondir.",
      // Option 3 : Manque d'habitude d'analyse personnelle
      "Je n'ai pas vraiment l'habitude de m'analyser ou de remettre en question mes schémas."
    ]
  },
  {
    // Question 6 : Engagement dans le développement personnel
    question: "Votre engagement dans votre développement personnel", // Texte de la question
    options: [
      // Option 1 : Utilisation de techniques concrètes pour progresser
      "J'utilise des techniques concrètes (exercices, journaling, méditation…) pour progresser.",
      // Option 2 : Désir d'avancer mais difficultés à instaurer une routine
      "J'ai envie d'avancer, mais j'ai du mal à mettre en place des actions régulières.",
      // Option 3 : Indécision sur la démarche à suivre et tendance à la procrastination
      "Je ne sais pas par où commencer et j'ai tendance à procrastiner."
    ]
  },
  {
    // Question 7 : Rapport au changement
    question: "Votre rapport au changement", // Texte de la question
    options: [
      // Option 1 : Acceptation curieuse et intégration progressive du changement
      "J'accueille le changement avec curiosité et je l'intègre progressivement dans ma vie.",
      // Option 2 : Difficulté avec le changement malgré des efforts d'acceptation
      "J'ai du mal avec le changement, mais je fais des efforts pour l'accepter.",
      // Option 3 : Peur du changement et préférence pour la zone de confort
      "Le changement me fait peur et j'ai tendance à rester dans ma zone de confort."
    ]
  }
];

/* --------------------------------------------------------------------- */
/* Variables globales pour suivre l'état du test                        */
/* --------------------------------------------------------------------- */
let currentQuestion = 0; // Index de la question actuelle (démarre à 0)
let answers = [];        // Tableau pour stocker les réponses de l'utilisateur

// Récupération des éléments HTML dans lesquels le contenu sera affiché
const questionContainer = document.getElementById('question-container'); // Conteneur des questions
const resultContainer = document.getElementById('result');               // Conteneur du résultat final
const progressBar = document.getElementById('progress');                 // Élément de la barre de progression
const restartButton = document.getElementById('restart');                // Bouton pour redémarrer le test

/* --------------------------------------------------------------------- */
/* Fonction displayQuestion : Affiche la question et ses options        */
/* --------------------------------------------------------------------- */
function displayQuestion() {
  // Récupération de la question courante à partir du tableau
  const question = questions[currentQuestion];
  // Création de la structure HTML pour afficher la question
  // Le h2 contient le texte de la question et est centré via un style inline
  let html = `<h2 style="text-align: center;">${question.question}</h2><div class="options">`;
  // Pour chaque option de la question, création d'un div cliquable
  question.options.forEach((option, index) => {
    html += `<div class="option" onclick="selectOption(${index})">${option}</div>`;
  });
  html += '</div>'; // Fermeture du conteneur des options
  // Injection du HTML généré dans le conteneur dédié aux questions
  questionContainer.innerHTML = html;
  // Mise à jour de la barre de progression en fonction de la question affichée
  updateProgress();
}

/* --------------------------------------------------------------------- */
/* Fonction selectOption : Gère la sélection d'une option de réponse       */
/* --------------------------------------------------------------------- */
function selectOption(index) {
  // Ajoute l'index de l'option sélectionnée au tableau des réponses
  answers.push(index);
  // Passe à la question suivante en incrémentant l'index
  currentQuestion++;
  // Si l'index de la question est encore dans le tableau des questions
  if (currentQuestion < questions.length) {
    // Affiche la question suivante
    displayQuestion();
  } else {
    // Sinon, toutes les questions ont été répondues, affiche le résultat final
    showResult();
  }
}

/* --------------------------------------------------------------------- */
/* Fonction updateProgress : Met à jour la barre de progression           */
/* --------------------------------------------------------------------- */
function updateProgress() {
  // Calcul du pourcentage de progression : (nombre de questions répondues / nombre total de questions) * 100
  const progress = (currentQuestion / questions.length) * 100;
  // Mise à jour de la largeur de l'élément de la barre de progression en pourcentage
  progressBar.style.width = `${progress}%`;
}

/* --------------------------------------------------------------------- */
/* Fonction showResult : Affiche le résultat final du test                */
/* --------------------------------------------------------------------- */
function showResult() {
  // Forcer la barre de progression à afficher 100%
  progressBar.style.width = "100%";

  // Compte le nombre d'occurrences de chaque réponse sélectionnée
  const counts = answers.reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1; // Incrémente le compteur pour l'option
    return acc;
  }, {});
  // Détermine le maximum de réponses identiques
  const maxCount = Math.max(...Object.values(counts));
  // Identifie l'option qui a été choisie le plus souvent
  const result = Object.keys(counts).find(key => counts[key] === maxCount);

  let resultText = ''; // Texte à afficher en fonction du résultat
  // En fonction de l'option majoritaire, définit le message de résultat
  if (result === '0') {
    resultText = "Vous êtes sur la voie de la transformation intérieure ! Votre résilience et votre ouverture d'esprit vous permettent de grandir continuellement. Continuez à pratiquer les exercices et à cultiver un état d'esprit positif pour consolider vos acquis.";
  } else if (result === '1') {
    resultText = "Vous êtes en transition ! Vous êtes conscient(e) de l'importance du développement personnel, mais vous avez encore des résistances. Identifiez les blocages qui vous freinent et engagez-vous dans une démarche plus proactive pour renforcer votre transformation.";
  } else {
    resultText = "Vous êtes au début de votre cheminement. Il est temps d'explorer en profondeur votre fonctionnement interne. Commencez par des actions simples : pratiquez l'auto-compassion, entourez-vous de ressources inspirantes et osez expérimenter de nouvelles approches. Petit à petit, vous progresserez vers une version plus épanouie de vous-même.";
  }

  // Masque le conteneur des questions pour afficher le résultat
  questionContainer.style.display = 'none';
  // Injecte le texte du résultat dans le conteneur dédié
  resultContainer.innerHTML = `<h2>Résultat</h2><p>${resultText}</p>`;
  // Affiche le conteneur du résultat
  resultContainer.style.display = 'block';
  // Affiche le bouton pour redémarrer le test
  restartButton.style.display = 'block';
}

// Ajoute un écouteur d'événement sur le bouton de redémarrage pour réinitialiser le test
restartButton.addEventListener('click', () => {
  currentQuestion = 0;       // Réinitialise l'index de la question
  answers = [];              // Réinitialise le tableau des réponses
  questionContainer.style.display = 'block'; // Réaffiche le conteneur des questions
  resultContainer.style.display = 'none';      // Masque le conteneur du résultat
  restartButton.style.display = 'none';          // Masque le bouton de redémarrage
  displayQuestion();         // Affiche la première question à nouveau
});

// Affiche la première question dès le chargement du script
displayQuestion();

/* --------------------------------------------------------------------- */
/* Animation du ciel nocturne avec canvas                                */
/* --------------------------------------------------------------------- */

// Récupération de l'élément canvas par son identifiant
const canvas = document.getElementById('night-sky');
// Récupération du contexte 2D du canvas pour dessiner
const ctx = canvas.getContext('2d');

// Définition de la largeur et hauteur du canvas égales à celles de la fenêtre
canvas.width = window.innerWidth;   // Largeur égale à la largeur de la fenêtre
canvas.height = window.innerHeight; // Hauteur égale à la hauteur de la fenêtre

/* -------------------------- */
/* Classe Star : représente une étoile dans le ciel */
/* -------------------------- */
// Classe Star : gère les étoiles avec scintillement et couleurs variées
// Classe Star : représente une étoile dans le ciel
class Star {
  constructor() {
    // Position horizontale aléatoire sur le canvas
    this.x = Math.random() * canvas.width;
    // Position verticale aléatoire sur le canvas
    this.y = Math.random() * canvas.height;
    // Taille de base de l'étoile, assurant une taille minimale visible (entre 1 et 3)
    this.baseSize = Math.random() * 2 + 1;
    // La taille actuelle de l'étoile (initialement égale à la taille de base)
    this.size = this.baseSize;
    // Vitesse de scintillement, ajustée pour un effet subtil (entre 0.005 et 0.035)
    this.twinkleSpeed = Math.random() * 0.05 + 0.01;
    // Angle initial aléatoire pour animer le scintillement
    this.angle = Math.random() * Math.PI * 2;

    // Attribution aléatoire de la couleur :
    this.color = Math.random();
    if (this.color < 0.4) {
      this.color = 'white';  // 70% des étoiles sont blanches
    } else if (this.color < 0.7) {
      this.color = '#a9cfe7';  // 15% des étoiles sont bleutées
    } else {
      this.color = '#9b59b6';  // 15% des étoiles sont violettes-bleues (ex.rgb(79, 12, 236))
    }
  }

  // Méthode pour mettre à jour l'état de l'étoile
  update() {
    // Incrémente l'angle pour animer le scintillement
    this.angle += this.twinkleSpeed;
    // Calcule la nouvelle taille à partir d'une oscillation sinusoïdale, en ajoutant la taille de base
    // pour garantir qu'elle reste suffisamment visible
    this.size = Math.abs(Math.sin(this.angle)) * 1.5 + this.baseSize;
  }

  // Méthode pour dessiner l'étoile sur le canvas
  draw() {
    // Création d'un dégradé radial centré sur l'étoile
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    // La couleur au centre est celle de l'étoile
    gradient.addColorStop(0, this.color);
    // Vers le bord, la couleur se fond dans la transparence
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    // Utilisation du dégradé pour remplir l'étoile
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}



/* ----------------------------- */
/* Classe Cloud : représente un nuage naturel et étiré */
/* ----------------------------- */
class Cloud {
  constructor() {
    // Position horizontale aléatoire sur le canvas
    this.x = Math.random() * canvas.width;
    // Position verticale aléatoire dans le tiers supérieur du canvas
    this.y = Math.random() * canvas.height;
    // Taille aléatoire du nuage entre 50 et 150
    this.size = Math.random() * 100 + 50;
    // Vitesse aléatoire pour le déplacement du nuage
    this.speed = Math.random() * 0.1 + 0.1;
    this.x += this.speed;  // Déplacement horizontal des nuages
if (this.x > canvas.width) {
  this.x = -this.width;  // Recommencer depuis la gauche si le nuage dépasse
}
    // Opacité aléatoire pour donner un effet de transparence, entre 0.5 et 0.8
    this.opacity = Math.random() * 0.4 + 0.2;
  }

  // Méthode pour mettre à jour la position du nuage
  update() {
    // Incrémente la position horizontale en fonction de la vitesse
    this.x += this.speed;
    // Si le nuage sort du canvas à droite, il réapparaît à gauche
    if (this.x > canvas.width) this.x = -this.size;
  }

  // Méthode pour dessiner le nuage sur le canvas
  draw() {
    // Définition de variables locales pour la clarté du code
    let x = this.x, y = this.y, s = this.size;
    // Commence un nouveau chemin pour dessiner la forme du nuage
    ctx.beginPath();
        // Ajout de petites ellipses pour donner plus de volume au nuage
        ctx.ellipse(x + s * 0.5, y + s * 0.5, s * 0.4, s * 0.2, 0, 0, Math.PI * 2);
        ctx.ellipse(x + s * 0.2, y + s * 0.7, s * 0.3, s * 0.15, 0, 0, Math.PI * 2);
        ctx.ellipse(x + s * 0.8, y + s * 0.6, s * 0.35, s * 0.2, 0, 0, Math.PI * 2);
    
    // Point de départ du dessin du nuage
    ctx.moveTo(x + s * 0.1, y + s * 0.6);
    // Dessine la courbe supérieure gauche du nuage
    ctx.bezierCurveTo(
      x - s * 0.1, y + s * 0.3,  // Premier point de contrôle
      x + s * 0.4, y - s * 0.2,  // Deuxième point de contrôle
      x + s * 0.8, y + s * 0.3   // Point final de la courbe
    );
    // Dessine la courbe supérieure droite du nuage
    ctx.bezierCurveTo(
      x + s * 1.2, y - s * 0.1,  // Premier point de contrôle
      x + s * 1.3, y + s * 0.4,  // Deuxième point de contrôle
      x + s * 1.1, y + s * 0.6   // Point final de la courbe
    );
    // Dessine la courbe inférieure droite du nuage
    ctx.bezierCurveTo(
      x + s * 1.4, y + s * 0.9,  // Premier point de contrôle
      x + s * 0.9, y + s * 1.3,  // Deuxième point de contrôle
      x + s * 0.7, y + s * 1.1   // Point final de la courbe
    );
    // Dessine la courbe inférieure gauche du nuage pour refermer la forme
    ctx.bezierCurveTo(
      x + s * 0.4, y + s * 1.4,  // Premier point de contrôle
      x, y + s * 1.1,          // Deuxième point de contrôle
      x + s * 0.1, y + s * 0.6   // Retour au point de départ
    );
    // Ferme le chemin du nuage
    ctx.closePath();

    // Création d'un gradient radial pour donner de la profondeur au nuage
    let gradient = ctx.createRadialGradient(
      x + s * 0.6, y + s * 0.7, s * 0.2,  // Centre du gradient et rayon interne
      x + s * 0.6, y + s * 0.7, s * 0.7   // Même centre et rayon externe
    );
    // Définition de la couleur au centre du gradient avec opacité
    gradient.addColorStop(0, `rgba(200, 200, 220, ${this.opacity})`);
    // Définition de la couleur au bord du gradient, transparent
    gradient.addColorStop(1, `rgba(200, 200, 220, 0)`);
    // Affecte le gradient comme couleur de remplissage
    ctx.fillStyle = gradient;
    // Remplit la forme du nuage avec le gradient
    ctx.fill();
  }
}

/* --------------------------------------------------------------------- */
/* Création d'un tableau de 1500 étoiles en instanciant la classe Star      */
/* --------------------------------------------------------------------- */
const stars = Array(1500).fill().map(() => new Star());

/* --------------------------------------------------------------------- */
/* Création d'un tableau de 20 nuages en instanciant la classe Cloud         */
/* --------------------------------------------------------------------- */
const clouds = Array(20).fill().map(() => new Cloud());

/* --------------------------------------------------------------------- */
/* Fonction animate : boucle d'animation pour dessiner le ciel nocturne    */
/* --------------------------------------------------------------------- */
function animate() {
  // Création d'un dégradé linéaire pour un fond de ciel de nuit très sombre
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#000022');   // Haut : bleu très sombre
  gradient.addColorStop(0.5, '#000011');   // Milieu : nuance intermédiaire
  gradient.addColorStop(1, '#000000');     // Bas : noir complet

  // Remplit le canvas avec le dégradé de fond
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mise à jour et dessin de toutes les étoiles
  stars.forEach(star => {
    star.update();
    star.draw();
  });

  // Mise à jour et dessin des nuages (code existant)
  clouds.forEach(cloud => {
    cloud.update();
    cloud.draw();
  });

  // Boucle d'animation
  requestAnimationFrame(animate);
}

// Démarre l'animation en appelant la fonction animate une première fois
animate();

// Ajoute un écouteur d'événement pour redimensionner le canvas lorsque la fenêtre change de taille
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;   // Redéfinit la largeur du canvas
  canvas.height = window.innerHeight;   // Redéfinit la hauteur du canvas
});


   // Ajuster le volume à un niveau bas
    const audio = document.getElementById('audioPlayer');
    audio.volume = 0.2; // Définit le volume à 20%
  