const gridContainer = document.getElementById('grid-container');

colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black" ];
numberOfPairs= 9;
cards=[];

// Boucle for qui va créer les cartes
for (let i = 1; i <= numberOfPairs; i++) {
    // On crée un objet card avec un numéro et une couleur
    const cardNumber = i + 1;
    // On ajoute deux fois la même carte dans le tableau cards
    cards.push({number : cardNumber, color: colors[i] });
    cards.push({number : cardNumber, color: colors[i] });
}

// Mélangez les cartes de manière aléatoire
shuffleArray(cards);


// Ajoutez les cartes au jeu

cards.forEach(card => {
    // Ajout d'une div avec la classe card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    // Ajout d'un attribut data-card-number pour qu'on puisse les identifier et les comparer
    cardDiv.dataset.cardNumber = card.number;
    // Mettre le numéro de la carte dans la div (A VIRER)
    cardDiv.textContent = card.number;
    //Mettre la couleur de la carte en background 
    cardDiv.style.backgroundColor = card.color; 
    // Ajout de la div au grid-container
    gridContainer.appendChild(cardDiv);
});

// Fonction pour mélanger le tableau
function shuffleArray(array) {
    // Tant que i est plus grand que 0, on décrémente i
    for (let i = array.length - 1; i > 0; i--) {
        // On génère un nombre aléatoire entre 0 et i
        const j = Math.floor(Math.random() * (i + 1));
        // On échange array[i] avec array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
}





function ajouterPseudo() {
    let pseudo = document.getElementById("pseudoInput");
    document.write();
}