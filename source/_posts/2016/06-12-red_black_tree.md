---
title: Red-Black TREE
tag: 자료구조
---
과제용으로 만든 red-black 트리. remedy()에 꽤 시간을 많이 들인게 아까워서 기록차 포스팅한다. 아! 이제보니 insert만 있고 remove는 없네...


```cpp
/* RED-BLACK TREE */
enum Color { BLACK, RED };

template <typename E>
class Node {
public:
    int key;
    E *element = NULL;
    Color color = BLACK;
    Node *parent = NULL;
    Node *left = NULL;
    Node *right = NULL;
};

template <typename E>
class RBTree {
public:
    Node<E> *root;

    RBTree() {
        root = new Node<E>();
    }

    Node<E>* grandparent(Node<E> *p) {
        if ((p != NULL) && (p->parent != NULL) && (p->parent->parent != NULL))
            return p->parent->parent;
        else
            return NULL;
    }
    Node<E> *uncle(Node<E> *p) {
        Node<E>* g = grandparent(p);
        if (g == NULL)
            return NULL;
        if (p->parent == g->left)
            return g->right;
        else
            return g->left;
    }

    Node<E>* find(int key) {
        // key 값이 일치하는 Node를 찾는다.
        // 없는 경우, 해당 key를 삽입시 위치할 leaf노드를 반환.
        Node<E> *p = root;
        while (p->element != NULL) {
            if (p->key < key)
                p = p->right;
            else if (p->key > key)
                p = p->left;
            else
                break;
        }
        return p;
    }

    int depth(int key) {
        Node<E> *p = root;
        int depth = 0;
        while (p->element != NULL) {
            if (p->key < key) {
                p = p->right;
                depth++;
            }
            else if (p->key > key) {
                p = p->left;
                depth++;
            }
            else
                break;
        }
        return depth;
    }

    int insert(int key, E* e) {
        Node<E> *p = find(key);
        if (p->element != NULL) //이미 있는 경우
            return 0;

        p->key = key;
        p->element = e;
        p->color = RED;
        p->left = new Node<E>();    p->left->parent = p;    // 새로운 left 생성 및 연결
        p->right = new Node<E>();    p->right->parent = p;    // 새로운 left 생성 및 연결
        remedy(p);    // 무결점 검사
        return 1;
    }

    void remedy(Node<E> *p) {
        if (p == root) {
            p->color = BLACK;
            return;
        }
        if (uncle(p) == NULL)
            return;
        if (p->color == RED && p->parent->color == RED) {    // 더블 레드 발생
            if (uncle(p)->color == BLACK) { // restructuring
                Node<E> *a = grandparent(p);
                Node<E> *b = p->parent;
                Node<E> *c = p;
                if (a == NULL || b == NULL || c == NULL)
                    return;
                if (p->parent->left == p) {
                    if (grandparent(p)->left == p->parent) { // /형태
                        /* 서브 트리 */
                        //Node<E> *t1 = c->left;
                        //Node<E> *t2 = c->right;
                        Node<E> *t3 = b->right;
                        //Node<E> *t4 = a->right;

                        // 1. 재배열
                        b->parent = a->parent;
                        if (a != root) {
                            if (a->parent->left == a)
                                a->parent->left = b;
                            else
                                a->parent->right = b;
                        }
                        //b->left = c;
                        b->right = a;    a->parent = b;

                        // 2. 나머지 서브트리 붙이기
                        //c->left = t1;
                        //c->right = t2;
                        a->left = t3;    t3->parent = a;
                        //a->right = t4;

                        // 3. 색깔 바꾸기
                        a->color = RED;
                        b->color = BLACK;
                        c->color = RED;

                        if (a == root)
                            root = b;
                    }
                    else {// >형태
                        /* 서브 트리 */
                        //Node<E> *t1 = a->left;
                        Node<E> *t2 = c->left;
                        Node<E> *t3 = c->right;
                        //Node<E> *t4 = b->right;

                        // 1. 재배열
                        c->parent = a->parent;
                        if (a != root) {
                            if (a->parent->left == a)
                                a->parent->left = c;
                            else
                                a->parent->right = c;
                        }
                        c->right = b;    b->parent = c;
                        c->left = a;    a->parent = c;

                        // 2. 나머지 서브트리 붙이기
                        //a->left = t1;
                        a->right = t2;    t2->parent = a;
                        b->left = t3;    t3->parent = b;
                        //b->right = t4;

                        // 3. 색깔 바꾸기
                        a->color = RED;
                        b->color = RED;
                        c->color = BLACK;

                        if (a == root)
                            root = c;
                    }
                }
                else {
                    if (grandparent(p)->left == p->parent) { // <형태
                        //Node<E> *t1 = b->left;
                        Node<E> *t2 = c->left;
                        Node<E> *t3 = c->right;
                        //Node<E> *t4 = a->right;

                        // 1. 재배열
                        c->parent = a->parent;
                        if (a != root) {
                            if (a->parent->left == a)
                                a->parent->left = c;
                            else
                                a->parent->right = c;
                        }
                        c->right = a;    a->parent = c;
                        c->left = b;    b->parent = c;

                        // 2. 나머지 서브트리 붙이기
                        //b->left = t1;
                        b->right = t2;    t2->parent = b;
                        a->left = t3;    t3->parent = a;
                        //a->right = t4;

                        // 3. 색깔 바꾸기
                        a->color = RED;
                        b->color = RED;
                        c->color = BLACK;

                        if (a == root)
                            root = c;
                    }
                    else { // \형태
                        //Node<E> *t1 = a->left;
                        Node<E> *t2 = b->left;
                        //Node<E> *t3 = c->left;
                        //Node<E> *t4 = c->right;

                        // 1. 재배열
                        b->parent = a->parent;
                        if (a != root) {
                            if (a->parent->left == a)
                                a->parent->left = b;
                            else
                                a->parent->right = b;
                        }
                        b->left = a;    a->parent = b;
                        //b->right = c;

                        // 2. 나머지 서브트리 붙이기
                        //a->left = t1;
                        a->right = t2;    t2->parent = a;
                        //c->left = t3;
                        //c->right = t4;

                        // 3. 색깔 바꾸기
                        a->color = RED;
                        b->color = BLACK;
                        c->color = RED;

                        if (a == root)
                            root = b;
                    }
                }
            }
            else if (uncle(p)->color == RED) { // recoloring
                uncle(p)->color = BLACK;
                p->parent->color = BLACK;
                grandparent(p)->color = RED;
                if (grandparent(p) == root)
                    grandparent(p)->color = BLACK;
                remedy(grandparent(p));
            }
        }
    }
};
```
