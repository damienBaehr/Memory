const gridContainer = document.getElementById('grid-container');

colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black" ];
numberOfPairs= 9;
cards=[];

for (let i = 1; i <= numberOfPairs; i++) {
    const cardNumber = i + 1;
    cards.push({number : cardNumber, color: colors[i] });
    cards.push({number : cardNumber, color: colors[i] });
}

// Mélangez les cartes de manière aléatoire
shuffleArray(cards);

// Ajoutez les cartes au jeu

cards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.dataset.cardNumber = card.number;
    cardDiv.textContent = card.number;
    cardDiv.style.backgroundColor = card.color; 
    gridContainer.appendChild(cardDiv);
});

// Fonction pour mélanger le tableau
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}





function ajouterPseudo() {
    let pseudo = document.getElementById("pseudoInput");
    document.write();
}