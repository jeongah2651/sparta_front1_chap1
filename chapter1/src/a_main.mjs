import { JuniorEngineer } from './a_juniorEngineer.mjs';

function main() {
  console.time("performance");
  for (let i = 0; i < 10000000; i++) {
    new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
  }
  console.timeEnd("performance");
}

// function main() {
//     console.time("performance");
//     let jePrototype = new JuniorEngineer(10, 10);
//     let isBornGenius = jePrototype.isBornGenius();
//     for (let i = 0; i < 10000000; i++) {
//       let jeInstance = Object.create(jePrototype);
//       jeInstance.isBornGenius();
//     }
//     console.timeEnd("performance");
//   }


main();
