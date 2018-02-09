#include <bits/stdc++.h>
using namespace std;

int main(){
    bool cards[101];
    for(int i =1;i<101;i++){
        cards[i] = false;
    }
    for(int n = 2; n < 101; n++){
        for(int k=0; k < 101; k += (n - 1)){
            if (n + k > 102) break;
            cout << n+k << endl;
            cards[n + k] = (!cards[n + k]);
        }
    }
    for(int i=1; i <= 100; i++){
        if (cards[i + 1] == true)
            cout << i << endl;
    }
}