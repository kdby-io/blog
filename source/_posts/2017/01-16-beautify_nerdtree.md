---
title: NERDTree 꾸미기
tag: vim
---
NERDTree는 Vim을 쓰는 사람에게 필수적인 플러그인이다. 사용자가 많은만큼 이와 관련된 플러그인 또한 많다. 그 중에서 투박한 NERDTree의 파일트리를 좀 더 시각적으로 괜찮게 바꿀 수 있는 플러그인 두 가지를 소개한다.

## vim-devicon
[vim-devicon](https://github.com/ryanoasis/vim-devicons)은 NERDTree에서 각 파일이름 왼쪽에 확장자에 맞는 아이콘을 표시해준다. 그 외에도 airline, ctrlP 같은 다른 플러그인에도 아이콘을 표시해준다.

#### 설치
아이콘이 제대로 표시되려면 먼저 [Nerd Font](https://github.com/ryanoasis/nerd-fonts)를 설치해야한다.

```sh
git clone https://github.com/ryanoasis/nerd-fonts
cd nerd-fonts
./install.sh
```

그다음 vim-devicon을 설치한다.

```
Plug 'ryanoasis/vim-devicons'
```

vim의 문자열 인코딩이 utf8이 아닌경우 설정해준다.

```
set encoding=utf8
```

마지막으로 사용하는 터미널에서 profile 글꼴을 Nerd Font중 하나로 바꾼다.

## git-nerdtree-syntax-highlight
[git-nerdtree-syntax-highlight](https://github.com/ryanoasis/git-nerdtree-syntax-highlight)는 NERDTree의 각 파일과 폴더에 색을 입혀준다.

#### 설치
```
Plug 'ryanoasis/git-nerdtree-syntax-highlight'
```

#### 설정
설치하면 기본적으로 아이콘만 하이라이트된다. 파일이름을 포함해서 하이라이트하고 싶으면 `~/.vimrc`에 다음을 추가하자.

```vim
let g:NERDTreeFileExtensionHighlightFullName = 1
let g:NERDTreeExactMatchHighlightFullName = 1
let g:NERDTreePatternMatchHighlightFullName = 1
```

