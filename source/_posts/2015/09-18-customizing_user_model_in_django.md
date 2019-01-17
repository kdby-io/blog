---
title: Django에서 User 모델 커스터마이징하기
tag: django
---
이메일로 로그인하는 앱을 만들고자 프로젝트 만들고 날리고를 몇 차례, 구글링과 django 문서를 통해 목적을 달성할 수 있었다. 문서에 나온 full example을 따라해보면 항상 migrate에 실패했는데, 검색하며 찾아낸 몇 가지 샘플코드들을 적용하여보니 작동하는 코드들이 있었다. 이 코드들을 보고나서 다시 문서를 보니까 '아 이게 그 소리였구나'가 감탄사로 나온다. 하지만 아직도 왜 full example 코드는 에러가 뜨는지 모르겠다.

django로 User 모델을 커스터마이징 하는 방법은 2가지가 있다.

1. django에서 제공하는 모델 확장해서 사용하기(AbstractUser,  UserManager)
2. 새로 모델 만들어 대체하기(AbstractBaseUser, BaseUserManager)

django는 두 가지 경우 모두 계정으로써의 기능을 구현할 수 있도록 클래스를 제공하여 준다. 구글링해보면 전자의 경우가 샘플코드가 많은데, 코드가 간단하고 이해하기도 쉽기 때문인 것 같다. 기존 모델을 상속해서 더 추가를 원하는 필드를 선언해주기만 하면 된다. 후자의 경우는 커스텀 모델에서 필요한 필드들을 직접 선언해주고, 필드와 관련된 함수들을 오버라이딩해주어야 한다.

계정으로 쓰일 모델을 직접 만들자.

```python
class User(AbstractBaseUser, PermissionsMixin):
```

AbstractBaseUser와 PermissionsMixin은 django에서 제공하는 클래스다. AbstractBaseUser는 계정 모델에 필요한 메소드들을 제공하고 있고, PermissionsMixin은 계정의 권한을 제어할 메소드를 제공한다.

필요한 필드들도 넣어 주자.

```python
email = models.EmailField(max_length=254, unique=True)
name = models.CharField(max_length=20, default=None, null=True, )
is_active = models.BooleanField(default=False)
is_staff = models.BooleanField(default=False)
```

비밀번호 필드와 마지막 접속 시간 필드는 위 클래스를 상속했다면 자동으로 삽입된다.
어떤 필드를 계정의 id로 할 것인지 선언하자.

```python
USERNAME_FIELD = 'email'
```

제공되는 메소드도 입맛에 맞게 고치면 된다.

```python
def get_full_name(self):
    return self.email
def get_short_name(self):
    return self.email
```

계정 생성을 담당하는 UserManager 모델도 만들자.

```python
class UserManager(BaseUserManager):
    def create_user(self, email, password, **kwargs):
    user = self.model(email=self.normalize_email(email), is_active=True, **kwargs)
    user.set_password(password)
    user.save()
    return user

def create_superuser(self, email,password, **kwargs):
    user = self.model(email=self.normalize_email(email), is_staff=True, is_superuser=True, is_active=True, **kwargs)
    user.set_password(password)
    user.save()
    return user
```

이제 User 모델에게 어떤 클래스가 Manager 역할을 할 것인지 알려주면 된다.

```python
class User(AbstractBaseUser, PermissionsMixin):
    ...
    objects = UserManager()
```

마지막으로 setting.py에서 아래 한 줄을 추가하여 주자.

```python
AUTH_USER_MODEL = "<YOUR_APP_NAME>.User"
```
