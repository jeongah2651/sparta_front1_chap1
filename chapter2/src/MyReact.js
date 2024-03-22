import { createHooks } from "./hooks";
import { render as createElement } from "./render";

function MyReact() {
  let _root = null; // 루트 DOM 요소
  let _rootComponent = null; // 루트 컴포넌트 함수
  

  // _render 함수는 루트 컴포넌트를 렌더링하고, 결과로 나온 JSX를 실제 DOM으로 변환하여 _root에 마운트합니다.
  const _render = () => {
    resetHookContext();
    const jsxElement = _rootComponent();
    createElement(_root, jsxElement);
  };
  
  function render($root, rootComponent) {
    _root = $root; // 루트 DOM 요소 설정
    _rootComponent = rootComponent; // 루트 컴포넌트 함수 설정
    _render(); // 컴포넌트 렌더링
  }

  const { useState, useMemo, resetContext: resetHookContext } = createHooks(_render);

  return { render, useState, useMemo };
}

export default MyReact();
