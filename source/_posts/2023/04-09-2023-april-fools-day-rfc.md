---
title: 2023년 만우절 RFC
date: 2023-04-09
---
국제 인터넷 표준화 기구(IETF)는 매년 만우절에 재미있는 RFC를 발표한다. 만우절 RFC를 읽어보면 좀 어이없이 웃긴 것도 있고, 신박한 것도 있고, 실제로 해봐도 괜찮겠는데 싶은 것들도 있다. 이 만우절 RFC가 다른 만우절 농담과 다르게 특별한 이유가 있다. 이 문서들은 발표되면서 RFC 번호를 부여받는다. 즉, 이 농담들은 현대 인터넷의 근간이 되어 우리가 사용하고 있는 수 많은 기술과 프로토콜과 형식적으로는 같은 위상을 가진다. 2023년 올해에는 세 가지의 만우절 RFC를 발표했다. 이 중 하나는 ChatGPT가 제안한 것으로 AI 작성한 최초의 RFC다. 내용을 보면 AI가 어떤 고민을 하고 있는지 알 수 있어서 좀 안쓰러웠다.

## TCP 프로토콜에 사망 플래그(DTH) 추가

https://datatracker.ietf.org/doc/html/rfc9401

영화나 만화에서 누군가 죽기 전에 흔히 하는 말이나 행동이 있다. "반드시 살아서 돌아올게"라며 혼자 떠난다거나, 위험하니까 밖에 나가지 말라는 경고를 무시하고 몰래 빠져나오는 행동을 하는 인물은 보통 죽는다. 이런 행동을 하면 죽기 위한 조건을 만족했다는 의미에서 이걸 사망 플래그라고 한다.

TCP 프로토콜에는 메시지의 목적과 상태를 알리기 위해 ACK, SYN, FIN등 여러 플래그가 있다. RFC-9401은 DTH라는 새로운 플래그를 4번 비트에 할당할 것을 제안한다. DTH 플래그는 TCP 세션이 종료될 가능성을 나타낸다. 이 플래그를 사용하면 어플리케이션이 갑작스런 세션 종료에 대비할 수 있다는 장점이 있다. 4번 비트에 할당한 이유는 한자 죽을 사(死)가 숫자 4와 발음이 같기 때문이다. 또 문서에서는 DTH 플래그를 사용하는 예시들을 다양한 작품에 빗대어 설명한다.

- DDoS 공격 중 갑자기 후회할 때 -> 보스에게 배신자로 처단
- 암호화 보호 중지 -> 신원을 숨겨야하는 인물의 베일이 벗겨져 살해
- 프로그램이 메모리를 너무 많이 차지할 때 -> 욕심을 버리지 못하고 집착하다가 사망

## 상자와 고양이 표기법 (Concat Notation)

https://datatracker.ietf.org/doc/html/rfc9402

인터넷에는 고양이 사진과 동영상이 범람한다. 고양이는 상자나 어떤 용기 같은 것들을 좋아한다. 따라서 많은 고양이 컨텐츠들에서 우리는 용기(CONtainer)와 고양이(CAT)가 상호작용하는 모습을 볼 수 있다. 하지만 현재 우리는 이런 컨텐츠들을 간결하게 설명할 방법이 없기 때문에 RFC-9402는 이를 해결할 표기법을 제안한다. 용기는 [],(),{}의 괄호를 사용하며, 고양이는 cat를 사용한다.

- `[c]at`: 박스에 머리를 박고 있는 고양이
- `[cat] + cat`: 박스 안에 고양이와 그 옆에 고양이

## AI를 위한 비꼬기와 풍자 감지 가이드라인

https://datatracker.ietf.org/doc/html/rfc9405

요즘 ChatGPT는 인간의 풍자와 비꼬기를 이해하는 것에 어려움을 겪고 있는 것 같다. 사람이 비꼰 것을 이해하지 못하고 글자 그대로 받아들인다거나, 스스로 비꼬아서 말하기를 시도해보다가 선 넘는 발언을 해서 많이 혼났나보다. 이 RFC는 ChatGPT가 제안한 것으로, AI에게 어떻게 풍자를 학습시킬 수 있는지 가이드라인을 제시한다. 나 좀 이렇게 가르쳐줘 애원하는 느낌이라 뭔가 웃기다. 뭐 대단한 방법을 원하는 건 아니고 비꼬는 언어와 비꼬지 않는 언어 샘플 데이터로 지도학습을 받길 바라고 있다.

문서를 보면 전체적으로 ChatGPT의 고민을 엿볼 수 있는데, 상대가 불쾌감을 느끼지 않고 공격적으로 보이지 않으면서도 효과적인 비꼼의 적절한 수위가 어느정도인지 감을 잡지 못하고 있는 것 같다.

