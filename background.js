const gameRef = document.getElementById('game');
const firstHoseRef = document.querySelector('.house');
const firstTreeRef = document.querySelector('.tree');
const firstTreesRef = document.querySelector('.trees');

const bgImages = [
  './images/houseone.png',
  './images/housetwo.png',
  './images/tree.png',
  './images/treecouple.png',
  './images/treelitle.png',
  './images/trees.png',
];

const activeBgImages = [firstHoseRef, firstTreeRef, firstTreesRef];

function randomBg() {
  return Math.floor(Math.random() * 6);
}

export function createbg() {
  setTimeout(function () {
    let bgImage = document.createElement('img');
    bgImage.setAttribute('src', bgImages[randomBg()]);
    bgImage.classList.add('bgObjects');
    gameRef.appendChild(bgImage);
    activeBgImages.push(bgImage);
  }, 100);
}

export function moveBg() {
  for (let i = 0; i < activeBgImages.length; i++) {
    let bgImage = activeBgImages[i];
    bgImage.style.left = bgImage.offsetLeft - 1 + 'px';

    if (bgImage.offsetLeft + bgImage.offsetWidth < 0) {
      bgImage.remove();
    }
  }
}
