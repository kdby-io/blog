---
title: Docker-compose의 몇 가지 팁
tag: tool
---

### docker-compose build 시 image의 이름
`docker-compose build`하면 생성된 이미지의 이름은 `folderName_{serviceName}`이다. `docker build -t`로 이미지를 다른 이름으로 생성했는데, `docker-compose up`하면 이미지를 또 생성하길래 어리둥절 했는데, 이미지의 네이밍이 원인이였다.

### 로컬 혹은 외부에서 database container에 접근
아래와 같이 docker-compose.yml에서 database container의 포트를 포워딩하면 된다.

```
mysql:
  ports:
   - "12312:3306"
```

### mysql container 셋업 시 database를 원하는대로 초기화하려면
docker-compose.yml이 있는 소스코드 루트에 `docker-entrypoint-initdb.d` 폴더를 만들고, 여기에 `*.sql`파일을 만들어 원하는 쿼리를 넣어준다.  
그리고 docker-compose.yml에 volumes을
```
mysql:
  volumes:
    - ./docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d
```
