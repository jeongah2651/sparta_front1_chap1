import { JuniorEngineer } from './a_juniorEngineer.mjs';

//.js vs .mjs
// .js 확장자는 JavaScript 파일의 가장 일반적인 파일 확장자
// .js 의 의므는 파일에 JavaScript 코드가 포함되어 있음을 나타내는데 사용이 되고 이는 
// 웹 브라우저, 서버 및 기타 다양한 JavaScript 환경에서 실행할 수 있음을 나타냅니다.

//.mjs(ECMAScript Modules)
//CMAScript 모듈(ESM) 사양을 준수하는 JavaScript 파일에 사용되는 확장자
//import와 export 문법을 사용할 수 있습니다. 이는 코드 분석, 최적화, 트리 쉐이킹(Tree Shaking) 같은 고급 기능을 제공
//ES6 모듈 문법을 권장, 모듈 간의 의존성을 명확하게 하여 유지보수와 코드의 품질을 향상

// function main() {
//   console.time("performance");
//   for (let i = 0; i < 10000000; i++) {
//     // 매번 새로운 JuniorEngineer 객체를 생성
//     new JuniorEngineer(10, Math.floor(Math.random() * 20)).isBornGenius();
//   }
//   console.timeEnd("performance");
// }

function main() {
    console.time("performance");
    // JuniorEngineer의 프로토타입을 기반으로 한 새로운 객체를 생성
    // 프로토타입을 공유하므로 초기화가 필요하지 않아, 더 효율적인 실행이 가능합니다.
    // let jePrototype = Object.create(JuniorEngineer.prototype);
    // jePrototype.health = 10;
    // jePrototype.intelligence = Math.floor(Math.random() * 20);

    // for (let i = 0; i < 10000000; i++) {
    //     let jeInstance = Object.create(jePrototype); 
    //     jeInstance.isBornGenius(); 
    // }

    let jePrototype = Object.create(JuniorEngineer.prototype);
    jePrototype.health = 10;
    jePrototype.intelligence = Math.floor(Math.random() * 20);

    for (let i = 0; i < 10000000; i++) {
      //단점 
      //반복마다 새로운 객체를 생성하지 않기 때문에 각 객체가 프로토타입을 공유
      //객체 간에 상태가 공유되는 경우가 있을 수 있습니다.
      jePrototype.isBornGenius();
    }

    console.timeEnd("performance");
  }


main();
