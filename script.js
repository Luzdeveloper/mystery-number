let secretNumber;
let maxNumber = 100;
let maxAttempts = 1;
let attempts = 0;
let guessLog = [];

// mise en place des difficulté 

function setDifficulty() {
    const difficulty = document.getElementById('difficulty').value;
    maxNumber = parseInt(difficulty);
    document.getElementById('nombre-max').textContent = maxNumber;
    document.getElementById('guess').max = maxNumber;

    if (maxNumber === 10) {
        maxAttempts = 2;
    } else if (maxNumber === 50) {
        maxAttempts = 1;
    } else {
        maxAttempts = 0;
    }

    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    guessLog = [];
    document.getElementById('message').textContent = '';
    document.getElementById('tentative-log').querySelector('tbody').innerHTML = '';
    document.getElementById('guess').disabled = false;
    document.querySelectorAll('button')[0].disabled = false;
    document.querySelectorAll('button')[1].disabled = false;
}

function validGuess() {
    const guessInput = document.getElementById('guess').value;
    const guess = parseInt(guessInput);
    const message = document.getElementById('message');
    attempts++;

    // Vérifie si la devinette est un nombre valide
    if (isNaN(guess) || guessInput.trim() === '' || guess < 1 || guess > maxNumber) {
        message.textContent = `Veuillez entrer un nombre valide entre 1 et ${maxNumber}.`;
        message.className = 'message error';
        return; // Arrête l'exécution de la fonction si la reponse est invalide
    }

    guessLog.push(guess);




    // Vérifie si le nombre d'essais a dépassé le maximum autorisé et donne le numero mystere
    if (attempts > maxAttempts) {
        message.textContent = `Game over Ganondorf a gagné. Le nombre mystère était ${secretNumber}.`;
        message.className = 'message error fade-in';
        document.getElementById('guess').disabled = true;
        document.querySelectorAll('button')[0].disabled = true;
        return;
    }




    // Ajoute un délai avant d'afficher le résultat
    setTimeout(() => {
        if (guess === secretNumber) {
            message.textContent = `Félicitations ! Vous avez sauver la princesse zelda  en ${attempts} tentatives.`;
            message.className = 'message success fade-in';
            document.getElementById('guess').disabled = true;
            document.querySelectorAll('button')[0].disabled = true;
        } else if (guess < secretNumber) {
            message.textContent = 'Trop bas ! Essayez encore.';
            message.className = 'message error fade-in';
        } else {
            message.textContent = 'Trop haut ! Essayez encore.';
            message.className = 'message error fade-in';
        }

        updateAttemptsLog(); // Met à jour le tableau des tentatives
    }, .50); // Délai de 0.5 seconde avant l'affichage du résultat
}




// fonction permettant la mise a jour des tentatives du joueur
function updateAttemptsLog() {
    const attemptsLog = document.getElementById('tentative-log').querySelector('tbody');
    attemptsLog.innerHTML = '';
    guessLog.forEach((guess, index) => {
        const row = document.createElement('tr');
        const attemptCell = document.createElement('td');
        const guessCell = document.createElement('td');
        attemptCell.textContent = `Tentative ${index + 1}`;
        guessCell.textContent = guess;
        row.appendChild(attemptCell);
        row.appendChild(guessCell);
        attemptsLog.appendChild(row);
    });
}




//fonction pour relancer le jeu 
function restartGame() {
    secretNumber = Math.floor(Math.random() * maxNumber) + 1;
    attempts = 0;
    guessLog = [];
    document.getElementById('guess').value = '';
    document.getElementById('message').textContent = '';
    document.getElementById('message').className = 'message';
    document.getElementById('tentative-log').querySelector('tbody').innerHTML = '';
    document.getElementById('guess').disabled = false;
    document.querySelectorAll('button')[0].disabled = false;
}







