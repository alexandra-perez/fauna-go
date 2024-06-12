const { readJSONFile, writeJSONFile } = require('./src/helpers');
const {
  create,
  index,
  show,
  destroy,
  edit,
} = require('./src/animalController');
const inform = console.log;

function run() {
  let animals = readJSONFile('./data', 'animals.json');
  let writeToFile = false;
  let updatedAnimals = [];
  const action = process.argv[2];
  const animal = process.argv[3];

  switch (action) {
    case 'index':
      const animalsView = index(animals);
      inform(animalsView);
      break;
    case 'create':
      updatedAnimals = create(animals, animal);
      writeToFile = true;
      break;
    case 'show':
      const animalView = show(animals, animal);
      inform(animalView);
      break;
    case 'update':
      updatedAnimals = edit(animals, animal, process.argv[4]);
      writeToFile = true;
      break;
    case 'destroy':
      updatedAnimals = destroy(animals, animal);
      writeToFile = true;
      break;
    case 'score':
      const score = animals.reduce((acc, current) => acc + current.points, 0);
      inform('Current score', score);
      break;
    default:
      inform('There was an error.');
  }
  if (writeToFile) {
    writeJSONFile('./data', 'animals.json', updatedAnimals);
  }
}

run();