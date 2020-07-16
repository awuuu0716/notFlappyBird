function game() {
  //canvas
  const canvas = document.getElementById("FB");
  const ctx = canvas.getContext("2d");
  //frame
  const fps = 60;
  const interval = setInterval(draw, 1000 / fps);
  //Bird
  const bird = {
    x: canvas.width / 2,
    y: 100,
    size: 20,
    fallSpeed: 3,
    color: '#e7e55c',
  }
  //Pipes
  const pipesMoveSpeed = -3;
  const safeZone = 100;
  const pipeColor ='#009900';
  const pipes = [{ x: 600, topHeight: 150, }, { x: 800, topHeight: 100 }, { x: 1000, topHeight: 160 }]

  function drawBird() {
    ctx.beginPath();
    ctx.arc(bird.x, bird.y, bird.size, 0, Math.PI * 2);
    ctx.fillStyle = bird.color;
    ctx.fill();
    ctx.closePath();
    bird.y = bird.fallSpeed + bird.y;
  }

  function drawPipes() {
    pipes.forEach(p=>{
      ctx.beginPath();
      ctx.rect(p.x, 0, 80, p.topHeight);
      ctx.fillStyle = pipeColor;
      ctx.fill();
      ctx.closePath();

      ctx.beginPath();
      ctx.rect(
        p.x,
        p.topHeight + safeZone,
        80,
        200
      );
      ctx.fillStyle = pipeColor;
      ctx.fill();
      ctx.closePath();
      p.x = p.x + pipesMoveSpeed
    })
  }

  /*function isGameOver() {
    //超出螢幕Game over
    if (
      bird.y + bird.size > canvas.height ||
      bird.y - bird.size < 0
    ) {
      return true
    }
    //撞上柱Game over
    if (
      bird.x + bird.size > pipesPositionX &&
      bird.x < pipesPositionX + pipeWidth &&
      bird.y - bird.size < pipeUpHeight
    ) {
      return true
    }
    //撞下柱Game over
    if (
      bird.x + bird.size > pipesPositionX &&
      bird.x < pipesPositionX + pipeWidth &&
      bird.y + bird.size > pipeUpHeight + safeZone
    ) {
      return true
    }
  }*/

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPipes();
    drawBird();
    //if (isGameOver()) clearInterval(interval);
  }

  document.addEventListener("mousedown", e => {
    bird.fallSpeed = -5;
  });

  document.addEventListener("mouseup", e => {
    bird.fallSpeed = 3;
  });
}

game()
