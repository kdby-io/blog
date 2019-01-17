---
tag: Things
title: Hass.io에 커스텀 도메인 SSL 인증서를 설치하다
---

# 문제

![](2018-09-20-19-36-42.png)

Hass.io에서 [DuckDNS 애드온](https://www.home-assistant.io/addons/duckdns/)은 SSL 인증서도 쉽게 설치할 수 있도록 해준다. 하지만 커스텀 도메인을 지원하지 않는다. DuckDNS를 쓰면서 커스텀 도메인으로 접속하면 이런 메시지를 볼 수 있다. SSL 인증서의 도메인과 접속하려는 도메인이 다르기 때문이다.

# 해결

커스텀 도메인의 SSL 인증서를 만들면 해결할 수 있다. [Let's Encrypt 애드온](https://www.home-assistant.io/addons/lets_encrypt/)을 설치한다. 애드온 문서 앞에 DuckDNS 애드온과 함께 사용하지말라는 경고는 무시한다.

시작하기 앞서 hass.io가 설치된 머신의 80번 포트가 포트포워딩되어있는지 확인한다.

Let's Encrypt 애드온의 config를 수정한다. `certfile`과 `keyfile`의 이름을 변경한다. DuckDNS 애드온의 파일명과 같으면 안된다. 

```json
{
  "email": "your@email.com",
  "domains": [
    "your.domain"
  ],
  "certfile": "custom-fullchain.pem",
  "keyfile": "custom-privkey.pem"
}
```

config를 저장하고, 애드온을 실행한다. log에서 진행상황을 볼 수 있다.

인증서 설치가 끝났으면, DuckDNS 애드온을 제외하고 ssl 인증서를 사용하는 모든 설정을 위에서 변경한 키 파일로 수정한다.

```yaml
# configuration.yaml
http:
  base_url: https://your.domain
  ssl_certificate: /ssl/custom-fullchain.pem
  ssl_key: /ssl/custom-privkey.pem
```

마지막으로 홈 어시스턴트를 재부팅한다. 인증서를 갱신하는 자동화도 마련하는 것으로 정말 끝.

# 원인

DuckDNS이 Let's Encrypt로부터 SSL 인증서를 발급받기 위해 사용하는 도메인 소유 증명 방법으로는 커스텀 도메인을 소유 증명할 수 없기 때문이다.

[Let's Encrypt 문서](https://letsencrypt.org/docs/integration-guide/#picking-a-challenge-type)를 보면 도메인 소유를 증명하는 방법은 dns-01과 http-01이 있다. DuckDNS는 dns-01을 사용하여 SSL 인증서를 발급받는데, 이를 위한 api도 제공하며 DuckDNS 애드온도 이 api를 사용한다.

dns-01로 커스텀 도메인을 인증하려면 Let's Encrypt로부터 토큰을 받고, 도메인 제공 서비스에서 DNS TXT 레코드를 추가해야한다.  Let's Encrypt 애드온은 http-01로 도메인을 증명하기 때문에 별다른 추가 작업 없이도 커스텀 도메인도 소유를 증명할 수 있다.