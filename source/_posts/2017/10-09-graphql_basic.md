---
title: GraphQL 기초
tag: web
---

추석 전 마지막 스프린트 진행이 생각보다 빨라서 enhancement로 API 서버에 GraphQL을 구성했다.

GraphQL은 API 쿼리 랭귀지다. RESTful한 API는 endpoint마다 출력결과 형태가 고정되어서, API client는 필요한 데이터를 위해 API를 여러번 호출하거나, 필요없는 데이터까지 받아올 수 밖에 없는 경우가 많다. GraphQL은 API client가 원하는 데이터를 원하는 모양으로 출력할 수 있게 한다.

API client 입장에서 GraphQL을 이용하여 어떻게 요청하는지부터 알아보자. 서버가 어떻게 만들어지는지, 데이터를 어떻게 불러오는지는 지금 몰라도 좋다. 왼쪽과 같은 GraphQL 쿼리를 POST body로 서버에 요청하면, 오른쪽 데이터가 그 응답으로 반환된다. 쿼리와 결과의 모양을 보자.

<table>
<td>
<div markdown="1">
```sh
query {
  hero {
    name
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```
</div>
</td>
</table>

GraphQL API를 사용하는 입장에서는 원하는 모양 그대로 요청하면 되니 아주 직관적이다. 데이터를 읽는 요청을 query라 하고, 데이터를 변경하는 요청을 mutation이라 한다. 

# Query

query는 데이터를 불러오는 구문이다. RESTful API에서의 `GET` 메소드에 해당한다.

<table>
<td>
<div markdown="1">
```sh
{
  human(id: "1000") {
    name
    height(unit: FOOT)
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "human": {
      "name": "Luke Skywalker",
      "height": 5.6430448
    }
  }
}
```
</div>
</td>
</table>

처음 예제와 다르게 시작 부분에 `query`가 생략되었다. query문의 경우는 생략이 가능하고, mutation문일 경우는 명시 해주어야 한다. `human`, `name`, `height` 등 필요한 리소스의 **field**를 특정하여 응답 데이터의 형태를 구성할 수 있다. field에는 마치 함수처럼 **argument**를 전달할 수도 있다.

field는 리소스 그 자체가 될 수도 있고, 리소스의 property가 될 수도 있다. 어떤 field들이 있는지, 어떤 field에 어떤 argument를 쓸 수 있는지는 서버 사이드에서 정의한다.

# Mutation

mutation은 데이터를 변경하는 구문이다. 리소스를 생성하는 구문과 수정하는 요청 모두 mutation를 사용 할 수 있다. RESTful API에서의 `POST`와 `PUT` 혹은 `FETCH`에 해당한다. REST에서 http 요청 메소드와 CRUD의 관계는 걍제성 없는 약속과 같듯, GraphQL에서도 query로 데이터를 변경할 수는 있다. 하지만 GraphQL이 `POST` 메소드만 사용하기 때문에 해당 요청이 데이터 변경임을 명시적으로 하기 위해 mutation을 사용하자.

<table>
<td>
<div markdown="1">
```sh
mutation {
  updateHuman(id: "1000", input: {
    name: "Pueue"
  }) {
    name
    height(unit: FOOT)
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "updateHuman": {
      "name": "Pueue",
      "height": 5.6430448
    }
  }
}
```
</div>
</td>
</table>

해당 요청이 `mutation`임을 명시적으로 나타냈다. `updateHuman`은 2개의 argument를 받는다. 이 mutation은 `id`로 human을 찾아서 `input`의 내용대로 변경한다. mutation이 어떤 argument를 받을지와 어떻게 작동할지 역시 서버에서 정의한다. 그 다음 query와 마찬가지로 어떤 형태로 데이터를 반환할지 명시한다.

---

지금까지는 GraphQL API를 어떻게 이용하는지 봤다. 이번엔 GraphQL API가 어떻게 만들어지는지 보자. 

GraphQL 서버는 schema와 resolver로 이루어진다. schema는 query와 mutation을 정의하고, 어떤 field에 어떤 하위 field가 있는지를 정의한다. resolver는 field의 데이터를 불러오는 방법을 정의한다. resolver는 GraphQL 그 자체의 영역은 아니다. GraphQL을 사용할 수 있게 해주는 여러 구현체(라이브러리)들이 있어서, 여기에 맞춰 코드를 작성해야 한다.

# Schema

schema 정의는 root object부터 시작한다. root object는 query와 mutation을 가지며 mutation은 필수가 아니다.
```sh
schema {
  query: Query
  mutation: Mutation
}
```

`query`는 `Query` 타입이고, `mutation`은 `Mutation` 타입이다. 이 두 타입은 직접 정의해야 하며 타입 명이 꼭 `Query`나 `Mutation`일 필요는 없다. `Query`는 어떻게 정의할 수 있을까?

```sh
type Query {
  player(id: ID!): Player
}
```

위의 정의는 다음과 같다. `Query` 타입은 `player` field가 있다. `player`는 `Player`타입이고 `id`를 argument로 받는다. 그리고 `id`는 `ID`타입이고 `null`이 아니다.

모든 field와 argument에는 타입이 있다. GraphQL에서 타입의 종류는 2가지로 Scalar 타입과 Object 타입이 있다. Scalar 타입은 이미 정의된 최소 단위의 데이터 타입을 말한다. `Int`, `Float`, `String`, `Boolean`, `ID`가 Scalar 타입이며 `ID` 타입은 object의 캐싱을 위해 사용된다. Object 타입은 field들을 가진 데이터 타입으로 이 field들 또한 Scalar 타입이거나 Object 타입이다. Object 타입은 직접 정의해주어야 하며, 여기선 `Query`와 `Player`가 Object 타입이다. 필요한 Object들을 마저 정의하자.

```sh
type Player {
  id: ID!
  name: String!
  team: Team
}

type Team {
  id: ID!
  name: String!
  players: [Player]!
}
```

타입 뒤에 `!`는 해당 데이터가 null이 아님을 나타낸다. `[Player]`처럼 Array 타입을 정의할 수도 있다.

위에도 언급했듯 query와 mutation은 데이터 변경을 명시화해준다는 것 외에는 차이가 없으니 `Mutation` 타입 정의는 생략하겠다. (작동 방식에 차이가 좀 있지만 몰라도 상관없음)

위와 같이 구성된 GraphQL 서버를 다음과 같은 구문으로 사용할 수 있다.

<table>
<tr>
<td>
<div markdown="1">
```sh
{
  player(id: 100) {
    name
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "player": {
      "name": "Pueue"
    }
  }
}
```
</div>
</td>
</tr>
<tr>
<td>
<div markdown="1">
```sh
{
  player(id: 100) {
    name
    team {
      id
    }
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "player": {
      "name": "Pueue",
      "team": {
        "id": 99
      }
    }
  }
}
```
</div>
</td>
</tr>
<tr>
<td>
<div markdown="1">
```sh
{
  player(id: 100) {
    name
    team {
      players {
        name
      }
    }
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "player": {
      "name": "Pueue",
      "team": {
        "players": [
          {
            "name": "Pueue"
          }
        ]
      }
    }
  }
}
```
</div>
</td>
</tr>
</table>

심지어 이런 짓도 가능하다.

<table>
<td>
<div markdown="1">
```sh
{
  player(id: 100) {
    team {
      players {
        team {
          players {
            team {
              id
            }
          }
        } 
      }
    }
  }
}
```
</div>
</td>
<td>
<div markdown="1">
```json
{
  "data": {
    "player": {
      "team": {
        "players": [
          {
            "team": {
              "players": [
                {
                  "team": {
                    "id": 99
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }
}
```
</div>
</td>
</table>

요청 구문에서 제일 하위 field들은 모두 Scalar 타입임에 주목하자.