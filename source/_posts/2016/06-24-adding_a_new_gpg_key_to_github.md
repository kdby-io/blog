---
title: GitHub에 GPG 키 추가하기
tag: github
---
1. 터미널을 열고 키를 생성한다.
```
$ gpg --gen-key
```

2. 대화형식으로 키 생성이 진행된다. 키 종류, 키 길이, 키 만료시간을 묻는데, 순서대로 `RSA and RSA`, `4096`, `0`로 답해준다.

3. 선택지를 확인한다.

4. Real name과 email address를 입력한다. comment는 그냥 비워둔다.

5. 입력값을 확인한 후, 사용할 비밀번호를 입력한다.

6. 랜덤 바이트 생성을 위해서 충분한 엔트로피가 만들어지면 키가 생성된다.

        gpg: key 9A5279A3 marked as ultimately trusted
        public and secret key created and signed.

7. 만들어진 키는 아래 명령어로 확인할 수 있다.

        $ gpg --list-secret-keys

8. 키를 출력한다.  

        $ gpg --armor --export 9A5279A3

9. [https://github.com/settings/keys](https://github.com/settings/keys)에서 `New GPG Key`를 누르고 앞에서 출력된 내용을 붙여넣는다.

10. `~/.gitconfig`에 아래 내용을 추가한다.  

        [commit]
            gpgsign = true
