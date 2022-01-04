const body = document.querySelector('body');
const submitPage = document.getElementById('submit-page');
const container = document.getElementById('container');
const textarea = document.getElementById('textarea');
const tagsEl = document.getElementById('tags');
const loadingEl = document.getElementById('loader');
const resultsSection = document.getElementById('results');
const btns = document.querySelector('.btns');
const drawBtn = document.querySelector('.draw-btn');
const editBtn = document.querySelector('.edit-btn');

textarea.focus();

container.addEventListener('keyup', (e) => {
  createTags(e.target.value);

  if (e.key === 'Enter') {
    const secretSantas = e.target.value.split(',');
    const elves = e.target.value.split(',');

    if (secretSantas.length < 3) {
      alert('Please enter at least 3 names!');
    }

    updateSessionStorage(secretSantas, elves);

    container.style.display = 'none';
    loadingEl.style.display = 'flex';

    setTimeout(() => {
      setResultStyles();
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
  resultsSection.innerHTML = '';

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
    // console.log(
    //   `${secretSanta.trim()} is the Secret Santa of ${randomElf.trim()}!`
    // );
    const resultEl = document.createElement('p');

    resultEl.innerHTML = `<span>${secretSanta.trim()} </span> is the secret Santa of <span>${randomElf.trim()}!</span>`;
    results.appendChild(resultEl);
  });
  resultsSection.appendChild(results);
};

// Draw names randomly again with same list
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

// Edit list of names
editBtn.addEventListener('click', () => {
  revertToDefaultStyles();

  const secretSantas = JSON.parse(sessionStorage.getItem('secretSantas'));

  container.innerHTML = `<h3 class="instructions">
  Enter all the participants' names divided by a comma (',')
</h3>
<p class="instructions">Press Enter when you're done</p>

<textarea
  placeholder="Enter the names here..."
  id="textarea"
  class="placeholder-fix textarea"
>${secretSantas}</textarea>

<div id="tags">${createTags(secretSantas)}</div>`;
});

const revertToDefaultStyles = () => {
  resultsSection.style.display = 'none';
  btns.style.display = 'none';
  submitPage.style.display = 'block';
  container.style.display = 'flex';
  loadingEl.style.display = 'none';
  body.style.background =
    '#ac2918 url("red-bg.jpeg") no-repeat fixed top / cover';
};

const setResultStyles = () => {
  submitPage.style.display = 'none';
  resultsSection.style.display = 'flex';
  btns.style.display = 'flex';
  body.style.background =
    '#fff url("white-bg.jpeg") no-repeat fixed top / cover';
};
