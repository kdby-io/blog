---
tag: coding
title: 잘 설계된 DynamoDB 앱은 단 하나의 테이블만 필요합니다
---

어그로 오지는 이 제목은 아마존 문서에서 발췌했다.

## 데이터를 어떻게 정의할 것인가

DynamoDB를 처음 접하면서 가장 어려웠던 부분이다. NoSQL 테이블 디자인에 대해 구글링하면서 가장 많이 봤던 문장은

> 서비스를 먼저 디자인하고 어떤 쿼리가 필요한지 파악한 후 테이블을 디자인한다.

서비스를 운영하면 기능을 변경하거나 추가할 필요가 생긴다. RDB라면 필요한 데이터를 미리 정의해두고 쿼리만 바꾸면서도 기능을 변경하거나 추가할 수 있다. 그런데 저 문장은 마치 NoSQL은 고정된 디자인을 가진 서비스를 위한 데이터베이스라고 말하는 듯 했다.

며칠을 고민하면서 겨우 실마리를 찾은 것 같다. RDB를 쓸 때도 필요하다면 쿼리를 바꾸는 것보다는 비용이 더 들긴 하지만 스키마를 변경할 수 있다. NoSQL을 쓰는 것도 필요하다면 쿼리를 바꿀 수 있다. 다만 이미 저장된 데이터는 기존 쿼리에 최적화되어 있으니, 새로운 형태의 데이터를 저장하면 된다. RDB와는 다르게 중복 저장도 환영이다.

자원이 많다면 가능한 모든 쿼리를 고려하여 데이터를 중복 저장할 수 있다. RDB를 사용할 때처럼 하나의 데이터타입에 하나의 테이블을 사용할 수도 있다. 그러나 DynamoDB의 과금 정책상 이 방법은 효율적이지 않다.

## 데이터를 어떻게 저장할 것인가

이제 간단한 게시판 서비스를 하나의 테이블만으로 만들 것이다. 물론 코드는 한 줄도 없고, 과정 속에서 서로 다른 형태의 데이터가 어떻게 하나의 테이블에 저장될 것인지 설명한다.

---

## 1:1

> STORY: 사용자는 이메일로 계정을 생성하고 로그인할 수 있다

사용자 정보를 저장할 테이블을 하나 구상한다.

| id (PK) | createdAt (SK) | email          | hashed_password |
| ------- | -------------- | -------------- | --------------- |
| USER-1  | createdAt      | user@email.com | password        |

'id' 속성의 `USER-1`은 데이터의 타입도 함께 포함한다. 이것은 하나의 테이블에서 서로 다른 데이터를 구별하기 위한 방법으로 아래와 같은 형태를 가진다.

```
[DATA_TYPE]-[IDENTIFIER]
```

다음으로 이메일을 사용자 데이터와 따로 저장하기로 했다고 하자. 이제 새로운 데이터 형태를 하나의 테이블에 저장한다.

| id (PK) | createdAt (SK) | email          | hashed_password |
| ------- | -------------- | -------------- | --------------- |
| USER-1  | createdAt      | EMAIL-1        | password        |
| EMAIL-1 | email.com      | user@email.com |

`USER`와 `EMAIL`은 1:1 관계다. 특정 사용자의 이메일을 불러오려면 먼저 `USER-1`을 쿼리하여 `EMAIL-1`을 얻고, 다시 `EMAIL-1`을 쿼리하여 'user@email.com'을 얻는다.

하나의 테이블에 다른 데이터 형태가 있다보니 각 속성의 명칭과 내용이 다를 수 있다. 속성명을 일반화하자. NoSQL은 스키마가 정해져있지 않으니 새로운 속성이 필요한 데이터라면 얼마든지 속성을 추가할 수 있다.

| PK      | SK        | Data           | hashed_password |
| ------- | --------- | -------------- | --------------- |
| USER-1  | createdAt | EMAIL-1        | password        |
| EMAIL-1 | email.com | user@email.com |

`USER-x`로 이메일을 찾을 수 있지만, 이미 가입한 사용자가 맞는지 확인하려면 이메일로도 사용자를 찾을 수 있어야 한다. 이메일로 사용자를 찾을 수 있도록 GSI 추가한다.

| PK (GSI-SK) | SK        | Data (GSI-PK)  | hashed_password |
| ----------- | --------- | -------------- | --------------- |
| USER-1      | createdAt | EMAIL-1        | password        |
| EMAIL-1     | email.com | user@email.com |


```psudo
# Find email by user
email_id = SELECT Data FROM TABLE WHERE PK="USER-1"
email = SELECT * FROM TABLE WHERE PK="EMAIL-1"

# Find user by email
user_id = SELECT id FROM GSI WHERE Data="user@email.com"
```

---

## 1:N

> STORY: 사용자는 게시글을 작성할 수 있다

새로운 데이터타입 `POST`의 형태는 아래와 같다.

| PK (GSI-SK) | SK        | Data (GSI-PK) |
| ----------- | --------- | ------------- |
| POST-1      | createdAt | post body     |

사용자가 여러 `POST`를 가질 수 있도록 `POST`의 'Data'에 `USER` 키를 저장한다.

| PK (GSI-SK) | SK        | Data (GSI-PK) | Body      |
| ----------- | --------- | ------------- | --------- |
| USER-1      | createdAt | EMAIL-1       |
| POST-1      | createdAt | USER-1        | post body |
| POST-2      | createdAt | USER-1        | post body |

```psudo
# Find user id by post
user_id = SELECT Data FROM TABLE WHERE PK="POST-1"

# Find post ids by user
post_ids = SELECT PK FROM GSI WHERE Data="USER-1"
```

### 다중 종속

> STORY: 모든 게시글은 카테고리로 분류할 수 있다

카테고리 데이터타입 `CATEGORY`도 `POST`와 1:N 관계가 있다. 하지만 `POST` 타입의 'Data'는 `USER`의 외부키를 저장하는 용도로 쓰이고 있기 떄문에 위의 디자인은 사용할 수 없다.

**관계에 대한 새로운 데이터타입**을 만든다. 기존 'Data'에 외부키는 새로운 관계 데이터로 옮긴다.

| PK (GSI-SK)     | SK            | Data (GSI-PK) | Body      |
| --------------- | ------------- | ------------- | --------- |
| USER-1          | createdAt     | EMAIL-1       |
| CATEGORY-1      | category name |               |
| POST-1          | createdAt     |               | post body |
| USER-1:POST     | createdAt     | POST-1        |
| CATEGORY-1:POST | createdAt     | POST-1        |

관계 데이터타입의 'id' 속성 포맷은 다른 데이터타입과 명확하게 구별된다. 이것은 하나의 테이블에서 서로 다른 데이터를 구별하기 위한 방법으로 아래와 같은 형태를 가진다.

```
[PARENT_ID]:[CHILD_DATA_TYPE]
```

`USER-1:POST`는 `USER-1`이 소유한 `POST`에 대한 정보를 가지고 있다. 만약 `USER-1`이 `POST-2`도 소유하고 있다면 이런 데이터를 추가한다.

| PK (GSI-SK) | SK        | Data (GSI-PK) |
| ----------- | --------- | ------------- |
| USER-1:POST | createdAt | POST-2        |

```psudo
# Find user id by post
user_id = SELECT PK FROM GSI WHERE Data="POST-1" AND PK=begins_with("USER")

# Find category id by post
category_id = SELECT PK FROM GSI WHERE Data="POST-1" AND PK=begins_with("CATEGORY")

# Find post ids by user
post_ids = SELECT Data FROM TABLE WHERE PK="USER-1:POST"

# Find post ids by category
post_ids = SELECT Data FROM TABLE WHERE PK="CATEGORY-1:POST"
```

### 데이터 상태

> STORY: 게시글은 발행되지 않은 채로 저장할 수 있다

`POST`는 아직 발행하지 않은 'DRAFT'와 발행한 'PUBLISHED'의 2가지 상태가 있다. 정렬키 앞에 콜론(':')으로 구분하여 상태를 저장한다.

| PK (GSI-SK) | SK                 | Data (GSI-PK) | Body |
| ----------- | ------------------ | ------------- | ---- |
| USER-1      | createdAt          | EMAIL-1       |
| POST-1      | createdAt          | post body     |
| POST-2      | createdAt          | post body     |
| USER-1:POST | DRAFT:createdAt    | POST-1        |
| USER-1:POST | PUBLISHEDcreatedAt | POST-2        |

```psudo
# Find draft post ids by user
[ draft_post_ids ] = SELECT Data FROM TABLE WHERE PK="USER-1:POST" AND SK=begins_with("DRAFT")
```

### 별칭

> STORY: 게시글은 질문과 답변 두 가지로 나눠진다.

사용자는 2가지 종류의 게시글을 소유하는데, `USER-1:POST`같은 방식은 소유한 게시글의 종류를 나눌 수 없다. 별칭을 사용하여 동일한 데이터 타입 간의 관계도 다르게 표현할 수 있다.

| PK (GSI-SK)     | SK                  | Data (GSI-PK) | Body |
| --------------- | ------------------- | ------------- | ---- |
| USER-1          | createdAt           | EMAIL-1       |
| POST-1          | DRAFT:createdAt     | post body     |
| POST-2          | PUBLISHED:createdAt | post body     |
| USER-1:question | DRAFT:createdAt     | POST-1        |
| USER-1:answer   | PUBLISHED:createdAt | POST-2        |

```psudo
# Find draft question post ids by id
[ draft_question_ids ] = SELECT Data FROM TABLE WHERE PK="USER-1:question" and SK=begins_with("DRAFT")
```

---

## N:M

> STORY: 사용자는 게시글은 태그를 추가할 수 있다

태그와 게시글은 N:M의 관계다. 위의 1:N 모델을 응용하면 N:M 관계를 쉽게 표현할 수 있다.

| PK (GSI-SK) | SK        | Data (GSI-PK) | ... |
| ----------- | --------- | ------------- | --- |
| POST-1      | createdAt | post body     |
| TAG-1       | createdAt | tag name      |
| POST-1:tag  | createdAt | TAG-1         |
| POST-1:tag  | createdAt | TAG-2         |
| POST-2:tag  | createdAt | TAG-1         |
| TAG-1:post  | createdAt | POST-1        |
| TAG-1:post  | createdAt | POST-2        |
| TAG-2:post  | createdAt | POST-2        |

---

이 글의 제목과는 다르게 위의 디자인은 분명한 한계점이 있다. 데이터 모델을 추가하는 확장은 쉽게 할 수 있지만, 쿼리의 종류를 다양하게 할 수 없는 문제가 있다. 복잡한 어플리케이션에서는 분명 바로 쓰기 어려울 것이다.

## 단일 테이블은 괜찮다

하나의 테이블을 사용하는 DynamoDB 앱은 **모든 프로비저닝 요소를 공유**한다. 동시에 쓰이는 최대의 양만 파악한다면 쉽게 프로비저닝할 수 있다.

DynamoDB는 동시에 얼마나 많이 읽고 쓸 수 있을 것인지 설정한 양(이런걸 보통 프로비저닝이라고 한다)만큼 과금한다. 아마존에선 이것을 읽기 용량 유닛(RCU), 쓰기 용량 유닛(WCU)으로 부른다. RCU와 WCU는 테이블마다 설정해야한다.

테이블을 여러개 만들면 각각의 테이블마다 프로비저닝이 필요하고 아마존은 이 개수만큼 과금한다. 서비스 운영 초기에는 어떤 테이블이 얼마만큼의 프로비저닝이 필요한지 알 수 없다. 거의 접근하지 않는 테이블이라도 반드시 프로비저닝해야하고, 이는 과금의 요소가 된다.

## 단일 테이블은 별로다

**낭비되는 인덱싱 데이터**가 있을 수 있다. 앞선 예제에서 'Data'의 값으로 식별자가 아닌 값이 존재하는 항목은 인덱싱 테이블에서 쓸 모 없는 파티션키가 될 수 있다.

또 **관리의 어려움**도 동반할 수 있다. 각각의 데이터 형태와 정의를 다른 곳에 마련해야한다. 여러 사람 혹은 여러 팀이 협업하는 경우, 각 데이터의 접근을 코드에서 제한할 필요가 있다.

---

DynamoDB의 문서엔 단일 테이블을 사용한 예와 복수 테이블을 사용한 예가 공존한다. 나처럼 NoSQL에 생소한 사람들은 단일 테이블 예제가 더욱 낯설텐데, 이 글을 보고 도움이 되었으면 좋겠다.