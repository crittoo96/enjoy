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
#define SORTDESC(c) sort((c).begin(), (c).end(), greater<short>());
#define DEBUG

using namespace std;
typedef vector<long> VI;
typedef vector<VI> VVI;
typedef pair<long,long> pr;
typedef map<double,pr> mp;
typedef vector<short> vs;
typedef vector<char, bool> vc;

short W, H;
vc s;

void dfs(short pos){
    if ((pos + 1 % W != 0 & s[pos + 1].first == '.'){
        
    }
    s[pos - 1]
    s[pos - W]
    s[pos + W]
}
int main(void){
    cinn >> H >> W;
    char t;
    REP(i,H * W){
        cin >> t;
        s.push_back(make_pair(t, false));
    }
    
	return 0;
}