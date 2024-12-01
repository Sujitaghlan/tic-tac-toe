
let boxes = document.querySelectorAll('.box');
let reset = document.querySelector('#reset');
let newbutton = document.querySelector('#newbtn');
let message = document.querySelector('#msg');
let messageCont = document.querySelector('.msg-container');
let audio = document.querySelector('#moveSound');
let xTurn = document.querySelector("#x-turn");
let oTurn = document.querySelector("#o-turn");
let turnO = true;

xTurn.classList.remove('toggleBackground');

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    oTurn.classList.add('toggleBackground');
    xTurn.classList.remove('toggleBackground');
    turnO = true;
    count = 0;
    enableBoxes();
    messageCont.classList.add('hide');
}


let count = 0;
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        audio.currentTime = 0; // Reset the audio to start
        audio.play();
        console.log("box was clicked");

        if (turnO) {
            box.innerText = 'O';
            oTurn.classList.remove('toggleBackground');
            xTurn.classList.add('toggleBackground');
            turnO = false;
        } else {
            box.innerText = 'X';
            xTurn.classList.remove('toggleBackground');
            oTurn.classList.add('toggleBackground');
            turnO = true;
        }
     
        count++;
        box.disabled = true;
        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = '';
    }
}

const showWinner = (winner) => {
    message.innerText = `Congratulations, winner is ${winner}`;
    messageCont.classList.remove('hide');
}

const drawGame = () => {
    message.innerText = "Game is draw";
    messageCont.classList.remove('hide');
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1value = boxes[pattern[0]].innerText;
        let pos2value = boxes[pattern[1]].innerText;
        let pos3value = boxes[pattern[2]].innerText;

        if (pos1value !== '' && pos2value !== '' && pos3value !== '') {
            if (pos1value === pos2value && pos2value === pos3value) {
                console.log('winner', pos1value);
                showWinner(pos1value);
                disableBoxes();
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                });
                return;
            }
        }
    }

    if (count === 9) {
        drawGame();
    }
};

newbutton.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
