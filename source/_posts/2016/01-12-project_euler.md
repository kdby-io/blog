---
title: Project Euler Solutions(Python 3)
published: false
tag: algorithm
---

#### Problem 1
```python
def problem1():
    LIMIT = 1000
    total = 0

    for num in range(0, 1000):
        if num%3 == 0 or num%5 == 0:
            total += num
    return total
```

#### Problem 2
```python
def problem2():
    LIMIT = 4000000
    first, second, third = 1, 1, 0
    total = 0

    while third < LIMIT:
        third = first + second
        if third%2 == 0:
            total += third
        first, second = second, third
    return total
```

#### Problem 3
```python
def problem3():
    num = 600851475143
    div = 2

    while div < num:
        if num%div == 0:
            num = num // div
            div = 2
        else:
            div += 1
    return num
```

#### Problem 4
```python
def problem4():
    max = 0

    for first in range(1, 1000):
        for second in range(1, 1000):
            total = first * second
            if str(total) == str(total)[::-1]:
                if max < total:
                    max = total
    return max
```

#### Problem 5
```python
def problem5():
    LIMIT = 20
    primes = [1]
    for num in range(2, LIMIT+1):
        for i in range(len(primes)):
            if num%primes[i] == 0:
                num //= primes[i]
        if num is not 1:
            primes.append(num)
    print(primes)

    result = 1
    for p in primes:
        result *= p
    return result
```

#### Problem 6
```python
def problem6():
    LIMIT = 100

    sum_of_pow = sum(pow(num, 2) for num in range(1, LIMIT+1))
    pow_of_sum = pow(sum(num for num in range(1, LIMIT+1)), 2)
    return pow_of_sum - sum_of_pow
```

#### Problem 7
```python
def problem7():
    from math import sqrt

    COUNT = 10001
    num = 2
    while COUNT > 0:
        for p in range(2, int(sqrt(num))+1):
            if num != p and num % p == 0:
                num += 1
                break
        else:
            if COUNT == 1:
                print(num)
            COUNT -= 1
            num += 1
```

#### Problem 8
```python
def problem8():
    numbers = str(7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450)

    offset = 0
    max = 0

    while offset < len(numbers):
        fragment = numbers[offset:offset+5]
        total = 1
        for num in fragment:
            total *= int(num)
        if max < total:
            max = total
        offset += 1
    return max
```

#### Problem 9
```python
def problem9():
    from math import sqrt

    a, b = 1, 2
    done = False
    while not done:
        for a in range(1, b):
            c = sqrt(pow(a,2) + pow(b,2))
            if a+b+c == 1000:
                print('{} + {} = {}'.format(pow(a,2), pow(b,2), pow(c,2)))
                print('{} x {} x {} = {}'.format(a, b, c, a*b*c))
                done = True
        else:
            b += 1
```

#### Problem 10
```python
def problem10():
    from math import sqrt
    LIMIT = 2000000

    total = 0
    for num in range(2, LIMIT+1):
        for tester in range(2, int(sqrt(num))+1):
            if num % tester == 0:
                break
        else:
            total += num
    return total
```
