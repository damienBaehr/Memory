const gridContainer = document.getElementById('tableau');
const card = document.getElementsByClassName('card');
const restart = document.querySelector('button')



//Tableau qui va stocker les paires


let clicks = 0;
let firstCard = null;
let lastClickedCard = null;

colors = ["red", "blue", "green", "yellow", "purple", "orange", "pink", "brown", "black","grey","lightblue","darkblue","#cecece", "#3b0728", "#c0a441", "#4bff4c","#9d4137"];

// Faire un switch case : pour numberOfPairs = 4, 8, 12, 16, en modifiant la valeur de numberOfPairs

numberOfPairs= 4;
cards=[];
cardColor=[];
pairs=[];

// Boucle for qui va créer les cartes
for (let i = 1; i <= numberOfPairs; i++) {
    // On crée un objet card avec un numéro et une couleur
    const cardNumber = i + 1;
    // On ajoute deux fois la même carte dans le tableau cards
    cards.push({number : cardNumber, color: colors[i]  });
    cards.push({number : cardNumber, color: colors[i]  });

    cardColor.push(colors[i]);
}

// Mélangez les cartes de manière aléatoire
shuffleArray(cards);
cards.forEach(card => {
    // Ajout d'une div avec la classe card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    // Ajout d'un attribut data-card-number pour qu'on puisse les identifier et les comparer
    cardDiv.dataset.cardNumber = card.number;
    // Mettre le numéro de la carte dans la div (A VIRER)
    cardDiv.textContent = card.number;
    //Mettre la couleur de la carte en background 
    cardDiv.style.backgroundColor = "white";
    // Si le nombre de paires est supérieur ou égal à 12, on change la taille des cartes
    if (numberOfPairs >= 12) {
        cardDiv.style.width = '140px'; // Par exemple, définissez la largeur à 50px
        cardDiv.style.height = '170px'; // Par exemple, définissez la largeur à 50px
    }
    // Ajout de la div au grid-container
    gridContainer.appendChild(cardDiv);
    // Ajoutez un gestionnaire d'événements de clic à chaque carte
    cardDiv.addEventListener('click', () => {
        
        // Vérifiez si le nombre de clics est inférieur à 2
        if (clicks < 2) {

            if (cardDiv !== lastClickedCard && !pairs.includes(cardDiv)){
            let testFirstCard = firstCard;
            // Affichez la carte en inversant ses couleurs
            // Incrémentez le nombre de clics
            clicks++;
            console.log('clicks', clicks);
            // Si c'est le premier clic, enregistrez la carte
            if (clicks === 1) {
                firstCard = cardDiv;
                firstCard.style.backgroundColor = card.color;
            } else if (clicks === 2) {
                // Si c'est le deuxième clic, comparez les cartes
                cardDiv.style.backgroundColor = card.color;
                if (firstCard.dataset.cardNumber !== cardDiv.dataset.cardNumber) {
                    setTimeout(() => {
                        testFirstCard.style.backgroundColor = 'white';
                        cardDiv.style.backgroundColor = 'white';
                    }, 1000);
                } else {
                    pairs.push(cardDiv, firstCard);  

                }
                // Réinitialisez le compteur de clics et la carte enregistrée
                clicks = 0;
                cardDiv.style.backgroundColor === cardDiv.style.backgroundColor;
                firstCard = null;
                }
                lastClickedCard = cardDiv;
            }
            
        }

        if(pairs.length === numberOfPairs*2){
            restart.style.display = "block";
        }
    });
});

restart.addEventListener('click', () => { 
    location.reload();
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
    let click = getElementById("event");
    let pseudo = document.getElementById("pseudoInput");
    let submit = document.addEventListener("click", click);

    if (pseudo != null){
    console.log("- " + pseudo);
    }   else   {
    echo("Youve entered an invalid name");
    }
}