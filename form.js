document.addEventListener('DOMContentLoaded', () => {

    /* ———————————————————————————
       1. GLOBAL : CHATBOT
    ———————————————————————————— */
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const iconChat = document.getElementById('icon-chat');
    const iconClose = document.getElementById('icon-close');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('open');
            if (chatWindow.classList.contains('open')) {
                iconChat.style.display = 'none';
                iconClose.style.display = 'block';
            } else {
                iconChat.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    }

    /* ———————————————————————————
       2. PAGE CONTACT : CLAVIER VIRTUEL
    ———————————————————————————— */
    const nameInput = document.getElementById('name');
    const virtualKeyboard = document.getElementById('virtual-keyboard');
    const keyboardGrid = document.getElementById('keyboard-grid');

    if (nameInput && virtualKeyboard && keyboardGrid) {
        const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

        function shuffle(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }

        function generateKeyboard() {
            keyboardGrid.innerHTML = '';
            const shuffledChars = shuffle(allChars);

            shuffledChars.forEach(char => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'key-btn';
                btn.textContent = char;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    nameInput.value += char;
                    generateKeyboard();
                });
                keyboardGrid.appendChild(btn);
            });

            const spaceBtn = document.createElement('button');
            spaceBtn.type = 'button';
            spaceBtn.className = 'key-btn space';
            spaceBtn.textContent = 'ESPACE';
            spaceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nameInput.value += ' ';
                generateKeyboard();
            });
            keyboardGrid.appendChild(spaceBtn);

            const backspaceBtn = document.createElement('button');
            backspaceBtn.type = 'button';
            backspaceBtn.className = 'key-btn backspace';
            backspaceBtn.textContent = '⌫ EFFACER';
            backspaceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                nameInput.value = nameInput.value.slice(0, -1);
                generateKeyboard();
            });
            keyboardGrid.appendChild(backspaceBtn);
        }

        nameInput.addEventListener('click', () => {
            virtualKeyboard.style.display = 'block';
            generateKeyboard();
        });
    }

    /* ———————————————————————————
       3. PAGE CONTACT : SELECTEUR D'AGE (CHAOS)
    ———————————————————————————— */
    const selecteur = document.getElementById('selecteurChaos');
    const affichage = document.getElementById('valeurAge');
    const vraiInput = document.getElementById('age');

    if (selecteur && affichage && vraiInput) {
        let lesAges = Array.from({ length: 100 }, (_, i) => i + 1);
        lesAges.sort(() => Math.random() - 0.5);

        selecteur.addEventListener('input', function () {
            const agePioche = lesAges[this.value];
            affichage.textContent = agePioche;
            vraiInput.value = agePioche;
        });

        affichage.textContent = lesAges[0];
        vraiInput.value = lesAges[0];
    }

    /* ———————————————————————————
       4. PAGE RESULTATS : MODE RETRO
    ———————————————————————————— */
    const reponseContainer = document.getElementById('contenu-reponse');

    if (reponseContainer) {
        const params = new URLSearchParams(window.location.search);
        const nom = params.get('name');
        const age = parseInt(params.get('age'));
        const message = params.get('message');

        if (age >= 60) {
            document.body.classList.add('retro');
            const retroMsg = document.createElement('div');
            retroMsg.id = 'retro-message';
            retroMsg.innerHTML = '★ MODE RETRO ACTIVÉ ★<br>BIENVENUE DANS LES ANNÉES 80 !';
            document.body.appendChild(retroMsg);

            setTimeout(() => { retroMsg.classList.add('show'); }, 100);
            setTimeout(() => { retroMsg.classList.remove('show'); }, 3100);

            const pixelGrid = document.createElement('div');
            pixelGrid.id = 'pixel-grid';
            document.body.appendChild(pixelGrid);
        }

        let commentaireAge = "";
        if (!age) commentaireAge = "Âge inconnu ?";
        else if (age < 12) commentaireAge = "Trop jeune !";
        else if (age < 18) commentaireAge = "Passe ton bac d'abord !";
        else if (age >= 18 && age < 60) commentaireAge = "La force de l'âge.";
        else commentaireAge = "Respect l'ancien.";

        if (nom) {
            reponseContainer.innerHTML = `
                <p class="text-white" style="font-size:1.2rem;">Bonjour <strong>${nom}</strong>,</p>
                <p style="color:var(--jaune); font-weight:bold;">${age} ans — ${commentaireAge}</p>
                <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.3); margin: 20px 0;">
                <p class="text-white" style="font-style:italic;">"${message}"</p>
            `;
        } else {
            reponseContainer.innerHTML = `<p class="text-white">Aucune donnée reçue.</p>`;
        }
    }

    /* ———————————————————————————
       6. PAGE SIMULATION : JEU
    ———————————————————————————— */
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
        let budget = 10000;
        let planete = 50;
        let currentStep = 1;

        function updateDisplay() {
            document.getElementById('score-budget').innerText = budget + ' €';
            let budgetPercent = Math.max(0, Math.min(100, (budget / 15000) * 100));
            document.getElementById('gauge-budget').style.width = budgetPercent + '%';

            document.getElementById('score-planet').innerText = planete + ' %';
            document.getElementById('gauge-planet').style.width = planete + '%';

            const gaugeP = document.getElementById('gauge-planet');
            if (planete < 30) gaugeP.style.background = 'red';
            else if (planete > 70) gaugeP.style.background = '#4caf50';
            else gaugeP.style.background = '#f566ff';
        }

        window.makeChoice = function (action) {
            if (action === 'buy') { budget -= 15000; planete -= 30; }
            else if (action === 'linux') { planete += 20; }
            else if (action === 'ssd') { budget -= 500; planete += 10; }
            else if (action === 'trash') { budget -= 5000; planete -= 40; }
            else if (action === 'license') { budget -= 2000; }
            else if (action === 'libre') { planete += 15; }

            if (planete > 100) planete = 100;
            if (planete < 0) planete = 0;

            updateDisplay();
            nextStep();
        };

        function nextStep() {
            const currentCard = document.getElementById('step-' + currentStep);
            if (currentCard) currentCard.classList.remove('active');

            currentStep++;

            const nextCard = document.getElementById('step-' + currentStep);
            if (nextCard) {
                setTimeout(() => nextCard.classList.add('active'), 300);
            } else {
                showEndScreen();
            }
        }

        function showEndScreen() {
            setTimeout(() => {
                const endScreen = document.getElementById('end-screen');
                endScreen.style.display = 'block';
                endScreen.classList.add('active');

                const title = document.getElementById('final-title');
                const msg = document.getElementById('final-message');

                if (planete >= 70 && budget > 0) {
                    title.style.color = "#4caf50";
                    title.innerText = "VICTOIRE N.I.R.D. !";
                    msg.innerHTML = "Bravo ! Vous avez sauvé le budget de l'école ET la planète.";
                } else if (budget <= 0) {
                    title.style.color = "#ffcccb";
                    title.innerText = "FAILLITE...";
                    msg.innerHTML = "L'école n'a plus d'argent pour le chauffage cet hiver.";
                } else {
                    title.style.color = "#F9DE2C";
                    title.innerText = "BILAN MITIGÉ";
                    msg.innerHTML = "Vous avez survécu, mais on peut faire mieux pour l'écologie.";
                }
            }, 300);
        }
        updateDisplay();
    }
});