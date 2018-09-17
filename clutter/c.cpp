#include <bits/stdc++.h>
#include <cstdlib>
using namespace std;
int N;
int *A = new int[200000];
vector<long long> data;

int main(){
    cin >> N;
    long long x;
    long long total = 0;
    for(int i = 0; i < N; i++){
        cin >> x;
        data.push_back(x);
        x -= (i + 1);
        A[abs(x)]++;
    }
    auto maxIt = max_element(*A,*A+N);
    int maxIndex = std::distance(begin(&(*A), maxIt);
    for(int i =0;i<N;i++){
        total += abs(data[i] - (i+1) + maxIndex);
    }
    cout << total;
}