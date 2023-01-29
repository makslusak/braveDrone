let score = 0;
let bombs = [];
let enemys = [];
const enemyImages = [
  './images/goodrussian.png',
  './images/grad.png',
  './images/grads.png',
  './images/gradz.png',
  './images/soilder.png',
  './images/soilderboom.png',
  './images/soildercopy.png',
  './images/tankone.png',
  './images/tankonedriver.png',
  './images/tankonez.png',
  './images/tanktwo.png',
  './images/tanktwobroken.png',
  './images/tanktwowash.png',
];

function randomEnemy() {
  return Math.floor(Math.random() * 13);
}

document.getElementById('aircraft').addEventListener('click', function () {
  let bomb = document.createElement('div');
  bomb.classList.add('bomb');
  bomb.style.top = this.offsetTop + this.offsetHeight + 'px';
  bomb.style.left = this.offsetLeft + this.offsetWidth / 2 + 'px';
  document.getElementById('game').appendChild(bomb);
  bombs.push(bomb);
});

function moveEnemy() {
  for (let i = 0; i < enemys.length; i++) {
    let enemy = enemys[i];
    enemy.style.left = enemy.offsetLeft - 2 + 'px';
    if (enemy.offsetLeft + enemy.offsetWidth < 0) {
      enemy.remove();
      enemys.splice(i, 1);
    }
  }
}

function moveBombs() {
  for (let i = 0; i < bombs.length; i++) {
    let bomb = bombs[i];
    bomb.style.top = bomb.offsetTop + 2 + 'px';
    if (bomb.offsetTop > document.getElementById('game').offsetHeight) {
      bomb.remove();
      bombs.splice(i, 1);
    }
    for (let j = 0; j < enemys.length; j++) {
      if (isCollision(bomb, enemys[j])) {
        score++;
        document.getElementById('score').innerHTML = score;
        bomb.remove();
        bombs.splice(i, 1);
        enemys[j].remove();
        enemys.splice(j, 1);
      }
    }
  }
}

function createEnemy() {
  let randomInterval = Math.floor(Math.random() * (6000 - 2300 + 1) + 2300);
  setTimeout(function () {
    let enemy = document.createElement('div');
    enemy.classList.add('enemy');
    document.getElementById('game').appendChild(enemy);
    enemys.push(enemy);
  }, randomInterval);
}
function isCollision(a, b) {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !(
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.bottom < bRect.top ||
    aRect.left > bRect.right
  );
}
setInterval(moveEnemy, 40);
setInterval(moveBombs, 30);
setInterval(createEnemy, Math.floor(Math.random() * (6000 - 700 + 1) + 700));
