---
tag: Things
title: 라즈베리파이에 Home Assistant를 설치하다
hidden: true
---

집에서 놀고 있는 라즈베리파이에 [hass.io](https://www.home-assistant.io/hassio/)를 설치한다.

내가 가지고 있는 라즈베리파이는 메모리가 512메가인 model B 버전이다. 이 모델은 와이파이가 없어서 유선랜을 연결해주어야 한다.

{% asset_img IMG_0551.jpg %}

내 방에 들어오는 인터넷 선은 바로 데스크탑으로 연결된다. 이걸 데스크탑 뿐만아니라 라즈베리파이에도 연결해야한다.

집에서 놀고 있는 iptime 공유기를 가져다가 스위칭허브 모드로 전환하고 연결한다.

{% asset_img IMG_0554.jpg %}

SD카드에 모델에 맞는 이미지를 다운받아 설치한다. 다른 모델의 이미지를 사용하면 라즈베리파이가 부팅이 되지 않는다.

{% asset_img ether.png %}

라즈베리파이에 SD카드와 이더넷 선을 꼽고 전원을 연결한다. 그리고 http://hassio.local:8123/ 에 접속하면

{% asset_img preparing-hassio.png %}

20분 정도 기다려 달라고 한다. 구형 모델이라서 그런지 30분 걸렸다.

계정을 생성.  이런 류의 컨트롤 시스템은 망 외부에서도 조작할 수 있도록 대부분 계정으로도 연동한다.

{% asset_img ha1.png %}

필립스 휴 브릿지를 연결.

{% asset_img ha2.png %}

이제 홈 어시스턴트를 통해서도 전구를 조작할 수 있다.

{% asset_img ha3.png %}