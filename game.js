// defines inner html to script
const $pong = $('#pong');
const $ball = $('#ball');
const $Stickone = $('#Stickone');
const $Sticktwo = $('#Sticktwo');



// prove reflection of ball like a mirror
const UP_LEFT = -3 * Math.PI / 4;
const UP_RIGHT = - Math.PI / 4;
const DOWN_LEFT = 3 * Math.PI / 4;
const DOWN_RIGHT = Math.PI / 4;

var score1 = 0;
var score2 = 0;

//defines how game start again
function Resetball () {
    

  ball = {
    top: 240,
    left: 460,
    angle: UP_LEFT,
    speed: 8   
 
  }

  interval = setInterval(update, 25);
}



let Sticktwo = document.querySelector('#Sticktwo');
let Stickone = document.querySelector('#Stickone');
let moveBy = 30;
 
window.addEventListener('load', () => {
    Stickone.style.position = 'absolute';
    Stickone.style.left = 0;
    Stickone.style.top = 0;
    Sticktwo.style.position = 'absolute';
    Sticktwo.style.right = 0;
    Sticktwo.style.top = 0;
});

//arrange the control of sticks
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            Stickone.style.top = parseInt(Stickone.style.top) - moveBy + 'px';
            break;
        case 's':
            Stickone.style.top = parseInt(Stickone.style.top) + moveBy + 'px';
            break;
        case 'ArrowUp':
            Sticktwo.style.top = parseInt(Sticktwo.style.top) - moveBy + 'px';
            break;
        case 'ArrowDown':
            Sticktwo.style.top = parseInt(Sticktwo.style.top) + moveBy + 'px';
            break;
    }
});

// defines vektors when ball collide with top, bottom, or sticks
function update() {
  updateBall();
}

function updateBall () 
{
  ball.top += ball.speed * Math.sin(ball.angle)  ;
  ball.left += ball.speed * Math.cos(ball.angle)  ;
  $ball.css({
    top: `${ball.top}px`,
    left: `${ball.left}px`
  });

  if (isBallOverlappingWithStickone()) {
    if (ball.angle === UP_LEFT) {
      ball.angle = UP_RIGHT;
    } else {
      ball.angle = DOWN_RIGHT;
    }
  }

  if (isBallOverlappingWithSticktwo()) {
    if (ball.angle === UP_RIGHT) {
      ball.angle = UP_LEFT;
    } else {
      ball.angle = DOWN_LEFT;
    }
  }

  if (isBallOverlappingWithTop()) {
    if (ball.angle === UP_RIGHT) {
      ball.angle = DOWN_RIGHT;
    } else {
      ball.angle = DOWN_LEFT;
    }
  }

  if (isBallOverlappingWithBottom()) {
    if (ball.angle === DOWN_RIGHT) {
      ball.angle = UP_RIGHT;
    } else {
      ball.angle = UP_LEFT;
    }
  }

    

function isBallOverlappingWithStickone () {
  return $ball.overlaps('#Stickone').length > 0
}

function isBallOverlappingWithSticktwo () {
  return $ball.overlaps('#Sticktwo').length > 0
}

function isBallOverlappingWithTop () {
  return ball.top <= 0;
}

function isBallOverlappingWithBottom () {
  return ball.top >= $pong.height() - $ball.height();
}



document.getElementById('score1').innerHTML = score1.toString()
document.getElementById('score2').innerHTML = score2.toString()

// defines when players get score
 if (ball.left < 0){
     score2++ 
     Resetball()
    
  } else if (ball.left > $pong.width() - $ball.width()) {
     score1++ 
     Resetball()
  } 
  
// defines when game finished
  const winner = getWinner();
  if (winner) {
    endGame(winner);
   }
  }

function endGame(winner) {
  
  alert(`${winner} has won the game!`);
}
function getWinner () {
    if (score1 == "5"){
      return 'Player1';
    } else if (score2 == "5") {
      return 'Player2';
    }
  }
  



Resetball();
