---
title: 파이썬 버전 관리 - pyenv
tag: python
---
[pyenv](https://github.com/pyenv/pyenv)는 파이썬의 버전 관리 툴이다. 이를 이용하면 한 컴퓨터에서 여러 버전의 파이썬을 설치할 수 있고, 손쉽게 원하는 버전으로 전환할 수 있다.

pyenv는 루비의 버전 관리 툴인 [pyenv](https://github.com/pyenv/pyenv)를 fork했다. pyenv와 사용법이 거의 동일하다.

## 설치

github에서 코드를 받아 설치한다.

```sh
$ git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

macOS는 Homebrew로 컴파일없이 설치할 수 있다.

```sh
$ brew update
$ brew install pyenv
```

설치하고나면 사용하고 있는 쉘 설정 파일에 경로를 추가해주자.

```sh
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(pyenv init -)"' >> ~/.zshrc
```

## 사용

### Python 설치

```sh
# 사용할 수 있는 pyenv 명령어 목록
$ pyenv

# pyenv로 설치할 수 있는 ruby 버전 목록
$ pyenv install -l

# 특정버전 python 설치
$ pyenv install 2.3.1

# 설치된 python 버전 목록
$ pyenv versions
```

### 버전 전환

```sh
# 현재 폴더의 python 버전 설정
# 현재 폴더에 버전이 명시된 .python-version파일을 생성한다
$ pyenv local 3.6.0

# global python 버전 설정
# ~/.pyenv/version에 버전이 명시된다
$ pyenv global 3.6.0

# 현재 쉘의 python 버전 설정
# 환경변수 $PYENV_VERSION에 버전이 명시된다
$ pyenv shell 3.6.0
```

세 명령어의 우선순위는 shell > local > global 순이다. 예를들어 global로 1.0, local로 2.0을 설정했어도, shell에서 3.0을 사용하면 3.0의 Python을 사용한다.

설정을 해제하고 싶다면 `--unset`을 이용한다.

```sh
$ pyenv local --unset
$ pyenv shell --unset
```

### Rehash

실행가능한 python 패키지를 설치한 경우 `~/.pyenv/versions/*/bin/*`를 갱신시켜주어야한다.

```sh
$ pyenv rehash
```
