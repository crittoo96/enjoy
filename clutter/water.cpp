#include <bits/stdc++.h>
#define REP(i,n) for (long i=0;i<(n);i++)
#define FOR(i,a,b) for (long i=(a);i<(b);i++)
#define RREP(i,n) for(long i=n;i>=0;i--)
#define RFOR(i,a,b) for(long i=(a);i>(b);i--)
#define dump1d_arr(array) REP(i,array.size()) cerr << #array << "[" << (i) << "] ==> " << (array[i]) << endl;
#define dump2d_arr(array) REP(i,array.size()) REP(j,array[i].size()) cerr << #array << "[" << (i) << "]" << "[" << (j) << "] ==> " << (array[i][j]) << endl;
#define dump(x)  cerr << #x << " => " << (x) << endl;
#define CLR(vec) { REP(i,vec.size()) vec[i] = 0; } 
#define llINF (long long) 9223372036854775807
#define loINF (long) 2147483647
#define shINF (short) 32767
#define SORT(c) sort((c).begin(),(c).end())
#define DEBUG

using namespace std;
typedef vector<long> VI;
typedef vector<VI> VVI;
typedef pair<long,long> pr;
typedef map<double,pr> mp;

typedef map<string, bool> mb;

mb notes;

short N;
int total = 0;

int main(void){
    cin >> N;
    string t;

    REP(i, N){
        cin >> t;

        auto itr = notes.find(t);
        if( itr != notes.end() ) {
            notes[t] = true;
        } else {
            notes[t] = !notes[t];
        }

    }

    for(auto itr = notes.begin(); itr != notes.end(); ++itr) {
        if (itr->second){
            total++;
        }
    }

    cout << total;

    return 0;
}