---
title: rbenv - 루비 버전 관리
tag: ruby
---
[rbenv](https://github.com/rbenv/rbenv)는 루비의 버전 관리 툴이다. 이를 이용하면 한 컴퓨터에서 여러 버전의 루비를 설치할 수 있고, 손쉽게 원하는 버전으로 전환할 수 있다.

문서에도 잘 설명되어 있지만 간단하게 `$PATH` 앞에 경로를 추가해 rbenv를 통해 설치한 루비가 실행되도록 하는 원리다. rbenv는 이 경로를 shim이라고 한다.

## 설치

github에서 코드를 받아 컴파일한다.

```sh
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ cd ~/.rbenv && src/configure && make -C src
```

macOS는 Homebrew로 컴파일없이 설치할 수 있다.

```sh
$ brew update
$ brew install rbenv
```

설치하고나면 사용하고 있는 쉘 설정 파일에 경로를 추가해주자.

```sh
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
$ echo 'eval "$(rbenv init -)"' >> ~/.zshrc
```

## 사용

### Ruby 설치

```sh
# 사용할 수 있는 rbenv 명령어 목록
$ rbenv

# rbenv로 설치할 수 있는 ruby 버전 목록
$ rbenv install -l

# 특정버전 ruby 설치
$ rbenv install 2.3.1

# 설치된 ruby 버전 목록
$ rbenv versions
```

명령어 목록에 install, uninstall이 없다면 [ruby-build](https://github.com/rbenv/ruby-build)를 설치하자.

### 버전 전환

```sh
# 현재 폴더의 ruby 버전 설정
# 현재 폴더에 버전이 명시된 .ruby-version파일을 생성한다
$ rbenv local 2.3.1

# global ruby 버전 설정
# ~/.rbenv/version에 버전이 명시된다
$ rbenv global 2.3.1

# 현재 쉘의 ruby 버전 설정
# 환경변수 $RBENV_VERSION에 버전이 명시된다
$ rbenv shell 2.3.1
```

세 명령어의 우선순위는 shell > local > global 순이다. 예를들어 global로 1.0, local로 2.0을 설정했어도, shell에서 3.0을 사용하면 3.0의 루비를 사용한다.

설정을 해제하고 싶다면 `--unset`을 이용한다.

```sh
$ rbenv local --unset
$ rbenv shell --unset
```

### Rehash

bundler와 같이 실행가능한 gem을 설치한 경우 `~/.rbenv/versions/*/bin/*`를 갱신시켜주어야한다.

```sh
$ rbenv rehash
```
