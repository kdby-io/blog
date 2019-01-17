---
title: 중복되지 않는 아주 큰 랜덤 순열 생성하기
tag: 알고리즘
---
640x640 크기의 모든 이미지 작품을 전시하고 있는 가상의 박물관, [The Museum of Babel](http://museumofbabel.herokuapp.com/)을 구현하면서 순서 섞기에 관한 문제가 생겼다.

2^9830400개의 이미지가 비트순으로 정렬되어 있는데, 이 순서를 무작위로 섞어서 사용자가 작품번호 순서대로 감상해도 보여지는 이미지는 순서대로 보여지지 않게 해야한다. 그렇다고 무작정 난수를 뽑아내면 안된다. 중복이 있을 수 있기 때문이다. 모든 이미지는 단 하나의 고유한 작품번호를 가져야하고, 각각의 작품번호는 단 하나의 이미지를 가리켜야 한다. 즉 일대일대응(one-to-one) 관계다.

1. 매번 0 ~ 2^9830400-1 사이의 수 중 하나를 랜덤하게 뽑는데, 2^9830400번 뽑을 때까지 이전에 뽑았던 모든 수가 겹치지 않아야 한다.
2. 2^9830400번째로 뽑는 수는 첫번째로 뽑는 수와 동일해야 한다.

개수가 작을 경우 단순하게 배열에 넣어서 셔플링하거나, 하나씩 무작위로 뽑아내면서 지우는 방법을 쓸 수 있다. 하지만 2^27993600는 작은 수가 아니다. 배열은 쓸 수 없으니 작품번호를 연산해서 매칭되는 이미지를 바로 찾아내야한다.

github에 몇 개 있는 library of babel를 구현한 샘플코드들은 랜덤함수를 남발하는 눈속임에 불과했다.

구글링하면서 랜덤함수의 출력이 seed로 결정되는 [유사난수(pseudorandom number)](https://ko.wikipedia.org/wiki/%EC%9C%A0%EC%82%AC%EB%82%9C%EC%88%98)라는 사실을 알았다. 작품번호로 이미지를 찾고, seed로 난수를 만들고... 둘이 서로 비슷해 보이지만 역으로 이미지로 작품번호를 찾을 수도 있어야하고, 무엇보다 후자는 주기를 모르니 중복의 위험이 있다. seed값이 같으면 발생된 난수가 같다는 사실을 이용할 순 있겠지만, 그대로 사용할 수는 없다.

[How to Generate a Sequence of Unique Random Integers](http://preshing.com/20121224/how-to-generate-a-sequence-of-unique-random-integers/)는 소수(prime number)와 MOD 연산을 이용해서 중복되지 않는 유사난수 순열을 만드는 방법을 알려준다. 마음에 드는 해결책이였지만 2^27993600보다 작으면서 가장 큰 소수를 찾을 방법이 없어서 포기했다. 혹시 소수가 아니여도 되나 싶어서 계산해봤지만 역시 중복이 생겼다.

[LFSR](https://en.wikipedia.org/wiki/Linear_feedback_shift_register)는 카운터 회로를 코드로 구현한 것인데 bit가 9830400일 때의 Feedback polynomial는 찾을 수 없었다.

결국 일단은 **xor와 bit shifting**을 통해 유사난수 순열을 구현했다. 중복되지 않으면서 연산을 거꾸로하면 원래 값도 찾을 수 있다.

##### 2월 20일
XOR + SHIFT의 문제점은 시퀀스의 시작 위치는 바뀔 수 있지만 그 순서는 동일하다는 점이다. 즉 하나 이전 값과 하나 다음 값의 차이가 변함 없이 1인데, 이 차이를 이미지로 보여주면 그냥 아무 차이가 없이 보인다. 순서를 섞을 필요가 있다. [libraryofbabel.info](http://libraryofbabel.info/) 제작자인 [Jonathan Basile](https://twitter.com/JonotrainEB)에게 물어보니 자신은 [**Linear Congruential Generator**](https://en.wikipedia.org/wiki/Linear_congruential_generator)를 이용해서 구현했다고 했다. 위의 링크처럼 MOD를 이용하지만 꼭 나누는 숫자가 소수가 아니여도 중복이 발생하지 않는다. 자, 이제 LCG를 되돌리는 연산은 [링크](https://jazzy.id.au/2010/09/21/cracking_random_number_generators_part_2.html)에서 찾을 수 있다. 하지만 되돌리는 건 너무 느린데?

여러가지 PRNG 구현방법.

- [Full cycle](https://en.wikipedia.org/wiki/Full_cycle)
- [LFSR](https://en.wikipedia.org/wiki/Linear_feedback_shift_register)
- [BBS](https://en.wikipedia.org/wiki/Blum_Blum_Shub)
- [LCG](https://en.wikipedia.org/wiki/Linear_congruential_generator)
- [ICG](https://en.wikipedia.org/wiki/Inversive_congruential_generator)
- [CLCG](https://en.wikipedia.org/wiki/Combined_Linear_Congruential_Generator)
