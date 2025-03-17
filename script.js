let number = 0; // Compteur de tours
let cases = document.querySelectorAll(".case"); // Sélection de toutes les cases du morpion
let title = document.querySelector("h2");

let game = [
    ["","",""],
    ["","",""],
    ["","",""]];

let x = 1;
for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        game[i][j] = document.getElementById(x);
        x++;
    }
}
    
let clicked = function(event) {
    let caseElement = event.target;
    // Si la case n'a pas encore été jouée
    if (!caseElement.classList.contains("red") && !caseElement.classList.contains("green")) {
        if (number % 2 === 0) {
            caseElement.classList.add("green"); // Joueur 1 joue
            title.innerText = "Au tour du joueur 2";
        } else {
            caseElement.classList.add("red"); // Joueur 2 joue
            title.innerText = "Au tour du joueur 1";
        }
        number++; // Tour suivant
        setTimeout(winner(), 0);
    } else {
        alert("Case déjà sélectionnée !");
    }
};

// Fonction pour arrêter le jeu en supprimant les écouteurs d'événements
function stopGame() {
    cases.forEach(function(caseElement) {
        caseElement.removeEventListener("click", clicked);
    });
}

// appel de la fonciton dès le lanvcement de la page afin d'initialisé le morpion
cases.forEach(function(caseElement) {
    caseElement.addEventListener("click", clicked);
});


function winner() {
    // Fonction utilitaire pour vérifier si 3 cases ont la même couleur
    function checkCase(a, b, c, color) {
        return a.classList.contains(color) &&
               b.classList.contains(color) &&
               c.classList.contains(color);
    }

    const colors = ["green", "red"];
    for (let color of colors) {
        // Vérification lignes, colonnes
        for (let i = 0; i < 3; i++) {
            if (checkCase(game[i][0], game[i][1], game[i][2], color) ||
                checkCase(game[0][i], game[1][i], game[2][i], color)) {
                if(color === "green"){
                    title.innerText = "Victoire du joueur 1 !";
                } else {
                    title.innerText = "Victoire du joueur 2 !";
                }
                return stopGame();
            }
        }
        // Vérification diagonales
        if (checkCase(game[0][0], game[1][1], game[2][2], color) ||
            checkCase(game[0][2], game[1][1], game[2][0], color)) {
            if(color === "green"){
                title.innerText = "Victoire du joueur 1 !";
            } else {
                title.innerText = "Victoire du joueur 2 !";
            }
            return stopGame();
        }
    }

    // Vérification de l'égalité
    let casePleine = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (game[i][j].classList.contains("green") || game[i][j].classList.contains("red")) {
                casePleine++;
            }
        }
    }

    if (casePleine === 9) {
        title.innerText = "Fin du jeu : Match nul !";
        stopGame(); // Arrête le jeu
    } 
}

let reset = document.querySelector("button");

reset.addEventListener("click", function() {
    let cases = document.querySelectorAll(".case");

    // Supprime les classes 'green' et 'red' de chaque case
    cases.forEach(function(caseElement) {
        caseElement.classList.remove("green");
        caseElement.classList.remove("red");
    });
    
    number = 0;
    title.innerText = "Nouvelle Partie";
    cases.forEach(function(caseElement) {
        caseElement.addEventListener("click", clicked);
    })
});






// Principe de base du morpion : 
// objectif remplir une ligne, une colonne ou une diagonale avec ses symboles (croix ou rond) ici carré rouge ou vert.
// Chaque joueur, à tour de rôle, place son symbole sur une case vide d'une grille 3x3.
// Le premier joueur à aligner trois de ses symboles sur l'une des 8 combinaisons possibles (3 lignes, 3 colonnes, 2 diagonales) gagne.
// Si toutes les cases sont remplies sans gagnant, le jeu est déclaré nul.

// Création de la grille : 
// Le jeu commence avec une grille de 3 lignes et 3 colonnes, soit 9 cases au total. (code html et css)
// Chaque case représente un espace vide où un joueur peut cliquer pour jouer. (creation du style case )

// Attribution des couleurs aux joueurs : 
// Deux joueurs participent au jeu :
// - Le joueur 1 utilise la couleur verte. (creation du style vert)
// - Le joueur 2 utilise la couleur rouge. (creation du style rouge)
// Le tour du joueur change à chaque clic

// Suivi du tour actuel : 
// Un compteur, initialisé à zéro, permet de suivre quel joueur doit jouer. Ce compteur s'incrémente de 1 après chaque clic :
// - Si le compteur est pair, c’est au tour du joueur 1.
// - Si le compteur est impair, c’est au tour du joueur 2.

// Vérification des cases cliquées : 
// À chaque clic sur une case, le jeu vérifie si cette case a déjà occupée (c'est-à-dire si elle est déjà rouge ou verte).  
// - Si la case est déjà remplie, une alerte s'affiche pour prévenir que la case a déjà été jouée.
// - Si la case est vide, la couleur du joueur actuel est appliquée à la case.

// Vérification de la victoire : 
// Après chaque coup, le jeu vérifie si un joueur a gagné. Il y a 8 combinaisons gagnantes possibles :
// - 3 lignes,
// - 3 colonnes,
// - 2 diagonales.  
// Si une de ces combinaisons est remplie par la couleur d’un joueur, ce joueur est déclaré vainqueur et le jeu s’arrête.

// Vérification de l'égalité : 
// Si toutes les cases sont remplies (sans qu'aucun joueur n'ait gagné), le jeu annonce un match nul.
// Réinitialisation du jeu avec un bouton