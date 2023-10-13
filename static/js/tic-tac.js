const symbolsArray = ['img/x.png', 'img/o.png'];
var pointsArray = [];
var playerTurnArray = [];
var turn = 0;
const winningNum = [7, 56, 73, 84, 146, 273, 292, 448];
var tieGame;
const audioWinner = new Audio('audio/winner.mp3');
const audioLose = new Audio('audio/lose.mp3');

audioLose.volume = 0.2;
audioWinner.volume = 0.2;


startUp = document.querySelector('.create');
board = document.querySelector('.container');
name1 = document.getElementById('player-1');
name2 = document.getElementById('player-2');
nameHead1 = document.querySelector('#player-1-name');
nameHead2 = document.querySelector('#player-2-name');
whoseTurn = document.querySelector('.playersTurn');
resetBtns = document.querySelector('.reset-btns');
header = document.querySelector('.header');
input1 = document.querySelector('#player-1');
input2 = document.querySelector('#player-2');

console.log(resetBtns);


input1.addEventListener('input', () => {
    document.querySelector('#p1c').textContent = input1.value;
});

input2.addEventListener('input', () => {
    document.querySelector('#p2c').textContent = input2.value;
});




function play(element, number) {
    if (!tieGame) {
        var firstChild = element.firstElementChild;
        firstChild.setAttribute('src', symbolsArray[turn]);
        console.log(firstChild);
        pointsArray[turn] += number;
        console.log(winner());

        if (winner()) {
            resetBtns.removeAttribute('hidden');
            audioWinner.play();
            return whoseTurn.textContent = playerTurnArray[turn] + ' has won!';

        } else if (tieGame) {
            resetBtns.removeAttribute('hidden');
            audioLose.play();
            return whoseTurn.textContent = 'Tie Game!';
        }
        if (turn == 1) turn = 0;
        else turn = 1;
        element.attributes["0"].nodeValue = "";
        whoseTurn.textContent = playerTurnArray[turn] + "'s Turn";

    }

}

function createGame() {

    if (input1.value == '' || input2.value == '') return document.querySelector('.error').textContent = 'Please fill out the fields properly.';
    var divs = '';
    var counter = 1;
    resetBtns.setAttribute('hidden', 'true');

    for (x = 1; x <= 3; x++) {
        divs += '<div class="row-' + x + '">';
        for (y = 1; y <= 3; y++) {
            divs += '<div onclick="play(this, ' + counter + ');"><img src=""></div>';
            counter *= 2;
        }
        divs += '</div>';
    }
    board.innerHTML = divs;

    pointsArray = [0, 0];
    tieGame = false;
    playerTurnArray = [];

    //stops audio
    audioWinner.pause();
    audioWinner.currentTime = 0;
    audioLose.pause();
    audioLose.currentTime = 0;

    playerTurnArray[0] = name1.value;
    playerTurnArray[1] = name2.value;

    board.removeAttribute('hidden');
    header.removeAttribute('hidden');
    startUp.setAttribute('hidden', 'true');

    nameHead1.textContent = playerTurnArray[0];
    nameHead2.textContent = playerTurnArray[1];

    console.log(playerTurnArray);
    whoseTurn.textContent = playerTurnArray[turn] + "'s Turn";


}


function reset() {

    input1.value = '';
    input2.value = '';

    resetBtns.setAttribute('hidden', 'true');
    header.setAttribute('hidden', 'true');


    board.setAttribute('hidden', 'true');
    startUp.removeAttribute('hidden');

    document.querySelector('#p1c').textContent = '';
    document.querySelector('#p2c').textContent = '';
    document.querySelector('.error').textContent = '';



    //stops audio
    audioWinner.pause();
    audioWinner.currentTime = 0;
    audioLose.pause();
    audioLose.currentTime = 0;
}

function winner() {
    for (x = 0; x < winningNum.length; x++) {
        if ((pointsArray[turn] & winningNum[x]) == winningNum[x]) { tieGame = true; return true; }
    }
    if (pointsArray[0] + pointsArray[1] == 511) tieGame = true;

    return false;
}

function updateTitle(element) {
    element.addEventListener('input', () => {
        document.querySelector('#p1t').value += element.value;
    });
}

function updateTitle2() {

}