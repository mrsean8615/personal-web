var numGuess = 0;
const numGuessStr = 'Number of Guesses: ';

//audio variables
var loseAudio = new Audio();
loseAudio.volume = 0.2;
loseAudio.loop = true;
var winAudio = new Audio('audio/winner.mp3');
winAudio.volume = 0.2;


const regex = /^(([0-9][1-9])|([1-9][0-9])|[1-9])$/;
const userGuessStr = 'Your Guesses: ';
var guessArray = [''];
var message = '';

//allows the user to use the enter key
var input = document.getElementById('user-input');
input.addEventListener('keyup', function(e) {
    if (e.key === "Enter") {
        checkNumber();
    }
})

//only sets a random number for the first game
//gets number from 1 - 99
var randomNumber = Math.floor(Math.random() * 99) + 1;




function checkNumber() {


    var userGuess = document.querySelector('#user-input').value;
    console.log(randomNumber);

    //checks for invalid inputs
    if (!regex.test(userGuess)) {
        document.querySelector('.img-result').setAttribute('src', 'img/error.png');
        return document.querySelector('.error').textContent = "That's not a valid number.";
    }
    document.querySelector('.error').textContent = '';

    numGuess += 1;
    document.querySelector('.guesses').textContent = numGuessStr + numGuess;
    //console.log(numGuess);

    //all guesses array
    guessArray.push(userGuess);
    document.querySelector('.attempts').textContent = userGuessStr + guessArray.join('\n');

    document.querySelector('.title').setAttribute('hidden', 'true');


    //winner check
    if (userGuess == randomNumber) return youWin(randomNumber);

    //loser check
    if (numGuess == 5) return youLose(randomNumber);

    //too high
    if (userGuess > randomNumber) {
        //console.log('too high');
        message = document.querySelector('.message').textContent = 'Too high.';
        document.querySelector('.img-result').setAttribute('src', 'img/too-high.png');


        //too low
    } else if (userGuess < randomNumber) {
        //console.log('too low');
        message = document.querySelector('.message').textContent = 'Too low.';
        document.querySelector('.img-result').setAttribute('src', 'img/too-low.png');
    }
    document.querySelector('#user-input').value = '';
    document.querySelector('#user-input').focus();
    document.querySelector('.guesses').textContent = numGuessStr + numGuess;
};

function youLose(answer) {

    if (guessArray[guessArray.length - 1] % 2 == 0) {
        loseAudio.src = 'audio/lose.mp3';
    } else {
        loseAudio.src = 'audio/lose2.mp3';
    }

    document.querySelector('.img-result').setAttribute('src', 'img/sad-monkee.jpg');

    document.querySelector('.error').textContent = 'Too many guesses. YOU LOSE';
    document.querySelector('#user-input').setAttribute('hidden', 'true');
    document.querySelector('#submit').setAttribute('hidden', 'true');

    document.querySelector('.answer').textContent = 'Nice Try! The number was: ' + answer;

    message = document.querySelector('.message').textContent = '';
    loseAudio.play();



    document.querySelector('#try-again').removeAttribute('hidden');

}

function reset() {
    document.querySelector('.error').textContent = '';
    document.querySelector('#user-input').removeAttribute('hidden');
    document.querySelector('.img-result').removeAttribute('hidden');
    document.querySelector('#submit').removeAttribute('hidden');
    document.querySelector('.title').removeAttribute('hidden');


    document.querySelector('#try-again').setAttribute('hidden', 'true');
    document.querySelector('.img-result').setAttribute('src', 'img/start.png');

    document.querySelector('.answer').textContent = '';

    //stops audio
    loseAudio.pause();
    loseAudio.currentTime = 0;

    //gets a brand new number
    randomNumber = Math.floor(Math.random() * 99) + 1;


    //resets the attempts array
    guessArray = [];
    document.querySelector('.attempts').textContent = '';

    //resets number of guesses
    numGuess = 0;
    document.querySelector('.guesses').textContent = numGuessStr + numGuess;
    document.querySelector('#user-input').value = '';

}

function youWin(answer) {
    document.querySelector('.img-result').setAttribute('src', 'img/winner.png');
    document.querySelector('#user-input').setAttribute('hidden', 'true');
    document.querySelector('#submit').setAttribute('hidden', 'true');
    document.querySelector('.guesses').textContent = numGuessStr + numGuess;
    document.querySelector('.answer').textContent = 'Good Job! The number was: ' + answer;
    document.querySelector('#try-again').removeAttribute('hidden');
    message = document.querySelector('.message').textContent = '';
    winAudio.play();
}