---
title: 멀티부팅 환경에서 블루투스 사용하기
tag: ubuntu
---
[Roost Stand](http://roo.st/)와 함께 사용할 키보드가 필요하던 차에 아마존에서 블루투스 무선 키보드의 끝판왕이라고들 부르는 [Logitech k810](http://www.logitech.com/en-us/product/bluetooth-illuminated-keyboard-k810)을 한시적으로 저렴하게 판매하는 것을 보고 구매했다. 이상하게 한국에서의 가격이 비쌌기에 핫딜이 아니더라도 아마존에서 구매하는 편이 더 이득이다. 개인적으로 깔끔한 영문각인 키보드를 좋아하기에 이번 기회에 아주 기쁜 마음으로 질렀다.

개발할 때는 Ubuntu가 Windows보다 편하기에 랩탑에 Ubuntu 15.10과 Windows 10을 멀티부팅하여 사용하고 있는데, 매번 OS를 스위칭할 때마다 연결된 장치를 제거하고 페어링을 다시 해주어야 하는 문제가 있었다. k810의 경우 세가지 기기와 동시에 페어링할 수 있기에 Ubuntu에는 1번, Windows는 2번을 연결해서 사용하려고 하였지만, 똑같은 MAC주소가 페어링되면 앞에 것은 자동으로 페어링이 해제가 되는 듯했다.

구글링해서 [http://superuser.com/questions/422435/how-to-use-bluetooth-devices-under-two-different-operation-systems](http://superuser.com/questions/422435/how-to-use-bluetooth-devices-under-two-different-operation-systems)를 참조하여 문제를 해결할 수 있었다.

1. 먼저 양쪽 OS에서 블루투스를 한 번씩 페어링한다.
2. Ubuntu에서 `sudo -i`로 root 계정으로 전환한 후 `/var/lib/bluetooth/AA:AA:AA:AA:AA:AA/BB:BB:BB:BB:BB:BB`로 이동한다. AA는 랩탑의 블루투스 MAC 주소이고 BB는 페어링된 기기의 맥주소다.
3. `info`파일을 열어서 `[LinkKey]`의 32자리의 key값을 기억해둔다.  

```
[LinkKey]
Key=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
Type=4
PINLength=0
```
4. 블루투스 기기는 일단 끄고, Windows로 부팅해서 [psexec](https://technet.microsoft.com/en-us/sysinternals/bb897553.aspx)를 다운받고 관리자 권한으로 터미널을 열어 `psexec -s -i regedit.exe`를 입력해 레지스트리 편집기를 연다.
5. `HKEY_LOCAL_MACHINE/SYSTEM/ControlSet001/Services/BTHPORT/Parameters/Keys`로 내려가면 블루투스 기기의 ID를 찾을 수 있다. 해당 키를 마우스오른쪽 메뉴에서 `Modify Binary Data`로 열어준다.
6. 둘씩 짝지어진 16개의 hex 값을 볼 수 있다. 이 값을 지우고 3에서 기억해뒀던 32자리 key값을 옮겨적는다.
7. 레지스트리 편집기를 닫고, 블루투스 기기를 켜보자.
8. 연결됨!
