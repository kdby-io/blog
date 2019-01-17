---
title: Google Music의 I'm feeling lucky mix
tag: 알고리즘
---
Google Music의 첫 화면에는 I'm feeling lucky mix 버튼이 있다.
사용자의 취향에 기반해 음악을 자동 선정해 재생목록을 만들어주는 기능같은데, 반 년 가까이 I'm feeling lucky mix로만 음악을 듣다보니 문제가 있음을 발견했다.

"Based on your music taste"라는 사족이 붙어있는 걸로 볼 때, 이 기능은 각 음원이 재생횟수(play count)에 기반하는 것처럼 보인다. play count 데이터가 없는 초기 상태에서는 완전한 랜덤으로 재생목록을 만들어주는데, 이 때 재생횟수가 증가하기 때문에 지금의 재생목록이 다음번 I'm feeling lucky mix의 영향을 미친다. 즉, 듣던 음악들만 계속 듣게 된다.

[지프의 법칙](https://ko.wikipedia.org/wiki/%EC%A7%80%ED%94%84%EC%9D%98_%EB%B2%95%EC%B9%99)과 뭔가 관련이 있지 않을까?
