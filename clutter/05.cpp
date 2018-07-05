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

short N;
mp ans;

double dfs(long water){
    if (water >= F) return 0.0;
    long limit = min((water*E)/100,F-water);

    long remain,salt = loINF;
    REP(i,(limit / D)+1){
        remain = ((limit - (D*i)) % C);
        if (salt > remain) salt = remain;
    }
    salt = limit - salt;
    double val = ((double)salt*100)/((double)(water+salt));
    ans[val] = make_pair(water+salt,salt);
    if (salt == limit) return val;
    else return max({val,dfs(water+100*A),dfs(water+100*B)});
}
int main(void){
	cin >> A >> B >> C >> D >> E >> F;
	double percent = max(dfs(100*A),dfs(100*B));
	cout << ans[percent].first << " "<< ans[percent].second << endl;
	return 0;
}