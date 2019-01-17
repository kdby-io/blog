---
title: Express.js에서 JWT로 사용자 인증하기
tag: javascript
---

[JWT(JSON Web Token)](https://jwt.io/introduction)은 정보를 안전하게 전달하는 방법이다. 이때 안전하다는 말은 정보가 타인에게 노출되지 않고 전달된다는 의미가 아니다. 수신자가 받은 정보가 원하는 발신자로 부터 온 것이 맞는지, 전달 도중 누군가에 의해 내용이 바뀌지는 않았는지를 검증할 수 있다는 의미다. JWT는 토큰의 노출을 가정하고 만들어졌다. 전달되는 정보를 암호화하지도 않는다. 그래서 중요한 정보는 JWT로 전달하면 안된다.

JWT는 Header, Payload, Signiture로 구성된다. **Header**는 토큰의 메타정보를 가진다. **Payload**는 전달할 정보를 가진다. **Signiture**는 Header와 Payload를 암호화한 내용을 가진다. 

서버에서 JWT를 받았을 때 header와 payload를 signiture와 바교하여 이 토큰을 믿을 수 있는지 알 수 있다. 서버에서 발행한 토큰을 서버에서 검증하기 때문에 signiture를 만들 때 사용하는 암호키를 외부에 노출할 필요가 없다.

JWT를 이용한 사용자 인증 절차는 아래와 같다.

1. Client에서 username과 비밀번호를 server에 전달. (Login)
2. 로그인이 성공하면 서버에서 JWT​를 반환.
3. Client는 매 request마다 ​이 JWT를 함께 server에 전달.
4. Server는 JWT를 검증하고 request를 수행.

---

[Express.js](https://expressjs.com/)와 [Passport.js](http://passportjs.org/)를 이용해서 사용자 인증을 해보자. 특정 사용자의 비밀번호 변경 request가 왔을 때 이를 수행하는 예제다.

먼저 필요한 모듈을 설치한다.

```
npm install express body-parser passport passport-jwt jsonwebtoken
```

서버에서 사용할 Database는 단 하나의 사용자 객체다.

```js
const user = {
  id: 1,
  username: 'test',
  password: '123'
};
```

JWT의 signiture를 위한 암호키를 정의한다. 

```js
const SECRET = 'SECRET';
```

서버 객체를 만들고 body-parser를 사용한다. 새로운 비밀번호가 request의 body로 담겨 전달될 것이기 때문에 body-parser가 필요하다.

```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
```

로그인을 수행할 route를 추가한다. 로그인에 실패하면 401을 반환하고, 로그인에 성공하면 토큰을 반환한다. 토큰은 위에서 정의한 비밀키로 만들어진다. 토큰의 만료기한을 발행일로부터 하루로 한다. 토큰의 payload에는 id와 username을 담아서 반환한다.

```js
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== user.username || password !== user.password) {
    return res.status(401).end(); // login failed
  }
  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1d' });
  return res.json({ accessToken: token });
});
```

passport에 jwt strategy를 사용한다. payload에 담긴 id가 데이터베이스에 있는 id와 일치하면 토큰이 인증된다. [토큰을 추출하는 방법](https://github.com/themikenicholson/passport-jwt#extracting-the-jwt-from-the-request)에는 여러가지가 있으나, 예제에서는 request header에 'Authorization'키에서 토큰을 추출한다.

```js
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: SECRET
}, (payload, next) => {
  if (payload.id !== user.id) {
    next(null, false);
  } else {
    next(null, user);
  }
}));
app.use(passport.initialize());
```

비밀번호 변경 route를 추가한다. `passport.authenticate('jwt', { session: false })`로 이 route의 request를 jwt strategy로 검사한다.

```js
app.put('/users/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Authorization
  if (req.params.userId != req.user.id) {
    return res.status(403).end();
  }

  const newPassword = req.body.password;
  user.password = newPassword;

  return res.status(200).json({ result: 'success' });
});
```

서버를 실행한다.

```js
const port = 3000;
app.listen(port, () => {
  console.log(('App is running at http://localhost:%d'), port);
});
```

이제 서버에 로그인을 요청하면 토큰을 반환한다.

```sh
curl -X POST \
-H 'Content-Type: application/json' \
-d '{ "username": "test", "password": "123" }' \
http://localhost:3000/login

# -> {"accessToken":"[ACCESS_TOKEN]"}
```

이 토큰을 request 'Authorization' header에 넣고 비밀번호를 바꿔보자. 토큰 앞에 'JWT'를 넣어 토큰의 타입을 전달해야 한다.

```sh
curl -X PUT \
-H 'Content-Type: application/json' \
-H 'Authorization: JWT [ACCESS_TOKEN]' \
-d '{ "password": "123456" }' \
http://localhost:3000/users/1

# -> {"result":"success"}
```

[전체 코드 보기](https://gist.github.com/pueue/a5d57392387befdc0a79848b9e060c12)