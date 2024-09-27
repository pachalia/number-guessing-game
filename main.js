let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
guessSubmit.disabled=true
let guessCount = 1;
let resetButton;
guessField.focus();

const checkGuess=() => {
    guessSubmit.disabled=true
    const userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Предыдущие догадки: ';
    }
    guesses.textContent += userGuess + ' ';
    if (userGuess === randomNumber) {
        lastResult.textContent = 'Поздравляю! Вы угадали';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!КОНЕЦ ИГРЫ!!!';
        lowOrHi.textContent = '';
        setGameOver();
    } else {
        lastResult.textContent = 'Неверно!';
        lastResult.style.backgroundColor = 'red';
        if(userGuess < randomNumber) {
            lowOrHi.textContent = 'Надо брать больше';
        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = 'Надо брать меньше!';
        }
    }
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', ()=> guessField.value.length>0 ? checkGuess() : null);

guessField.addEventListener('keyup', (event) =>{
    guessField.value.length>0 && guessField.value.length <= 3
        ? guessSubmit.removeAttribute('disabled')
        : guessSubmit.disabled=true
    event.keyCode===13 && guessField.value.length>0 ? checkGuess() : null
})

const setGameOver = () => {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Начать новую игру';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

const resetGame = () => {
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = true;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}