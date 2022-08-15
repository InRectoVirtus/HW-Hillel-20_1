// Main div
const body = document.querySelector('body');
const mainBlock = document.createElement('div');
const parentDiv = document.createElement('div');
mainBlock.appendChild(parentDiv);

// First div
const firstDivButton = document.createElement('div');
const nameFirstDiv = document.createElement('p');
const counterForFirstButton = document.createElement('p');
nameFirstDiv.innerHTML = 'Перший';
parentDiv.appendChild(firstDivButton);
firstDivButton.appendChild(nameFirstDiv);
firstDivButton.appendChild(counterForFirstButton);

// Second div
const secondDivButton = document.createElement('div');
const nameSecondDiv = document.createElement('p');
const counterForSecondButton = document.createElement('p');
nameSecondDiv.innerHTML = 'Другий';
parentDiv.appendChild(secondDivButton);
secondDivButton.appendChild(nameSecondDiv);
secondDivButton.appendChild(counterForSecondButton);

// Click button
const divButton = document.createElement('div');
const firstButton = document.createElement('button');
const secondButton = document.createElement('button');
const undoButton = document.createElement('button');
const setButton = document.createElement('button');

firstButton.dataset.button = 'firstBClick';
secondButton.dataset.button = 'secondBClick';
undoButton.dataset.button = 'clearBClick';
setButton.dataset.button = 'setBClick';
firstButton.innerHTML = 'Клікни';
secondButton.innerHTML = 'Клікни';
undoButton.innerHTML = 'Очистити';
setButton.innerHTML = 'Встановити';

body.appendChild(mainBlock);
firstDivButton.appendChild(firstButton);
secondDivButton.appendChild(secondButton);
mainBlock.appendChild(divButton);
divButton.appendChild(undoButton);
divButton.appendChild(setButton);

// Function

let setColorBlock = function() {
    return Math.floor(Math.random() * 256);
}

let setNewColor = function (chooseBlock, number, colorSet) {
    if (number > 0 && number < 50) {
        const color = `rgb(${setColorBlock()}, ${setColorBlock()}, ${setColorBlock()})`;
        chooseBlock.style.backgroundColor = color;
        counterObject[colorSet] = color;
    } else {
        chooseBlock.style.backgroundColor = 'white';
        counterObject[colorSet] = 'white';
    }
}

//MemoryLocal
const counterObject = {
  colorFirstDiv: 'white',
  colorSecondDiv: 'white',
  firstCounter: 0,
  secondCounter: 0,
};

let setupValuesMemory = function() {
  const counterObjectInitial = JSON.parse(localStorage.getItem('counterObject')) || counterObject;
  counterForFirstButton.innerHTML = counterObjectInitial.firstCounter;
  firstDivButton.style.backgroundColor = counterObjectInitial.colorFirstDiv;
  counterForSecondButton.innerHTML = counterObjectInitial.secondCounter;
  secondDivButton.style.backgroundColor = counterObjectInitial.colorSecondDiv;
}

setupValuesMemory();

//Event
mainBlock.addEventListener('click', (e) => {
    if (e.target.dataset.button == 'firstBClick') { //Second button
        counterObject.firstCounter++;
        counterForFirstButton.innerHTML = counterObject.firstCounter;
        setNewColor(firstDivButton, counterObject.firstCounter, 'colorFirstDiv');
        localStorage.setItem('counterObject', JSON.stringify(counterObject));
    } else if (e.target.dataset.button == 'secondBClick') { //Second button
        counterObject.secondCounter++;
        counterForSecondButton.innerHTML = counterObject.secondCounter;
        setNewColor(secondDivButton, counterObject.secondCounter, 'colorSecondDiv');
        localStorage.setItem('counterObject', JSON.stringify(counterObject));
    } else if (e.target.dataset.button == 'clearBClick') {  // Clear button
        counterForFirstButton.innerHTML = 0;
        counterForSecondButton.innerHTML = 0;
        counterObject.firstCounter = 0;
        counterObject.secondCounter = 0;
        setNewColor(firstDivButton, counterObject.firstCounter, 'colorFirstDiv');
        setNewColor(secondDivButton, counterObject.secondCounter, 'colorSecondDiv');
        localStorage.setItem('counterObject', JSON.stringify(counterObject));
    } else if (e.target.dataset.button == 'setBClick') { // Setup button (prompt)
        let choosePrompt = prompt('Напишіть, який Ви хочете обрати блок (1 або 2)');
        let numberPrompt = prompt('Введіть число');
        if (choosePrompt == '1') {
          counterForFirstButton.innerHTML = +numberPrompt;
          counterObject.firstCounter = +numberPrompt;
          setNewColor(firstDivButton, +numberPrompt, 'colorFirstDiv');
        } else if (choosePrompt == '2') {
          counterForSecondButton.innerHTML = +numberPrompt;
          counterObject.secondCounter = +numberPrompt;
          setNewColor(secondDivButton, +numberPrompt, 'colorSecondDiv');
        } else {
          return alert('неправильно введені дані');
        };
        localStorage.setItem('counterObject', JSON.stringify(counterObject));
    }
});