---
title: nodemon
tag: node
---
[nodemon](http://nodemon.io)은 실행중인 node 코드에 변경사항이 있으면 자동으로 해당 어플리케이션을 재시작해주는 어플리케이션이다. 웹 개발을 하는 경우, 코드를 수정하고 서버를 껐다가 다시 켜곤 하는데, nodemon을 사용할 경우 코드를 변경하고 저장하면 알아서 서버가 재시작된다.  
사용법은 간단하게 `node` 대신 `nodemon`을 써주면 된다. 실행 중에 `rs`를 타이핑하면 수동으로 재시작해준다.

```
$ nodemon app.js
```

`--watch` 옵션으로 변경사항을 감지할 파일이나 폴더를 추가해줄 수도 있고, `--ignore`로 제외할 목록을 설정할 수도 있다.

```
$ nodemon app.js --watch src
$ nodemon app.js --ignore build
```

node 외의 다른 프로그램을 실행할 때는 `--exec` 옵션을 이용한다. node로 개발하는 경우 es6, es7 코드를 [babel-node](https://babeljs.io/docs/usage/cli)로 실행하는데 nodemon과 함께 쓰려면 `--exec`을 쓰면 된다.

```
$ nodemon --exec babel-node app.js
$ nodemon --exec python script.py
```

[자세한 사용법은 문서! 문서를 보자!](https://github.com/remy/nodemon#nodemon)
