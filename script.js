const body = document.querySelector('body');
const main = document.querySelector('main');
const container = document.getElementById('container');
const tagsEl = document.getElementById('tags');
const textarea = document.getElementById('textarea');

textarea.focus();

textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value);
  if (e.key === 'Enter') {
    setTimeout(() => {
      textarea.value = '';
    }, 10);

    const secretSantas = e.target.value.split(',');
    const elves = e.target.value.split(',');

    updateSessionStorage(secretSantas, elves);

    container.innerHTML = `<h4>Loading the results...</h4>
    <div class="loading-animation">
      <i class="fas fa-sleigh"></i>
      <i class="fas fa-gifts"></i>
    </div>`;

    setTimeout(() => {
      container.remove();
      assignElves(secretSantas, elves);
    }, 100);
  }
});

// Write out names out of text area (just for fun)
const createTags = (input) => {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim());

  tagsEl.innerHTML = '';

  tags.forEach((tag) => {
    const tagEl = document.createElement('span');
    tagEl.classList.add('tag');
    tagEl.innerText = tag;
    tagsEl.appendChild(tagEl);
  });
};

// Helper function to generate a random name
const getRandomName = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Loop over secretSanta's array
const assignElves = (secretSantas, elves) => {
  main.innerHTML = '';
  const resultsSection = document.createElement('div');
  resultsSection.setAttribute('id', 'results-section');
  main.appendChild(resultsSection);

  const results = document.createElement('div');
  results.classList.add('results');

  secretSantas.forEach((secretSanta) => {
    // Randomly pick a name in elves array
    let randomElf = getRandomName(elves);
    // If randomElf is the same person as current secretSanta, keep picking a name
    while (secretSanta === randomElf) {
      if (secretSanta !== randomElf) {
        break;
      }
      randomElf = getRandomName(elves);
    }
    // Remove randomElf from elves array (so it can't be picked again)
    elves.splice(elves.indexOf(randomElf), 1);
    // Display secretSanta and their elf
    console.log(
      `${secretSanta.trim()} is the Secret Santa of ${randomElf.trim()}!`
    );
    const resultEl = document.createElement('p');

    resultEl.innerHTML = `<span>${secretSanta.trim()} </span> is the secret Santa of <span>${randomElf.trim()}!</span>`;
    results.appendChild(resultEl);
  });
  resultsSection.appendChild(results);
};

// Draw names randomly again with same list
const drawBtn = document.createElement('button');
drawBtn.classList.add('draw-btn');
drawBtn.innerHTML = `Draw names again <i class="fas fa-gift"></i>`;
body.appendChild(drawBtn);

drawBtn.addEventListener('click', () => {
  const secretSantas = JSON.parse(sessionStorage.getItem('secretSantas'));
  const elves = JSON.parse(sessionStorage.getItem('elves'));
  assignElves(secretSantas, elves);
});

// Update session storage with names input
const updateSessionStorage = (secretSantas, elves) => {
  sessionStorage.setItem('secretSantas', JSON.stringify(secretSantas));
  sessionStorage.setItem('elves', JSON.stringify(elves));
};
