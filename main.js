// Funzione per aprire la slidebar come popup
function openSlidebar() {
    const slidebar = document.getElementById('rules-slidebar');
    slidebar.style.display = 'block'; // Rende visibile la slidebar
    setTimeout(() => {
        slidebar.classList.add('popup-active'); // Aggiunge la classe per l'animazione di apparizione
    }, 10);
}

// Funzione per chiudere la slidebar
function closeSlidebar() {
    const slidebar = document.getElementById('rules-slidebar');
    slidebar.classList.remove('popup-active'); // Rimuove l'animazione di apparizione
    setTimeout(() => {
        slidebar.style.display = 'none'; // Nasconde la slidebar dopo l'animazione
    }, 300); // Attende la fine dell'animazione (tempo di transizione)
}


game = function() {
    playerPT = 0;
    systemPT = 0;

    startGame = function() {
        startBTN = document.querySelector('.start button');
        startSCN = document.querySelector('.start');
        vs = document.querySelector('.vs')  
        
        startBTN.addEventListener('click', function() {
            startSCN.classList.add('gameout');
            vs.classList.add('gamein');
            vs.classList.remove('gameout');
        });
    };

    playvs = function() {
        const check = document.querySelectorAll('.check button');
        launch = document.querySelectorAll('.launch img');
        const playerHand = document.querySelector('.player_game');
        const systemHand = document.querySelector('.system_game');

        const systemcheck = ['sasso', 'carta', 'forbice'];

        check.forEach((opt1) => {
            opt1.addEventListener('click', function() {
                const systemNumber = Math.floor(Math.random() * 3);
                const systemChoice = systemcheck[systemNumber];
                const playerChoice = this.textContent.toLowerCase();

            setTimeout(() => {
                compareLaunch(playerChoice, systemChoice);

                playerHand.src = `./img/${playerChoice}.png`;
                systemHand.src = `./img/${systemChoice}.png`;
            }, 2000);
            });
        });
    };

    compareLaunch = function(playerChoice, systemChoice) {
        let ps_win = document.querySelector('.ps_win');
    
        if (playerChoice === systemChoice) {
            ps_win.textContent = 'Pareggio!';
        } else {
            let resultMessage;
            if (
                (playerChoice === 'sasso' && systemChoice === 'forbice') ||
                (playerChoice === 'carta' && systemChoice === 'sasso') ||
                (playerChoice === 'forbice' && systemChoice === 'carta')
            ) {
                resultMessage = 'Hai vinto!';
                playerPT++; // Correzione del nome della variabile
            } else {
                resultMessage = 'Hai Perso!';
                systemPT++;
            }
    
            ps_win.textContent = resultMessage;
            endGame();
            updatescore();
        }
    };

    updatescore = function() {
        const playerScore = document.querySelector('.player_pt p');
        const systemScore = document.querySelector('.system_pt p');

        playerScore.textContent = playerPT;
        systemScore.textContent = systemPT;
    };

    restartGame = () => {
        restart = document.querySelector('.ps_winned button');
        restart.addEventListener('click', function() {
            window.location.reload();
        });
    };

    endGame = () => {
        ps_winend = document.querySelector('.ps_winned');
        vs = document.querySelector('.vs');
        ps_win_stop = document.querySelector('.ps_win_stop');

        if(playerPT === 5) {
            vs.classList.remove('gamein');
            vs.classList.add('gameout');
            setTimeout(() => {
                ps_winend.classList.add('gamein');
                ps_winend.classList.remove('gameout');
                ps_win_stop.textContent = 'Hai vinto!';
            }, 2000);
        }else if(systemPT === 5) {
            vs.classList.remove('gamein');
            vs.classList.add('gameout');
            setTimeout(() => {
                ps_winend.classList.add('gamein');
                ps_winend.classList.remove('gameout');
                ps_win_stop.textContent = 'Hai perso!';
            }, 2000);
        }
    }
    restartGame();

    startGame();
    playvs();
};

game();