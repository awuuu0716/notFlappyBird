const highScore = document.getElementById("highScore")
let countHighScore = 0;
highScore.innerHTML = `BEST: ${countHighScore}`

function game() {
  //restartButton
  closeRestartButton()
  //canvas
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  
  //frame
  const fps = 60;
  const interval = setInterval(draw, 1000 / fps);
  //score
  const score = document.getElementById("score")
  let countScore = 0;
  score.innerHTML = `SCORE: ${countScore}`
  //Bird
  const bird = {
    x: canvas.width / 2,
    y: 100,
    size: 20,
    fallSpeed: 3,
    color: '#e7e55c',
  }
  //Pipes
  const pipesMoveSpeed = -2;
  const safeZone = 100;
  const pipeColor = '#009900';
  const pipeWidth = 80;
  const pipes = [{ x: 600, topHeight: 150, }, { x: 800, topHeight: 100 }, { x: 1000, topHeight: 160 }]

  function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();
    bird.y = bird.fallSpeed + bird.y;
  }

  function generatePipe() {
    const newPipe = { x: pipes[pipes.length - 1].x + 200, topHeight: Math.random() * 130 + 30 };
    pipes.push(newPipe);
  }

  function deletePipe() {
    if (pipes[0].x < -80) pipes.shift()
  }

  function getScore() {
    countScore += 1;
    score.innerHTML = `SCORE: ${countScore}`
    if (countScore > countHighScore) {
      countHighScore = countScore;
      highScore.innerHTML = `BEST: ${countHighScore}`
    }
  }

  function drawPipes() {
    pipes.forEach(p => {
      ctx.beginPath();
      ctx.rect(p.x, 0, pipeWidth, p.topHeight);
      ctx.fillStyle = pipeColor;
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(
        p.x,
        p.topHeight + safeZone,
        pipeWidth,
        200
      );
      ctx.fillStyle = pipeColor;
      ctx.fill();
      ctx.closePath();
      p.x = p.x + pipesMoveSpeed
      if (p.x + 80 === bird.x) getScore()
    })
  }

  function isGameOver() {
    //超出螢幕Game over
    if (
      bird.y + bird.size > canvas.height ||
      bird.y - bird.size < 0
    ) {
      return true
    }
    for (let i = 0; i < pipes.length; i++) {
      //撞上柱Game over
      if (
        bird.x + bird.size > pipes[i].x &&
        bird.x < pipes[i].x + pipeWidth &&
        bird.y - bird.size + 1 < pipes[i].topHeight
      ) {
        return true
      }
      //撞下柱Game over
      if (
        bird.x + bird.size > pipes[i].x &&
        bird.x < pipes[i].x + pipeWidth &&
        bird.y + bird.size > pipes[i].topHeight + safeZone
      ) {
        return true
      }
    }
  }

  function showRestartButton() {
    const restartButton = document.getElementById("restart");
    restartButton.setAttribute("style","display:inline-block;")
  }

  function closeRestartButton() {
    const restartButton = document.getElementById("restart");
    restartButton.setAttribute("style", "display:none;")
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (pipes.length < 8) generatePipe()
    drawPipes();
    drawBird();
    deletePipe()
    if (isGameOver()) {
      clearInterval(interval)
      showRestartButton()
    };
  }

  document.addEventListener("mousedown", e => {
    bird.fallSpeed = -5;
  });

  document.addEventListener("mouseup", e => {
    bird.fallSpeed = 3;
  });
}

game()
