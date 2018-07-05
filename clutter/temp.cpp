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
typedef long long LL;

long N, K;
int cnt = 0;


int main ()
{
    cin >> N >> K;

    for(long a = 1; a <= N; a++){
        for(long b = 1; b <= N; b++){
            if (a >= K && a < b){
                cnt++;
            }
            else if (a % b >= K){
                cnt++;
            }
        }
    }
    cout << cnt;
    return 0;
}


Listing.create(
        abbreviation: "abbreviationsmart",
        address: "address000smart",
        host_name: "jigyousya_name(host_name)smart",
        is_contracted: true,
        lat: 3,
        lng: 3,
        listing_code: "listing_code00smart",
        listing_type: 2,
        name: "listing_namesmart",
        company_id: Company.last.id,
        location_info_id: LocationInfo.last.id
    )