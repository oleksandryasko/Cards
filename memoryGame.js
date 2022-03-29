import Card from './Card.js';

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.style.display = "none";

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let positionValues = [];
let rows
let cols;

let cardArr = [];
let backImgsArr = [];
let flippedCards = [];

let shuffledImgs = shuffle(backImgsArr);

let clickedCard = 0;
let endScore = 0;
let revealedCards = 0;

let backImg = document.getElementById("one");
let backImgTwo = document.getElementById("two");
let backImgThree = document.getElementById("three");
let backImgFour = document.getElementById("four");
let backImgFive = document.getElementById("five");
let backImgSix = document.getElementById("six");
let backImgSeven = document.getElementById("seven");
let backImgEight = document.getElementById("eight");
let backImgNine = document.getElementById("nine");
let backImgTen = document.getElementById("ten");

let selectSection = document.getElementById("optionGame")

let startGame = document.getElementById("newGame");
let selectArea = document.getElementById("section");

let idAnimation;
let isGameEnd = false;

// choose level of the game
startGame.addEventListener("click", () => {
  let getValue = selectSection.options[selectSection.selectedIndex].value;

  if (getValue) {
    canvas.style.display = "block";
    selectArea.style.display = "none";

    if (getValue == "easy") {
      rows = 2
      cols = 3;
      backImgsArr.push(backImg, backImgTwo, backImg, backImgTwo, backImgThree, backImgThree);
      shuffledImgs = shuffle(backImgsArr);

      initGame();
    }
    if (getValue == "medium") {
      rows = 3
      cols = 4;
      backImgsArr.push(backImg, backImgTwo, backImg, backImgTwo, backImgThree, backImgThree, backImgFour, backImgFour, backImgFive, backImgFive, backImgSix, backImgSix);
      shuffledImgs = shuffle(backImgsArr);

      initGame();
    }
    if (getValue == "hard") {
      rows = 4
      cols = 5;
      backImgsArr.push(backImg, backImgTwo, backImg, backImgTwo, backImgThree, backImgThree, backImgFour, backImgFour, backImgFive, backImgFive, backImgSix, backImgSix, backImgSeven, backImgSeven, backImgEight, backImgEight, backImgNine, backImgNine, backImgTen, backImgTen);
      shuffledImgs = shuffle(backImgsArr);

      initGame();
    }
  }
});

//  main function
function initGame() {

  let background = ctx;
  background.rect(0, 0, canvas.width, canvas.height);
  background.fillStyle = '#42622D';
  background.fill();

  initCards();
  run()

}

function initCards() {

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      positionValues.push({
        x: 280 * col + 60,
        y: 170 * row + 40,
      })
    }
  }

  for (let block of positionValues) {
    cardArr.push(new Card(block.x, block.y, shuffledImgs.pop(), 100));
  }
}

function drawCards() {

  for (let i = 0; i < cardArr.length; i++) {
    cardArr[i].drawImgs(ctx)
  }

}

function run() {

  drawCards()
  update()
  if (!isGameEnd){
    idAnimation = requestAnimationFrame(run);

  }else {
    cancelAnimationFrame(idAnimation)

  }

}

// return shuffled array with the back imgs
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// click on card
let myClick = (() => {
  let handler = function (ev) {

    const rect = canvas.getBoundingClientRect();
    const mouseX = ev.clientX - rect.left;
    const mouseY = ev.clientY - rect.top;

    for (let i = 0; i < cardArr.length; i++) {
      if (clickedCard <= 1 && cardArr[i].is_selected(mouseX, mouseY) && cardArr[i].revealed !== true) {

        cardArr[i].revealed = true;
        cardArr[i].scaleX = 100;
        flippedCards.push(i);
        clickedCard++;
      }
    }
  };
  return handler;
})(0);

// game logic
function update() {

  let first = flippedCards[0];
  let second = flippedCards[1];
  if (flippedCards.length === 2) {

    if (cardArr[first].backImg === cardArr[second].backImg) {
      flippedCards = [];
      clickedCard = 0;

      setTimeout(function (){
        revealedCards += 2;

      }, 1000)
    }
    if (cardArr[first].backImg !== cardArr[second].backImg) {
      setTimeout(function () {
        cardArr[first].revealed = false;
        cardArr[second].revealed = false;
        cardArr[first].wrongCombination = true;
        cardArr[second].wrongCombination = true;
        clickedCard = 0;
        endScore++;

        
      }, 1500);
    }
    flippedCards = [];
  }else {
    if (revealedCards == cardArr.length) {
      alert('Вы совершили: ' + endScore + ' ошибок чтобы завершить игру');
      isGameEnd = true;
      
    }
  }
}

canvas.addEventListener('click', myClick);