import { describe, expect, test } from 'vitest'
import { jsx, render } from '../render'
describe('render > ', () => {
  describe('첫 번째 렌더링 테스트', () => {
    test('한 개의 태그를 렌더링할 수 있다.', () => {
      // App을 재정의합니다.
      const App = jsx(
        'div',
        null,
        'div의 children 입니다.'
      );

      // 빈 div 엘리먼트를 생성합니다.
      const $root = document.createElement('div');
       // 생성한 엘리먼트에 App을 렌더링합니다.
      render($root, App);
      
      // 생성한 엘리먼트의 innerHTML을 확인하여 예상값과 일치하는지 테스트합니다.
      expect($root.innerHTML).toBe(`<div>div의 children 입니다.</div>`);

      console.log($root.innerHTML);
    })

    test('props를 추가할 수 있다.', () => {
      const App = jsx(
        'div',
        { id: 'test-id', class: 'test-class' },
        'div의 children 입니다.'
      );

      const $root = document.createElement('div');
      render($root, App);

      expect($root.innerHTML).toBe(`<div id="test-id" class="test-class">div의 children 입니다.</div>`);

      console.log($root.innerHTML);
    })

    test('자식 노드를 표현할 수 있다.', () => {
      const App = jsx(
        'div',
        { id: 'test-id', class: 'test-class' },
        jsx('p', null, '첫 번째 문단'),
        jsx('p', null, '두 번째 문단'),
      );

      const $root = document.createElement('div');
      render($root, App);

      expect($root.innerHTML).toBe(`<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`);

      console.log($root.innerHTML);
    })
  })

  describe('리렌더링 테스트 - 변경된 내용만 반영되도록 한다.', () => {
    test('하위 노드 추가', () => {
      const $root = document.createElement('div');

      const App = jsx(
        'div',
        { id: 'test-id', class: 'test-class' },
        jsx('p', null, '첫 번째 문단'),
        jsx('p', null, '두 번째 문단'),
      );

      render($root, App);

      expect($root.innerHTML).toBe(`<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`);

      const children = [...$root.querySelectorAll('p')];

      render($root, jsx(
        'div',
        { id: 'test-id', class: 'test-class' },
        jsx('p', null, '첫 번째 문단'),
        jsx('p', null, '두 번째 문단'),
        jsx('p', null, '세 번째 문단'),
      ), App);

      expect($root.innerHTML).toBe(`<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p><p>세 번째 문단</p></div>`);

      const newChildren = [...$root.querySelectorAll('p')];

      expect(children[0]).toBe(newChildren[0]);
      expect(children[1]).toBe(newChildren[1]);
      expect(children[2]).not.toBe(newChildren[2]);

      console.log($root.innerHTML);
    })

    test('props 수정', () => {
      const $root = document.createElement('div');
      const App = jsx(
        'div',
        { id: 'test-id', class: 'test-class' },
        jsx('p', null, '첫 번째 문단'),
        jsx('p', null, '두 번째 문단'),
      )

      render($root, App);

      expect($root.innerHTML).toBe(`<div id="test-id" class="test-class"><p>첫 번째 문단</p><p>두 번째 문단</p></div>`);

      const children = [...$root.querySelectorAll('p')];

      render($root, jsx(
        'div',
        null,
        jsx('p', null, '첫 번째 문단'),
        jsx('p', null, '두 번째 문단'),
      ), App);

      expect($root.innerHTML).toBe(`<div><p>첫 번째 문단</p><p>두 번째 문단</p></div>`);

      const newChildren = [...$root.querySelectorAll('p')];

      expect(children[0]).toBe(newChildren[0]);
      expect(children[1]).toBe(newChildren[1]);

      console.log($root.innerHTML);
    })
   
  })
})
