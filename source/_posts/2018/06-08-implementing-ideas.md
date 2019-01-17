---
title: 아이디어 구현하기
tag: scribble
---

난 만들어보면 재미있을 것 같은 아이템 목록을 적어둔다. 이 아이디어들은 혼자서 심심할 때 혹은 해커톤에 나갈 때 하나씩 구현된다. 바쁘다는 핑계로 목록 개수만 늘이고 있었는데 요새 시간이 많아져서 몇 가지 만들어보기로 했다. 좀 정상적인 아이템들은 해커톤 나가서 다른 사람들과 같이 만들어 볼 수 있기 때문에, 그렇지 않은 걸로만 몇 개 골랐다.

## Dynamic Dictation

[https://pueue.com/dynamic-dictation/](https://pueue.com/dynamic-dictation/)

__음성과 음량을 글자로 바꿔준다.__ [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)와 [Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)를 적절히 섞어서 목소리의 음량과 표시되는 글자의 크기가 비례하도록 했다.

## Uncertainty

[https://github.com/pueue/uncertainty](https://github.com/pueue/uncertainty)

__측정될 때 값이 정해지는 데이터 타입.__ 현재 양자역학의 주류인 코펜하겐 해석에 의하면 입자의 상태는 관측하는 그 순간에 정해진다. Uncertainty 타입의 데이터도 값이 정해지지 않은 상태로 메모리에 존재하지만 사용하는 순간에 값이 특정된다. [Object.defineProperty()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)로 구현할 수 있었다.

## idiots.io

[https://idiots.io/](https://idiots.io/)

__익명 직장 채팅 어플.__ 블라인드라는 앱의 채팅버전이다. 아이템 자체로 특별한 건 없고 GraphQL Subscription을 써보고 싶어서 만들었다. 한 일주일이면 서버와 앱까지 다 만들 수 있을 줄 알았는데, React Native가 발목을 잡아서 며칠 더 걸렸다. 역시 프론트엔드는 어려워.

## jongfill

[https://github.com/pueue/jongfill](https://github.com/pueue/jongfill)

__한글에 종성을 채워준다.__ 숫자를 문자로 출력할 때 고정된 길이로 0을 붙혀서 출력하는 것을 zerofill 또는 zfill이라고 한다. 또 '곣맋웏욗'처럼 종성을 분리해서 문장을 쓰는게 인터넷에서 유행했던 적이 있었다. jongfill이란 이름의 이 라이브러리는 얼핏 듣기에는 마치 사람 이름 같지만 어떤 기능을 하는지 직관적으로 표현해주는 가장 완벽한 이름을 가지고 있다.