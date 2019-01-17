---
title: Express.js에서 oauth로 서드파티 사용자 인증하기
tag: javascript
---

[Express.js](https://expressjs.com/)와 [Passport.js](http://passportjs.org/)를 이용해서 페이스북 계정을 인증해보자. 먼저 아래 과정을 통해 우리가 만든 웹 서버가 페이스북 oauth를 이용할 수 있게 한다.

1. [Facebook for Developer](https://developers.facebook.com)에서 새로운 App을 만든다.
2. 그 다음 Add product > Facebook login을 setup 한다.
3. 우측 메뉴에 있는 Facebook login의 setting 페이지에서 'Valid OAuth redirect URIs'에 'http://localhost:3000/login/facebook/callback'을 추가한다. Save changes를 누른다.

---

필요한 모듈은 다음과 같다.

```
npm install express passport passport-facebook
```

서버 객체를 만든다.

```js
const express = require('express');
const app = express();
```

passport에 facebook strategy를 사용한다. 아까 만든 App의 대시보드에서 App ID와 App Secret을 찾아서 `clientId`와 `clientSecret`에 입력한다.

인증되면 페이스북으로부터 accessToken, refreshToken과 사용자 정보를 가져온다. 이걸 적절하게 가공한 후에 리턴하면 `/login/facebook/callback` 라우트에서 `req.user`로 사용할 수 있다.

```js
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

passport.use(new FacebookStrategy({
  clientID: [YOUR_APP_ID],
  clientSecret: [YOUR_APP_SECRET],
  callbackURL: '/login/facebook/callback',
  profileFields: ['id', 'email', 'name'],
}, (accessToken, refreshToken, profile, done) => {
  const { id, email } = profile._json;
  const user = {
    provider: 'facebook',
    providerID: id,
    email: email,
  }
  return done(null, user);
}));
app.use(passport.initialize());
```

로그인을 수행할 route를 추가한다. `/login/facebook`으로 접속하면 페이스북이 호스팅하는 페이지로 이동해서 사용 허가를 요구할 것이다. scope는 앱의 권한 범위이고, 사용자에게 앱을 허가 받을때 요구하는 권한이 보여진다. 권한 목록은 [Permissions Reference - Facebook Login](https://developers.facebook.com/docs/facebook-login/permissions)에서 볼 수 있다.

`/login/facebook/callback`은 인증 허가 이후 리다이렉트되는 주소. 이 주소들은 화이트리스트로 관리하며, 위에서 'Valid OAuth redirect URIs'에 이 주소를 추가하지 않았다면 'URL Blocked' 에러가 뜰 것이다. 인증에 실패하거나 거부하면 failureRedirect로 이동한다. 성공하면 passport strategy에서 반환하는 데이터를 `req.user`로 이용할 수 있다.

```js
app.get('/login/facebook',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  })
);

app.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    session: false,
    failureRedirect: '/login/facebook',
  }), (req, res) => {
    return res.json(req.user);
  }
);
```

마지막으로 서버를 실행한다.

```js
const port = 3000;
app.listen(port, () => {
  console.log(('App is running at http://localhost:%d'), port);
});
```

이제 브라우저를 열고 http://localhost:3000/login/facebook 에 접속하자. 페이스북이 호스팅하는 페이지를 경유해야하기 때문에 curl등은 사용할 수 없다. 페이스북에 로그인하고 앱 사용 권한을 허가해주면 http://localhost:3000/login/facebook/callback 로 리다이렉트되면서 사용자 정보를 확인할 수 있다.

```
{
  "provider": "facebook",
  "providerID": "[YOUR_APP_ID]",
  "email": "[YOUR_FACEBOOK_EMAIL]"
}
```

[전체 코드 보기](https://gist.github.com/pueue/00e22514b0e27812cf781d6ee0caa9e0)