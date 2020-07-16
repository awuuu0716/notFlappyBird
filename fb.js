function game() {
  //canvas
  const canvas = document.getElementById("FB");
  const ctx = canvas.getContext("2d");
  //Bird
  let BirdPositionX = canvas.width / 2;
  let BirdPositionY = 100;
  const birdSize = 20;
  let FallSpeed = 3;
  //Pipes
  var pipesPositionX = 600;
  const pipesMoveSpeed = -5;
  const pipeWidth = 80;
  const pipeUpHeight = 150;
  const safeZone = 100;
  let pipeDownHeight = canvas.height - pipeUpHeight - safeZone;

  //frame
  var fps = 60;
  var interval = setInterval(draw, 1000 / fps);

  function drawBird() {
    ctx.beginPath();
    ctx.arc(BirdPositionX, BirdPositionY, birdSize, 0, Math.PI * 2);
    ctx.fillStyle = "#e7e55c";
    ctx.fill();
    ctx.closePath();
    BirdPositionY = FallSpeed + BirdPositionY;
  }

  function drawPipes() {
    ctx.beginPath();
    ctx.rect(pipesPositionX, 0, pipeWidth, pipeUpHeight);
    ctx.fillStyle = "#009900";
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.rect(
      pipesPositionX,
      pipeUpHeight + safeZone,
      pipeWidth,
      pipeDownHeight
    );
    ctx.fillStyle = "#009900";
    ctx.fill();
    ctx.closePath();
    pipesPositionX = pipesPositionX + pipesMoveSpeed;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPipes();
    drawBird();

    //超出螢幕Game over
    if (
      BirdPositionY + birdSize > canvas.height ||
      BirdPositionY - birdSize < 0
    ) {
      clearInterval(interval);
    }
    //撞上柱Game over
    if (
      BirdPositionX + birdSize > pipesPositionX &&
      BirdPositionX < pipesPositionX + pipeWidth &&
      BirdPositionY - birdSize < pipeUpHeight
    ) {
      clearInterval(interval);
    }

    //撞下柱Game over
    if (
      BirdPositionX + birdSize > pipesPositionX &&
      BirdPositionX < pipesPositionX + pipeWidth &&
      BirdPositionY + birdSize > pipeUpHeight + safeZone
    ) {
      clearInterval(interval);
    }
  }

  document.addEventListener("mousedown", e => {
    FallSpeed = -5;
  });

  document.addEventListener("mouseup", e => {
    FallSpeed = 3;
  });
}

game()