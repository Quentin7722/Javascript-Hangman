const secretWord = document.getElementById("secret-word");
const spanKey = document.querySelectorAll(".span-key");
const spanGuess = document.getElementById("span-guess");
const img = document.getElementById("img");
const data = [
  "demain",
  "voler",
  "action",
  "altitude",
  "danser",
  "mouchoir",
  "travail",
  "code",
  "chaise",
  "bureau",
  "singe",
  "rat",
  "coq",
  "voiture",
  "montagne",
  "salle",
  "souris",
  "trou",
  "malin",
  "arbre",
];
const word = data[Math.floor(Math.random() * data.length)];
const wordArray = word.split("");
let indexes = [];
let pressedKey = "";
let guess = 0;

function generateWord() {
  wordArray.map((el) => {
    var newDiv = document.createElement("div");
    secretWord.appendChild(newDiv);
    var newSpan = document.createElement("span");
    newSpan.textContent = "?";
    newDiv.appendChild(newSpan);
    newDiv.className = "div div-secret";
    newSpan.className = "span span-secret";
    console.log(word);
  });
}

function getAllIndexes(arr, val) {
  indexes = [];
  for (i = 0; i < arr.length; i++) if (arr[i] === val) indexes.push(i);
}

function newGame() {
  var newButton = document.createElement("button");
  document.body.appendChild(newButton);
  newButton.innerHTML = "réessayer";
  newButton.addEventListener("click", () => {
    location.reload();
  });
}

function checkLettersFound(spanSecret) {
  let displayedWord = "";
  spanSecret.forEach((el) => {
    displayedWord = displayedWord + el.innerHTML;
  });
  if (!displayedWord.includes("?") == true) {
    spanGuess.textContent = `Gagné !`;
    spanKey.forEach((el) => el.removeEventListener("click", choose));
    newGame();
  }
}

function choose(e) {
  el = e.currentTarget.myParam;
  const spanSecret = document.querySelectorAll(".span-secret");
  pressedKey = el.innerHTML;
  if (wordArray.includes(pressedKey) == true) {
    el.style.backgroundColor = "#37f337";
    getAllIndexes(wordArray, pressedKey);
    indexes.forEach((el) => {
      spanSecret[el].innerHTML = pressedKey;
    });
    checkLettersFound(spanSecret);
  } else {
    el.style.backgroundColor = "red";
    guess++;
    img.setAttribute("src", `./hangman-${guess}.png`);

    spanGuess.textContent = `il vous reste ${6 - guess} ${
      guess > 4 ? "vie" : "vies"
    }`;
    el.removeEventListener("click", choose);
    if (guess == 6) {
      spanGuess.textContent = `Perdu !`;
      spanKey.forEach((el) => el.removeEventListener("click", choose));
      newGame();
    }
  }
}

spanKey.forEach((el) => {
  el.addEventListener("click", choose);
  el.myParam = el;
});

generateWord();
