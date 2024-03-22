export function createHooks(callback) {
  let states = []; // 여러 개의 상태를 관리
  let currentIdx = 0; // 다음 상태를 추가할 위치(index)

  const useState = (initState) => {
    // 현재 state 값이 있다면 현재 값을, 아니라면 초기 값을 반환
    // const state = states[currentIdx] !== undefined ? states[currentIdx] : initState;
    const state = states[currentIdx] || initState;

    // 현재 state의 위치
    const _idx = currentIdx;

    // state를 변경할 수 있는 setState 함수
    const setState = (newValue) => {
      if (states[_idx] != newValue) {
         // 현재 위치에 해당하는 state 값을 수정
        states[_idx] = newValue;
        callback();
      }
    }
    
    currentIdx++;
    return [state, setState];
  };

  const useMemo = (fn, refs) => {
    // currentIdx를 사용하여 현재 메모이제이션된 값과 의존성 배열을 저장할 위치를 확인합니다.
    let memo = states[currentIdx];
    
    // 존재한다면 현재 받은 refs와 비교
    // every() 메서드는 배열의 모든 요소가 제공된 함수로 구현된 테스트를 통과하는지 테스트합니다. 
    // 이 메서드는 불리언 값을 반환합니다.
    // some(), JSON.stringify()
    if (memo && refs.every((dep, index) => dep === memo.refs[index])) {
      currentIdx++;
      return memo.value;
    }

    // 새로운 값을 계산하고 states 배열에 저장
    const newValue = fn();
    states[currentIdx] = { value: newValue, refs };
    
    currentIdx++;

    return newValue;
    // return fn();
  };

  const resetContext = () => {
    // setState로 state가 변경된 이후에 다시 render되어도 useState 함수는 
    // 계속 변경된 위치의 currentIdx를 바라보게 된다. 
    // render 시마다 currentIdx를 초기화해서 기존의 state를 계속 바라볼 수 있게 함
    currentIdx = 0;
    // setTimeout(resetContext, 0);
  }

  return { useState, useMemo, resetContext };
}
