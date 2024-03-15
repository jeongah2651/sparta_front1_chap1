/**
 * ## 문제 B
 * 
 * <준비>
 * 1. npm run dev 로 개발서버를 실행합니다.
 * 2. http://localhost:8000/chapters/chapter1/b.html 로 접속하면 UI를 확인할 수 있어요.
 * 3. 버튼을 클릭 했을 때, 로딩이 멈추는 것을 볼 수 있습니다.
 * 
 * <목표>
 * "b.js"의 [HardWork] 클래스의 do() 메서드를 개선하여
 * 버튼을 클릭 했을 때, 로딩이 멈추지 않도록 합니다.
 * 그리고 순차적으로 연산되는 결과가 지속적으로 화면에 노출됩니다.
 * 
 * <조건>
 * 1. 정의된 메서드 중 do() 메서드만 수정가능 합니다. (추가적인 메서드를 정의하는 것도 가능)
 * 2. async/await 문법을 사용할 수 없습니다.
 * 3. task가 순차적으로 실행되어야 합니다. (반드시 이전 task가 완료되고 다음 task가 실행)
 * 
 * <제출물>
 * 1. 코드를 확인할 수 있는 링크 또는 코드 캡쳐 이미지
 */


/**
 * @description
 * 고비용 연산을 하는 모듈입니다.
 * 삼만개의 _task를 순차적으로 연산합니다.
 */
class HardWork {
  constructor() {
    this._result = 0; //작업 결과
    this._tasks = this._initTasks(); //작업 초기화
  }

  // do() {
  //   for (let i = 0; i < this._tasks.length; i++) {
  //     // 비동기적으로 작업 실행
  //     setTimeout(() => {
  //       console.log(`Task ${i}`); //작업수 확인
  //       this._tasks[i](); //작업 실행
  //     }, 0); 
  //   }
  // }
  // do() {
  //   let i = 0;
  //   const runLoop = () => {
  //     if (i > this._tasks.length) {
  //       cancelAnimationFrame(runLoop);
  //     } else {
  //       this._tasks[i]();
  //       i++;
  //       requestAnimationFrame(runLoop);
  //     }
  //   };
  //   requestAnimationFrame(runLoop);
  // }
  do() {

  //Promise : 비동기 작업의 성공 또는 실패를 명확하게 처리
    // let promises = [];
    // for (let i = 0; i < this._tasks.length; i++) {
    //   promises.push(new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       this._tasks[i](); 
    //       resolve();
    //     }, 0);
    //   }));
    // }
    // return Promise.all(promises); //모든 작업이 완료될때까지 기다림

    return new Promise((resolve, reject) => {
      let i = 0;  // 반복문의 인덱스 초기화
      const runLoop = () => {
        if (i >= this._tasks.length) {
            cancelAnimationFrame(runLoop); //작업이 완료되면 애니메이션 프레임 요청을 취소
            resolve(); // 모든 작업이 성공적으로 완료
        } else {
            try { // 현재 인덱스에 해당하는 작업을 실행
                this._tasks[i](); 
                i++; //다음 작업 인덱스를 증가
                requestAnimationFrame(runLoop); //반복 작업을 계속
            } catch (error) {
                reject(error); //오류를 reject하여 Promise를 거부
            }
        }
      };
      requestAnimationFrame(runLoop);  //최초의 requestAnimationFrame 호출로 반복 작업을 시작
    });
  }

  // do() 이외의 메서드는 수정하지마세요
  get result() {
    return this._result;
  }
  _initTasks() { //작업 초기화
    const count = 30000; //작업수
    const tasks = new Array(count); // 작업을 담을 배열

    //작업 수 만큼 반복하여 , 배열 추가 
    for (let i = 0; i < count; i++) {
      //랜덤 작업 생성하여 배열 추가
      tasks[i] = this._createTask(Math.floor(Math.random() * 3) + 1);
    }

    return tasks; //작업 목록 반환
  }

  //작업 생성
  _createTask = (n) => () => {
    for (let i = 0; i < 1000; i++) {
      const randnum = Math.random();
      const alpha = Math.floor(randnum * 10) % n;
      
      if (alpha > 0) {
        //작업에 알파값을 추가 
        this._result += alpha;
      }
    }

    //로그 전송
    this._sendLog();
  }

  //로그 전송
  async _sendLog() {
    // 작업 결과를 JSON 형식으로 변환하여 Blob 생성
    const blob = new Blob([JSON.stringify({
      value: this._result.toFixed(2), 
    }, null, 2)], {
      type: "application/json",
    });

    // 작업 결과를 JSON 형식으로 변환하여 Blob 생성
    const res = await blob.text(); 
    // JSON 파싱
    JSON.parse(res);
  }
  //- do() 이외의 메서드는 수정하지마세요
}

// 수정하지마세요
/**
 * @description
 * 로딩 애니메이션을 무한루프로 돌아가도록 합니다.
 */
class Dashboard { // 대시보드
  constructor(work) {
    this._indicatorElement = document.getElementById('indicator');
    this._descriptionElement = document.getElementById('desc');
    this._startTimestamp = 0; //작업 시작 시간
    this._work = work;
  }

  start() { //시작
    this._startTimestamp = Date.now(); // 현재 시간 기록
    requestAnimationFrame(this._render); // 화면 렌더링 시작
  }

  // 화면 렌더링
  _render = () => {
    const timestamp = Date.now(); // 화면 렌더링
    const percent = (((timestamp - this._startTimestamp) * 5) % 10000) / 100; // 진행률 계산

    this._indicatorElement.style.setProperty('width', `${percent}%`); //진행률
    this._descriptionElement.innerHTML = `업무량: ${this._work.result}`; // 작업 결과 표시

    requestAnimationFrame(this._render);
  }
}

async function main () {
  const hardWork = new HardWork(); //HardWork 생성
  const dashboard = new Dashboard(hardWork); // Dashboard 생성

  dashboard.start(); // 대시보드 시작
  document.getElementById('btn').addEventListener('click', () => {
    hardWork.do(); // 버튼 클릭 시 작업 시작! 
  });
}

main();
//- 수정하지마세요
