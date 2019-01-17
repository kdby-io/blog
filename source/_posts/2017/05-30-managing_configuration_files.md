---
title: 설정파일(dotfiles) 관리하기
tag: tool
---
매번 개발환경을 세팅할 때마다 gist에 백업해놓은 dotfile들을 복사해서 경로에 수동으로 붙혀넣는 것이 귀찮았다. 겨우 파일 세 개지만, 가끔씩 gist에 백업된 파일과 변경사항을 확인해서 백업해놓는 것도 성가신 작업이었다.

[Tmuxp](https://github.com/tony/tmuxp)를 쓰면서 관리해야할 파일이 네 개가 되었다... 이젠 gist에 수동으로 저장할 게 아니라 [repository](https://github.com/pueue/dotfiles)를 하나 만들어서 관리하려고 한다.

```sh
#!/bin/zsh


# Copy config files

## Oh my zsh
ln -sf .zshrc ~/.zshrc

## Tmux
ln -sf .tmux.conf ~/.tmux.conf

## Neovim
mkdir -p ~/.config/nvim
ln -sf init.vim ~/.config/nvim/init.vim

## Tmuxp
mkdir -p ~/.tmuxp
ln -sf tumblbug-backend.yaml ~/.tmuxp/tumblbug-backend.yaml # tumblbug backend


# Restart
source ~/.zshrc
```

dotfile을 한 곳에 모아두고 위처럼 스크립트를 만들어서 실행해주면 백업된 설정파일들이 로컬에 적용되도록 했다. 각 파일을 심볼릭링크로 연결했다. 이렇게하면 사용중인 dotfile들의 변화를 이 repository 폴더에서 추적할 수 있다. 하드링크 대신 심볼릭링크로 연결한 이유는 repository 폴더를 지울 수 없게 하기 위해서다. 폴더를 지우면 'No file or directory' 에러가 날테니까 개발환경에선 이 폴더가 항상 요구될 것이고, dotfile들이 정말로 추적되고 있나 확인할 필요가 없어진다.

dotfiles로 검색해봤더니 이미 비슷한 방식을 구현한게 많네 ㅋㅋ
