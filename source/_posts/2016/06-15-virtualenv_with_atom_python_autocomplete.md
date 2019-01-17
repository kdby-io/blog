---
title: Virtualenvwrapper와 Atom의 python-autocomplete 연결하기
tag: python
---
Atom의 python-autocomplete는 파이썬 구문의 자동완성을 도와주는 패키지다. 사용하는 파이썬의 경로를 설정해주면 site-package의 모듈까지 자동완성을 해준다.

설정에서 특정 파이썬 위치를 입력하면 해당 경로의 파이썬으로 자동완성을 제공하고, python-autocomplete는 프로젝트 폴더에 venv폴더가 있을 경우 이 폴더 내에 python을 참조하여 자동완성을 제공한다. 다만 virtualenvwrapper와 같이 프로젝트 폴더 외부에 가상환경 파일을 두는 경우 패키지 제작자는 3가지 해결책을 제시하고 있다.

1. Create symlink to venv from your project root
2. Add virtualenv folder as additional project root
3. User a virtualenv with the same name as the folder name of your project and use $PROJECT_NAME variable to set path to python executable.

나는 코드들을 dropbox 폴더 안에 놓고 쓰기 때문에 virtualenv 관련 파일들을 dropbox 폴더 외에 놓고 사용하는 것을 선호한다. 한 번만 세팅해두면 프로젝트에 관계없이 알아서 인식 될 수 있도록 3번을 선택했다.

python-autocomplete 설정에서 Python executable path에 아래 경로를 넣어준다.

```
/home/<USERNAME>/.virtualenvs/$PROJECT_NAME/bin/python3
```

단 virtualenv의 이름과 프로젝트 폴더의 이름이 같아야한다.
