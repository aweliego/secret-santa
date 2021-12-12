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
];

const getRandomName = (array) =>
  names[Math.floor(Math.random() * array.length)];

const pairParticipants = (array) => {
  const pairs = [];
  while (array.length > 0) {
    let secretSanta = getRandomName(names);
    array.splice(array.indexOf(secretSanta), 1);
    let elf = getRandomName(names);
    array.splice(array.indexOf(elf), 1);
    pairs.push({ secretSanta: secretSanta, elf: elf });
  }
  console.log(pairs);
  return pairs;
};

pairParticipants(names);
