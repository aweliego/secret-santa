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

    assignElves(secretSantas, elves);
  }
});

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

const getRandomName = (array) =>
  array[Math.floor(Math.random() * array.length)].trim();

// Loop over secretSanta's array
const assignElves = (secretSantas, elves) => {
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
    console.log(`${secretSanta} is the Secret Santa of ${randomElf}!`);
  });
};
