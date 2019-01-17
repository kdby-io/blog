---
title: Cursor based pagination
tag: database
---

다수의 데이터를 나눠서 보여주기 위해서 난 여태까지 offset 기반의 페이지네이션만 써왔다. 다른 방법이 있는지도 몰랐다.

## Offset based pagination

```sql
SELECT * FROM Posts ORDER BY id DESC LIMIT 0, 10; -- page 1
SELECT * FROM Posts ORDER BY id DESC LIMIT 10, 10; -- page 2
SELECT * FROM Posts ORDER BY id DESC LIMIT 20, 10; -- page 3
```

offset 기반 페이지네이션은 현재 내가 보고있는 페이지의 위치를 알 수 있는 장점이 있다. 다수의 페이지를 건너뛸 수도 있다. 게시판이나 블로그 같은 곳에서 많이 쓰인다. 페이지 하단에 현재 페이지 번호와 함께 다른 페이지로 이동할 수 있는 버튼들이 있다면 offset 기반의 페이지네이션을 사용한 것이다.

하지만 offset 기반의 페이지네이션은 페이지 이동 시 데이터가 중복되거나 생략될 수 있다. 게시판에서 내가 page 2를 보고 있는 중이라고 가정해보자. 그동안 누군가가 새 글을 올렸다. 이 때 page 3으로 이동했다면 데이터가 하나씩 밀린다. 그래서 이전 페이지의 마지막 글이 page 3에서도 보인다. 또 다른 예로, page 2를 보고 있는 중에 앞 페이지의 글이 지워졌다. 이 때 page 3으로 이동했다면 데이터가 땡겨진다. 그래서 원래 page 3에서 첫번째로 보였어야 할 글이 page 3에서는 보이지 않고 page 2로 다시 돌아가야 보인다.

이런 이유 때문에 offset 기반의 페이지네이션으로는 무한 스크롤등의 UI를 구현하기 어렵다. 하지만 변화하지 않는 데이터에서는 문제가 없다.

## Cursor Based Pagination

Cursor 기반 페이지네이션은 이런 문제를 해결해 준다. 현재 페이지의 첫 데이터와 마지막 데이터를 보고 '그 다음 X개', '그 이전 X개'의 데이터를 불러오는 방법이다. Cursor 기반 페이지네이션을 위해선 데이터 정렬과 탐색을 위한 column이 반드시 unique해야 한다. 중복될 수 있는 column으로 정렬할 경우 페이지 이동시 데이터가 생략될 수 있다. `created_at`과 같은 column을 쿼리에 이용하지 않는 이유다.

```sql
-- current page is showing [8, 7, 6]

SELECT * FROM Posts ORDER BY id DESC LIMIT 3; -- first page
SELECT * FROM (SELECT * FROM Posts WHERE id > 8 ORDER BY id ASC LIMIT 3) t ORDER BY id DESC; -- previous page
SELECT * FROM Posts WHERE id < 6 ORDER BY id DESC LIMIT 3; -- next page
```

cursor 기반 페이지네이션은 페이지 이동시 데이터의 흐름이 매끄럽다. 무한 스크롤도 쉽게 구현할 수 있다. 다만 현재 페이지의 위치를 알 수 없고, 다수의 페이지를 건너 뛸 수 없다.

## Improved cursor based pagination

위의 쿼리는 database의 `id`가 auto_increment의 특성을 가진 것을 이용해서, id가 높다면 더 최신 데이터라는 가정이 담겨있다. `id` 대신 연속성이 없는 column을 primary key로 사용하거나, 훗날 데이터 사이사이에 다른 데이터를 삽입할 가능성이 있어서 `id`로 정렬하면 안되는 경우가 있을 수 있다.

이런 경우 2개의 column으로 정렬과 탐색을 하는 cursor 기반 페이지네이션을 구현하면 된다.

```sql
/*
current page is showing [
  { id: 8, created_at: '2017-01-01 00:00:00' },
  { id: 7, created_at: '2017-01-01 00:00:00' },
  { id: 6, created_at: '2017-01-01 00:00:00' },
]
*/

SELECT * FROM Posts ORDER BY created_at DESC, id DESC LIMIT 3; -- first page

SELECT * FROM (
  SELECT * FROM Posts
  WHERE created_at > '2017-01-01 00:00:00' OR (created_at = '2017-01-01 00:00:00' AND id > 8)
  ORDER BY created_at ASC, id ASC LIMIT 3
) t ORDER BY created_at DESC, id DESC; -- previous page

SELECT * FROM Posts
WHERE created_at < '2017-01-01 00:00:00' OR (created_at = '2017-01-01 00:00:00' AND id < 6)
ORDER BY created_at DESC, id DESC LIMIT 3; -- next page
```

`id` 대신 다른 primary key를 사용하고 있다면 쿼리에서 해당 부분만 바꿔주자.
