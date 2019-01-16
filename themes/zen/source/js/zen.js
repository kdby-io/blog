const list = [
  "시간을 죽이고 전기를 낭비하는 손쉬운 방법",
  "혼자 구상하고 혼자 만들어서 혼자 낄낄거리는 개발자",
  "지갑 사정에 전혀 도움되지 않는 것들만 만듭니다",
  "음주코딩 전문가",
  "게으르게 살기 위해 열심히 일하는 개발자",
  "그래서 이걸로 뭘 할 수 있는데?",
  "버림받은 아이디어들을 잘도 주워 먹습니다",
  "엔트로피를 만드는 개발자",
];

const spinSpinWheelspin = () => {
  const index = Math.floor(Math.random() * list.length);
  const result = list[index];
  document.getElementById('wheelspin').textContent = result;
}

spinSpinWheelspin();
