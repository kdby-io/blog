---
title: Socket.io로 카운터 만들기
tag: javascript
---

웹에서 전통적인 HTTP는 클라이언트가 요청을 하면 서버가 응답하는 방법으로 통신한다. 내 게시글에 새 댓글이 달렸는지 확인하기 위해서 새로고침을 눌러봐야 한다. 즉, 요청-응답이 끝나면 연결을 종료하기 때문에 클라이언트가 다시 요청하기 전까지는 서버에서 업데이트된 데이터를 받아올 수 없다. <small>내놓으라고 하기 전까진 스스로 토해내지 않는게 마치 통신사 환급금을 보는 것 같다.</small> 

**정말로?**

CS 전공을 한 사람이라면 네트워크 실습시간에 소켓 통신으로 TCP와 UDP 채팅 프로그램을 만들어 본 적이 있을 것이다. TCP는 연결된 상대가 데이터를 잘 받았는지 확인하고, UDP는 받던 말던 그냥 보내고 본다는 차이가 있으며, TCP는 전화, UDP는 편지에 비유했던 것으로 기억한다. TCP와 UDP에서 중요한 것은 서버와 클라이언트가 소켓으로 연결되어 있다는 점이다. 소켓은 상대방의 주소(목적지)를 담고 있기 때문에 내가 누구에게 데이터를 보내야하는지 명확하다. 소켓으로 연결되어 있다면 서로 누구나 먼저 데이터를 보낼 수 있다. HTTP는 TCP 프로토콜을 이용한다. 그러니까 웹에서도 TCP를 이용하여 소켓 통신을 할 수 있다. HTML5의 웹소켓(Web Socket)으로 말이다.

[Socket.io](https://socket.io)는 웹소켓을 이용하여 서버와 클라이언트 간의 실시간 양방향 통신을 가능케하는 라이브러리다. Socket.io가 지원하는 브라우저 목록을 보면 웹소켓을 지원하는 브라우저가 아닌 것들이 있다. 웹 소켓을 사용할 수 없는 브라우저는 다른 방식을 이용해서 마치 웹소켓이 작동하는 것처럼 보이게 한단다. 많은 Socket.io를 주제로 작성된 블로그 포스트들이 이 내용을 언급하고 있지만 난 그 내용이 어디있는지 찾지 못했다.

---

Socket.io를 이용해서 간단한 웹 애플리케이션을 만들어보자. 채팅 프로그램을 구현한 튜토리얼은 이미 아주 많으니까 나는 더 단순한 앱을 만들어보려고 한다.

{% asset_img socket-io-1.png %}

버튼에 숫자가 적혀있다. 버튼을 누르면 숫자가 1 증가한다. 이 숫자는 모든 클라이언트에게 동일하게 보인다. 내가 버튼을 눌러서 숫자를 높히면, 이 웹에 접속 중인 다른 사람들도 실시간으로 숫자가 늘어나는 것을 볼 수 있다.

먼저 간단하게 Node.js 프로젝트를 만들고 필요한 모듈을 설치한다.

```sh
mkdir socket.io-test
cd socket.io-test && npm init
npm install -S express socket.io
```

`server.js` 파일을 만들고 서버를 작성한다.

```js
// server.js
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

let count = 0

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client.html');
})

io.on('connection', socket => {               // 1
  console.log('user connected: ', socket.id)
  socket.emit('get count', count)             // 2
      
  socket.on('increase count', () => {         // 3
    console.log('increase!', count)
    count++
    io.emit('get count', count)               // 4
  })

  socket.on('disconnect', () => {             // 5
    console.log('user disconnected: ', socket.id)
  })
})

http.listen(3000, () => {
  console.log('server on!')
})
```

클라이언트가 접속하면, 현재 소켓의 id를 콘솔에 출력하고 `count` 값을 전달한다. 이 클라이언트가 'increase count' 이벤트를 발생시키면, `count` 값을 1 증가하고 접속중인 모든 클라이언트에게 'get count' 이벤트로 증가한 `count` 값을 전달한다. 이 클라이언트가 접속을 종료하면, 현재 소켓의 id를 콘솔에 출력한다.

1. `on()`은 어떤 이벤트가 발생했을 때 어떤 함수를 실행할지 정의하는 메소드다. 클라이언트가 서버에 접속하면 'connection' 이벤트가 발생한다. 함수의 파라미터로는 해당 연결에 대한 Socket이 넘어온다.
2. `emit()`는 이벤트를 발생시키는 메소드다. 현재 소켓에 'get count' 이벤트를 발생시킨다. `count`를 이벤트 데이터로 보낸다.
3. 소켓으로부터 'increase count' 이벤트가 발생하면 `count`를 증가시킨다.
4. 모든 연결된 모든 소켓에 증가한 `count`를 담은 'get count' 이벤트를 발생시킨다.
5. 클라이언트가 접속을 종료하면 해당 소켓으로부터 'disconnect' 이벤트가 발생한다.

다음은 클라이언트를 만들자. 파일명은 `client.html`.

```html
<!-- client.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Counter</title>
  </head>
  <body>
    <button id="count" value="increase"></button>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script>
      const socket = io()
      $('button').click(e => {
        socket.emit('increase count')   // 1
        e.preventDefault()
      })
      socket.on('get count', count => { // 2
        $('#count').text(count)
      })
    </script>
  </body>
</html>
```

1. 버튼을 누르면 'increase count' 이벤트를 발생한다.
2. 서버로부터 'get count' 이벤트가 발생하면 `count`를 받아 버튼 라벨에 반영한다.

완성했다. 이제 `node server.js`로 서버를 실행한다. 브라우저 두 개를 띄우고 http://localhost:3000로 접속해서 버튼을 눌러보자.