---
title: Neovim
tag: vim
---

Neovim은 기존 Vim의 코드가 너무 방대하고 오래되어서 생기는 유지보수 측면에서의 문제점을 해결하기 위한 프로젝트다. Vim에선 플러그인이 작동할 때 프로그램이 잠시 멈추는데, 플러그인이 많은 경우엔 상당히 거슬린다. Git gutter랑 linter 몇 개만 깔아도 입력모드에서 노말모드로 전환할 때 Vim이 프리징되는 것을 볼 수 있다. Neovim은 이 문제를 비동기로 해결한다.

### 설치

MacOS에서는 brew로 간단하게 설치할 수 있다.

```sh
brew install neovim/neovim/neovim
```

Ubuntu에서는 Python이 설치되어 있어야하고, apt에 repository를 추가하고 설치하면 된다.

```sh
sudo apt install software-properties-common
sudo apt install python-software-properties
sudo apt-get install python-dev python-pip python3-dev python3-pip

sudo add-apt-repository ppa:neovim-ppa/unstable
sudo apt update
sudo apt install neovim
```

### 설정

이미 Vim을 쓰고 있다면 심볼릭 링크로 기존 설정을 그대로 Neovim에 사용할 수 있다.

```sh
mkdir ~/.config
ln -s ~/.vim ~/.config/nvim
ln -s ~/.vimrc ~/.config/nvim/init.vim
```

Neovim의 플러그인은 Python이나 Ruby뿐만 아니라 다양한 언어로 쓰일 수 있다. 이는 플러그인과의 통신을 msgpack을 이용해서 하기 때문이다. 'neovim node client'등으로 검색하면 원하는 플러그인을 작동하게 할 수 있는 클라이언트를 설치할 수 있다. `:CheckHealth`로 Python2, Python3, Ruby 클라이언트의 설치여부를 확인할 수 있다. Python 클라이언트는 pip로 설치한다.

```sh
pip2 install neovim
pip3 install neovim
```

### 플러그인

보통 Vim에서 플러그인을 사용하면 플러그인 매니저로 관리한다. 여러가지 플러그인 매니저가 있는데, 난 Paul이 추천해준 [Vim-Plug](https://github.com/junegunn/vim-plug)를 쓴다. 플러그인 설치와 업데이트를 병렬로 수행해 속도가 빠르다. 개발자가 한국분이신데 국내 개발자 중에 Github star 숫자가 독보적이다.

```sh
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

Vim-Plug를 설치했다면 `init.vim`을 수정해주자. `call Plug#begin`과 `call plug#end`를 삽입하고 이 사이에 다음과 같이 플러그인을 적어주면 된다.

```vim
call plug#begin('~/.local/share/nvim/plugged')

Plug 'scrooloose/nerdtree'

call plug#end()
```

목록을 추가하고 저장했다면 `:so %`로 설정파일을 재시작하고, `:PlugInstall`을 실행하면 적어둔 플러그인이 설치된다. [Vim Awesome](http://vimawesome.com)에서 어떤 플러그인이 인기 있는지 볼 수 있다.

비동기적 프로세싱만으로도 Neovim을 사용할 이유는 충분한데, 다양한 언어로 플러그인을 만들 수 있다는 점 때문에 앞으로가 기대된다.
