let score = 0;
let level = 1;
let bombs = [];
let enemys = [];

const aircraftRef = document.getElementById('aircraft');
const gameRef = document.getElementById('game');
const scoreRef = document.getElementById('score');
const levelRef = document.getElementById('level');

const enemyImages = [
  './images/goodrussian.png',
  './images/grad.png',
  './images/grads.png',
  './images/gradz.png',
  './images/soilder.png',
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
  return Math.floor(Math.random() * 14);
}

aircraft.addEventListener('click', function () {
  let bomb = document.createElement('div');
  bomb.classList.add('bomb');
  bomb.style.top = this.offsetTop + this.offsetHeight + 'px';
  bomb.style.left = this.offsetLeft + this.offsetWidth / 2 + 'px';
  gameRef.appendChild(bomb);
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
    if (bomb.offsetTop > gameRef.offsetHeight) {
      bomb.remove();
      bombs.splice(i, 1);
    }
    for (let j = 0; j < enemys.length; j++) {
      if (isCollision(bomb, enemys[j])) {
        score++;
        scoreRef.innerHTML = score;
        levelChange();
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
    let enemy = document.createElement('img');
    enemy.setAttribute('src', enemyImages[randomEnemy()]);
    enemy.classList.add('enemy');
    gameRef.appendChild(enemy);
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

function levelChange() {
  if (score > 10 && score <= 20) {
    level = 2;
  } else if (score > 20 && score <= 30) {
    level = 3;
  } else if (score > 30 && score <= 40) {
    level = 4;
  } else if (score > 40 && score <= 50) {
    level = 5;
  }

  levelRef.innerHTML = level;
}

setInterval(moveEnemy, 30);
setInterval(moveBombs, 30);
setInterval(createEnemy, Math.floor(Math.random() * (6000 - 700 + 1) + 700));
