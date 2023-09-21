
function initGame() {
  const gridContainer = document.getElementById("tableau");
  const restartButton = document.querySelector("button");
  const titleChoose = document.querySelector(".title");
  const titlePlay = document.querySelector(".titlePlay");
  const modal = document.querySelector(".modal");
  const scoreboard = document.querySelector(".scoreboard");
  const closeBtn = document.querySelector(".closeButton");

  let allowCardClicks = true;
  let clicks = 0;
  let firstCard = null;
  let lastClickedCard = null;

  let gameInitialized = false;

  const colors = ["red","blue","green","yellow","purple","orange","pink","brown","black","grey","lightblue","darkblue","#cecece","#3b0728","#c0a441","#4bff4c","#9d4137",];
  let numberOfPairs = 0;
  let cards = [];
  const cardColor = [];
  let pairs = [];

  const bgIcon = [];


  function activateModal() {
    modal.classList.toggle("active");
  }
  function closeModal() {
    modal.classList.remove("active");
  }
  scoreboard.addEventListener("click", activateModal);
  closeBtn.addEventListener("click", closeModal);

  for (let i = 0; i <= 12; i++) {
    const imageURL = `${"/assets/"}perso${i}.png`;
    bgIcon.push(imageURL);
  }

  function cardClickHandler(cardDiv, card) {
    if (clicks < 2 && allowCardClicks) {
      if (cardDiv !== lastClickedCard && !pairs.includes(cardDiv)) {
        let testFirstCard = firstCard;
        clicks++;
        if (clicks === 1) {
          firstCard = cardDiv;
          firstCard.style.backgroundImage = `url('${card.bg}')`;
        } else if (clicks === 2) {
          cardDiv.style.backgroundImage = `url('${card.bg}')`;
          if (firstCard.dataset.cardNumber !== cardDiv.dataset.cardNumber) {
            allowCardClicks = false;
            setTimeout(() => {
              testFirstCard.style.backgroundImage ='url("/assets/CardBackground.png")';
              cardDiv.style.backgroundImage ='url("/assets/CardBackground.png")';
              allowCardClicks = true;
            }, 1000);
          } else {
            pairs.push(cardDiv, firstCard);
          }
          clicks = 0;
          cardDiv.style.backgroundColor === cardDiv.style.backgroundColor;
          firstCard = null;
        }
        lastClickedCard = cardDiv;
      }
    }
    if (pairs.length === numberOfPairs * 2) {
      restartButton.style.display = "block";
      restartGame()
    }
  }

  function updateNumberOfPairs(value) {
    switch (value) {
      case "4":
        numberOfPairs = 4;
        break;
      case "8":
        numberOfPairs = 8;
        gridContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
        gridContainer.style.gridTemplateRows = "repeat(4, 1fr)";
        break;
      case "12":
        numberOfPairs = 12;
        gridContainer.style.gridTemplateColumns = "repeat(8, 1fr)";
        break;
      case "14":
        numberOfPairs = 14;
        gridContainer.style.gridTemplateColumns = "repeat(7, 1fr)";
        break;
      default:
        numberOfPairs = 1;
        break;
    }
  }
  const choosePairsSpans = document.querySelectorAll(".choosePairsNumber");
  const chooseDiv = document.querySelector(".choose");
  choosePairsSpans.forEach((span) => {
    span.addEventListener("click", () => {
      const value = span.getAttribute("data-value");
      updateNumberOfPairs(value);
        chooseDiv.style.display = "none";

      if (!gameInitialized) {
        startGame();
        gameInitialized = true;
      } else {
        clearGrid();
      }
    });
  });

  function createAndAddCards() {
    for (let i = 1; i <= numberOfPairs; i++) {
      const cardNumber = i + 1;
      cards.push({ number: cardNumber, color: colors[i], bg: bgIcon[i] });
      cards.push({ number: cardNumber, color: colors[i], bg: bgIcon[i] });
      cardColor.push(colors[i]);
    }
    shuffleArray(cards);
    cards.forEach((card) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.dataset.cardNumber = card.number;
      cardDiv.style.backgroundImage = 'url("/assets/CardBackground.png")';
      if (numberOfPairs >= 12) {
        cardDiv.style.width = "100px";
        cardDiv.style.height = "130px";
      }
      if (numberOfPairs >= 8){
        cardDiv.style.width = "130px";
        cardDiv.style.height = "170px";
      }
      gridContainer.appendChild(cardDiv);
      cardDiv.addEventListener("click", () => cardClickHandler(cardDiv, card));
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  function clearGrid() {
    const cardElements = document.querySelectorAll(".card");
    
    cardElements.forEach((card) => {
      gridContainer.removeChild(card);
    });
    cards = [];
    numberOfPairs = 0;
    pairs = [];
  }

  function startGame() {
    if (numberOfPairs) {
      titleChoose.style.display = "none";
      titlePlay.style.display = "block";
      createAndAddCards();
    }
  }

 function restartGame(){
  restartButton.addEventListener("click", () => {
    if(gameInitialized){
      clearGrid();
      chooseDiv.style.display = "flex";
      restartButton.style.display = "none";
      gameInitialized = false;
      titlePlay.style.display = "none";
      titleChoose.style.display = "block";
    }
  });
 }
}
initGame();
