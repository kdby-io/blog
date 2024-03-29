---
title: 결제 서비스 선택하기
date: 2020-03-01 14:30:57
hidden: true
---
서비스에 결제 기능을 붙히기 위해 어느 결제 서비스가 적절할 지 찾아봤다. 해외 카드를 받을 수 있어야 하기 때문에 국내 결제 서비스는 고려도 하지 않았다. 요구사항은 이렇다.

* 한국 계좌나 호주 계좌로 송금할 수 있어야 한다
* 호주 계정 생성시 ID를 필수로 받지 않아야 한다. 나에겐 호주 계좌는 있지만, ID가 없다.
* 정기 결제를 지원해야 한다. 직접 구현해 본 경험은 있어서 만드려면 만들 순 있겠지만, 이미 기능을 제공한다면 그걸 그냥 이용하는게 좋다.
* 수수료가 낮을수록 좋다. 돈을 못 벌어도 요금을 지불해야하는 Chargebee같은 서비스는 제외.
* UI를 커스터마이징할 수 있으면 좋다. 완벽히 못한다면 최대한 할 수 있는게 좋다.

**Paypal**

수수료: 국내 결제일 때 2.9% + $0.30, 국외 결제일 때 4.4% + $0.30

국내 결제라는 말은 내 페이팔 계정과 결제 카드가 같은 국가여야 저 수수료라는 의미다.한국 내 결제가 아니다. 페이팔은 솔루션의 종류가 많다. 어느 것을 적용해야 적절한 지 보고 선택해야 하는데, 이게 너무 귀찮다. 사용자가 꼭 페이팔 계정이 있지 않아도 된다. 하지만 정기 결제 기능을 사용하려면 사용자가 반드시 paypal 유저여야 하는 것 같다. 문서만 봤을땐 RESTful API도 제공하는데, 페이팔이 제공하고 있는 데모는 전부 결제시 paypal hosted page를 통한다. 결국 UI는 커스터마이징할 수 없다.

**Stripe**

수수료: 2.9% + $0.30

지원하는 국가의 수가 적다. 하지만 호주 계정을 만들 때 ID를 받지 않는다. UI 커스터마이징도 거의 완벽하게 가능하다. 모든 것이 개발자 친화적이다. 문서가 매우 잘 되어있고, SDK도 깔끔하다. 결제 기능을 연동할 때 어떤 흐름으로 개발하는지 잘 알고 있는 것 같다.

**Billsby**

수수료: $50000까지는 무료. 이후부터 0.8%

신생 회사다. 오픈 전에 Product hunt에서 보고 뉴스레터를 등록했더니, 최근 베타 코드가 날아와서 이것도 고려해봤다. UI를 커스터마이징할 수 없었지만, 수수료가 너무 싸서 확인해봤더니 목록의 다른 회사와는 다르게 카드 정보를 다른 PG사를 통해 저장하고 있다. PG사가 아니라서 이런 방식으로 우회한 것 같다. 수수료를 연결된 PG사와 Billsby 양쪽 모두 내야하는 것인지 확실하지 않아서 보류했다.

**Braintree**

수수료: 미국계정 2.9% + $0.30. 호주계정 1.75% + $0.30 AUD

Stripe만큼 좋다. 그러나 호주 계정을 만들때도 ID를 필수로 입력 받는다.

**paddle**

수수료: 5% + $0.50

수수료도 비싼데, UI를 커스터마이징할 수 없다. Indie hackers에서는 Stripe를 쓰다가 Paddle로 넘어간 사람이 여러명 보이는데, 비싼 수수료에도 불구하고 이용하는 다른 장점이 있을지도 모르겠다.

**2checkout**

수수료: 정기 결제는 4.5% + $0.45

기능마다 수수료가 다르다. 비싼 수수료만 보고 리서칭 종료.

결제시 통화는 글로벌 결제의 표준으로 봐도 무방한 USD로 받기로 했다. 호주 계좌와 연동해서 Stripe를 사용할 경우에는 국내 계좌로 출금까지 USD -> AUD -> KRW로 두 번의 환전이 있다. 반면 Paypal을 사용한다면 Paypal USD 계좌에서 바로 출금할 수 있으므로 USD -> KRW로 한 번의 환전이 있다.

결국 Stripe를 써보기로 결정했다. 미국 외 결제 비율이 낮고, Paypal UI의 사용자 경험이 나쁘지 않다면 Paypal이 더 나은 선택일지도 모른다. 하지만 Paypal의 정기 구독 모델은 사용자에게 Paypal 계정을 만들도록 강제한다. 그래서 환전 수수료가 조금 더 나오더라도 사용자 경험을 완벽히 통제하는 게 더 낫다고 판단했다.