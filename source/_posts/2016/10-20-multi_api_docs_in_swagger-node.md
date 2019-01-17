---
title: swagger-node에서 여러 API 문서 다루기
tag: express
---
swagger-node로 프로젝트를 생성하면 swagger-express-mw를 사용하는 스켈레톤 프로젝트를 자동으로 셋업해준다. 여기에서 swagger-tools의 swagger-ui를 미들웨어로 추가하면 API 문서를 Swagger UI로 볼 수 있다.

이렇게 생성된 프로젝트는 다음과 같은 기본 값을 가진다.

`/api/swagger/swagger.yaml`을 swagger 문서로 사용한다.
Swagger UI의 URL은 `/docs`이고, swagger 문서의 URL은 `/api-docs`다.

여러개의 버전을 가진 API 문서를 위해선 아래의 기본값들을 수정해야한다. `app.js`에 아래와 같이 몇 가지 옵션을 추가해주면 swagger에서 여러 버전의 API 문서를 관리할 수 있고, 지금 어떤 버전의 API를 사용할지 고를 수 있다.

```js
// app.js
'use strict';

var util = require('util');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUI = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();

const API_VERSION = 'v1';

var config = {
  appRoot: __dirname, // required config
  swaggerFile: util.format('api/swagger/%s.yaml', API_VERSION), // which swagger file
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.runner.swagger.basePath = util.format('/api/%s', API_VERSION);
  app.use(SwaggerUI(swaggerExpress.runner.swagger, {
    swaggerUi: '/docs', // Swagger UI URL
    apiDocs: util.format('/%s', API_VERSION), // api document URL
  }));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, function() {
    console.log(util.format('Serve on port %d', port));
  });
});

module.exports = app; // for testing
```

Github에 스켈레톤 프로젝트를 만들었다.
[http://github.com/pueue/api-versioning-swagger-skeleton](http://github.com/pueue/api-versioning-swagger-skeleton)

실행시 `swagger project start` 대신 `node app.js`를 사용해주면 된다.
