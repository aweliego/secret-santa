const names = [
  'Michel Scott',
  'Dwight Schrute',
  'Jim Halpert',
  'Pam Beesly',
  'Jan Levinson',
  'Kevin Malone',
  'Toby Flenderson',
  'Angela Martin',
  'Andy Bernard',
  'Stanley Hudson',
  'Ryan Howard',
  'Kelly Kapoor',
  'Phyllis Vance',
];

const getRandomName = (array) =>
  array[Math.floor(Math.random() * array.length)];

// Store all the names in 2 different arrays (secretSanta's and elves)
const secretSantas = names.slice();
const elves = names.slice();

// Loop over secretSanta's array
const assignElves = (secretSantas, elves) => {
  secretSantas.forEach((secretSanta) => {
    // Randomly pick a name in elves array
    let randomElf = getRandomName(elves);
    // If randomElf is the same person as current secretSanta, keep picking a name
    while (secretSanta === randomElf) {
      randomElf = getRandomName(elves);
    }
    // Remove randomElf from elves array (so it can't be picked again)
    elves.splice(elves.indexOf(randomElf), 1);
    // Display secretSanta and their elf
    console.log(`${secretSanta} is the Secret Santa of ${randomElf}!`);
  });
};

assignElves(secretSantas, elves);
