---
title: 개발자의 정보 획득 경로
tag: lifestyle
hidden: true
---
가볍게 잘 쓰던 가계부 서비스가 곧 완전한 유료모델로 전환한다고 한다. 해서 혼자라도 잘 써볼 요량으로 며칠 전부터 웹에서 동작하는 간단한 가계부를 만들고 있다. API를 먼저 만들고, 웹이든 모바일이든 단순히 이 API를 소비하는 앱을 만들어볼 생각이다.

회사를 다니기 전과 비교했을 때, 많은 것이 바뀌었다. 자동화 테스트를 작성하고, 의도치 않은 동작에 대해 어떻게 처리할지 고민하고, 커밋과 함수들을 최대한 작은 단위로 쪼갠다. _(아직까지 멍때리고 개발하다가 커밋 쪼개는 걸 잊을 때가 많다.)_ DRY(Don't Repeat Yourself)를 실천하고, 항상 리팩토링을 고민한다. 새로운 라이브러리나 프레임워크를 볼 때 항상 RTFM(Read The Fucking Manual)한다.

이런 실력 상승 곡선의 기울기를 앞으로도 유지하기 위해서는 회사 업무 말고도 다양한 소스로부터 정보를 얻어야할 필요가 있다. 내가 개발자들과 대화할 때면 항상 하는 질문이 있는데, **정보를 어디서 얻어요?** 내지는 **그런걸 어디서 보고 알았어요?** 를 묻는다. 대부분은 시원찮은 대답이 돌아온다. 그럼에도 이런 질문을 계속하는 이유는 간혹 건질만한 대답들이 있기 때문이다.

난 정보를 두가지로 분류하는 습관이 있는데, 하나는 외공을 위한 정보, 다른 하나는 내공을 위한 정보로 본다. 사실 이름은 방금 붙혔다. 외공을 위한 정보는 도구를 파악하고 어떻게 사용하는 지에 대한 정보로 대체로 새로운 기술이나 기존 기술의 더 나은 사용법을 알려준다. 내공을 위한 정보는 도구 전반에 걸쳐있는 철학과 함께 어떻게 **잘** 사용하는 지에 대한 정보로 도구가 어떤 배경 하에 탄생되었고 왜 사용하는 지를 알려준다. 이거 참... 되게 단순한 분류 기준인데 이걸 말로 풀어서 표현하기가 무척 어렵구만.

**외공은 효과적이다.** 변화가 눈에 잘 띄고 바로 써먹을 수 있다. 외공이 낮은 사람도 높은 사람을 보면서 실력을 좋다는 것을 알 수 있다. 그래서 외공에 대한 지식을 전달하기 쉽다. 익히기도 쉽다. 하지만 그 지식을 얼마나 잘 써먹느냐는 외공과는 또 다른 문제다. **내공은 실용적이다.** 기존에 알고 있던 것들을 더 잘 사용하게 한다. 그러나 자기자신조차 내공의 변화를 쉽사리 갸늠할 수 없다. 내공이 낮은 사람은 자신보다 높은 사람을 인지하기 힘들다. 그래서 내공에 대한 지식은 전달하기 힘들다. 수십번 스스로 곱씹어보면서 생각해보아야 비로소 내 것이 될랑 말랑한다.

내공과 외공 무엇하나 소홀히 할 수 없다. 내공없는 외공은 개발자를 철학없는 기계적인 코더로 전락시킬 수 있고, 외공없는 내공은... 입코더? 이건 잘 모르겠다.

다시 돌아와서, 개발자들에게 들은 대답들 중 나에게 효과있는 것들을 정리해본다.

-   **책**: 언젠가부터 기술의 사용법을 알려주는 책은 사지 않고 있다. 일부러 그런 건 아닌데, 사고나서 보니까 더 나은 개발자와 더 나은 코드를 위한 책들 뿐이다. 기술의 발전이 빠르다보니 외공 서적의 수명이 짧다는 걸 알 게 되었고, 도큐먼트를 보면서 학습하다보니 생긴 결과가 아닌가 싶다. 책은 나에겐 내공을 위한 가장 좋은 소스다. 다 읽은 책을 새로 꺼내어보아도 항상 새롭다. 먼저번에 읽었을 때랑은 또 다른 생각을 하고 있다. 그럼에도 불구하고 기술에 대한 개념을 파악하는데에 외공 서적은 여전히 효과적이고 읽을만한 가치가 있다.

-   **블로그**: 깊이는 얉을 수 있지만 내공과 외공을 모두 습득할 수 있는 소스다. 다른 사람들이 어떤 생각을 가지고 있는지 알 수 있고, 그들이 시간과 노력을 쏟아가며 얻어낸 것들을 비교적 쉽게 학습할 수 있다. 따로 RSS 구독중인 블로그는 없지만, 구글링 하면 항상 자주 들어가게 되는 블로그들이 몇 있다. 훗날 그 중에 하나가 이 블로그가 되었으면 좋겠다.

-   **다른 사람의 코드**: 아직까진 타인의 코드를 보고 내공을 학습할 수 없다. 이건 내 내공이 부족한 탓이라 어쩔 수 없다. 어설프게 유추해서 따라할 순 있겠지만 아직 온전히 내 것으로 만들기는 힘들 것 같다. 하지만 오픈 소스 프로젝트에서 사용된 dependencies 목록을 보면서 어떤 라이브러리를 사용하는지는 알 수 있다. 처음보는 패키지 이름이 있다면 일단 검색부터 해본다. 처음보는 종류의 패키지부터 기존에 쓰던 것보다 더 나은 것들을 찾을 수 있는 노다지다.
