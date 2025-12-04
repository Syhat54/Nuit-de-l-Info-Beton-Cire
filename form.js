document.addEventListener('DOMContentLoaded', () => {


    const selecteur = document.getElementById('selecteurChaos');
    const affichage = document.getElementById('valeurAge');
    const vraiInput = document.getElementById('age');

    if (selecteur && affichage && vraiInput) {
        let lesAges = Array.from({length: 100}, (_, i) => i + 1);
        lesAges.sort(() => Math.random() - 0.5);

        selecteur.addEventListener('input', function() {
            const agePioche = lesAges[this.value];
            affichage.textContent = agePioche;
            vraiInput.value = agePioche;
        });

        const premierAge = lesAges[selecteur.value];
        affichage.textContent = premierAge;
        vraiInput.value = premierAge;
    }


    const reponseContainer = document.getElementById('contenu-reponse');

    if (reponseContainer) {
        const params = new URLSearchParams(window.location.search);
        
        const nom = params.get('name');
        const age = parseInt(params.get('age'));
        const message = params.get('message');

        let commentaireAge = "";
        if (!age) {
            commentaireAge = "Âge inconnu (tu as cassé le sélecteur ?)";
        } else if (age < 12) {
            commentaireAge = "Tu es un peu jeune pour manger du béton ciré, non ?";
        } else if (age >= 12 && age < 18) {
            commentaireAge = "Passe ton bac d'abord !";
        } else if (age >= 18 && age < 60) {
            commentaireAge = "La vieillesse arrive fais gaffe !";
        } else if (age >= 60 && age < 100) {
            commentaireAge = "T'es un anciennnnn, s'cuse noussss...";
        } else {
            commentaireAge = "Tu es immortel ?";
        }

        if(nom) {
            reponseContainer.innerHTML = `
                <p style="color:white; font-size:1.2rem; margin-bottom:10px;">Bonjour <strong>${nom}</strong>,</p>
                <p style="color:#F9DE2C; font-weight:bold;">${age} ans — ${commentaireAge}</p>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.3); margin: 20px 0;">
                <p style="color:white; font-style:italic;">"${message}"</p>
            `;
        } else {
            reponseContainer.innerHTML = `<p style="color:white;">Aucune donnée reçue.</p>`;
        }
    }
});

function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const iconChat = document.getElementById('icon-chat');
    const iconClose = document.getElementById('icon-close');
    
    chatWindow.classList.toggle('open');
    
    if (chatWindow.classList.contains('open')) {
        iconChat.style.display = 'none';
        iconClose.style.display = 'block';
    } else {
        iconChat.style.display = 'block';
        iconClose.style.display = 'none';
    }
}