#include <bits/stdc++.h>
using namespace std;


string binary(int N){
    stringstream ss;
    ss << bitset<32>(N);
    string result = ss.str();
    while(true){
        if (result[0] != '0'){
            break;
        }else {
            result.erase(result.begin());
        }
    }
    return result;
}

string oct(int N){
    stringstream ss;
    ss << oct << N;
    return ss.str();
}

bool is_kaibun(string N){
    bool result = true;
    for(int i = 0; i< N.length(); i++){
        if (N[i] != N[N.length() - 1 - i]){
            result = false;
        }
    }
    return result;
}
int main(){
    int N = 11;
    bitset<32> n(N);
    while(true){
        if (is_kaibun(to_string(N)) && is_kaibun(oct(N)) && is_kaibun(binary(N)) ){
            break;
        }
        N += 2; // 奇数のみを探せば良いので計算量が半分になる
    }
    cout << N << endl;
}
