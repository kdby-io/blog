---
title: 2bytes 정수 배열에 12bits 정수 저장하기
tag: 알고리즘
---
커피를 한 잔 밖에 마시지 않은 어느 비오는 날의 삽질. 메모리 제한이 2MB인 수업 과제에서 필요한 정수 배열의 크기를 10,000,000이 아닌 1,000,000으로 잘못 봐서 시작된 삽질이다. unsigned short는 2bytes, 백만 개면 딱 2MB다. 메모리 제한을 넘지 않게 하려면 배열 크기를 줄일 필요가 있었는데, 과제에서 요구하는 배열에 저장되는 정수는 어떤 경우에도 1500을 넘지 않으니 bit는 12개만 있으면 충분했다.

unsigned short 3개마다 12bits 4개가 들어갈 수 있으니 index 번호 변환은 간편하게 _/4*3_ 해주면 된다.

```c
unsigned short arr[10000000/4*3];

void store(int index, unsigned short value) {
    int chunk_num = (index/4)*3;
    switch (index%4) {
        case 0:
            arr[chunk_num] = (value << 4) | (arr[chunk_num] & 0x000F);
            break;
        case 1:
            arr[chunk_num] = (arr[chunk_num] & 0xFFF0) | (value >> 8);
            arr[chunk_num+1] = ((value & 0x00FF) << 8) | (arr[chunk_num+1] & 0x00FF);
            break;
        case 2:
            arr[chunk_num+1] = (arr[chunk_num+1] & 0xFF00) | (value >> 4);
            arr[chunk_num+2] = ((value & 0x000F) << 12) | (arr[chunk_num+2] & 0x0FFF);
            break;
        case 3:
            arr[chunk_num+2] = (arr[chunk_num+2] & 0xF000) | (value);
            break;
    }
}

unsigned short load(int index) {
    int chunk_num = (index/4)*3;
    unsigned short value;
    switch (index%4) {
        case 0:
            value = (arr[chunk_num] >> 4);
            break;
        case 1:
            value = ((arr[chunk_num] & 0x000F) << 8) | (arr[chunk_num+1] >> 8);
            break;
        case 2:
            value = ((arr[chunk_num+1] & 0x00FF) << 4) | ((arr[chunk_num+2] & 0xF000) >> 12);
            break;
        case 3:
            value = (arr[chunk_num+2] & 0x0FFF);
            break;
    }
    return value;
}
```

원래는 배열은 물론이고 10,000,000이란 숫자도 필요없는 다른 알고리즘으로 답을 찾고 있었는데, 놓친 케이스가 뭔지 도저히 찾을 수가 없어서 이런식으로 요행을 노려봤다. 어쨌거나 삽질한 게 아까워서 기록.
