#include <bits/stdc++.h>
#define REP(i,n) for (int i=0;i<(n);i++)
#define FOR(i,s,e) for (int i=s;i<(e);i++)
#define All(v) (v).begin(),(v).end()
#define mp(a,b) make_pair(a,b)
#define pb(a) push_back(a)
using namespace std;
typedef long long llint;
typedef pair<int, int> P;
const int MOD = (int)1e9 + 7;
const int INF = 999999999;
 
int W, H;
char grid[52][52];
int min_cost[52][52];
 
int bfs(int sx, int sy, int gx, int gy)
{
    const int vx[] = {0, 1, 0, -1}, vy[] = {1, 0, -1, 0};
    memset(min_cost, -1, sizeof(min_cost));
    
    queue<P> Q;
    Q.emplace(sx, sy);
    min_cost[sx][sy] = 0;
    
    while(!Q.empty()) {
        auto p = Q.front(); Q.pop();
        REP(i, 4) {
            int nx = p.first + vx[i], ny = p.second + vy[i];
            if(nx < 0 || ny < 0 || nx >= W || ny >= H) continue;    // 場外
            if(min_cost[nx][ny] != -1) continue;    // コスト確定済
            if(grid[ny][nx] == '#') continue;       // 壁
            // cout << nx << " " << ny << "\n";
            min_cost[nx][ny] = min_cost[p.first][p.second] + 1;
            if(nx == gx && ny == gy) return min_cost[gx][gy];
            Q.emplace(nx, ny);
        }
    }
    return -1;
}
 
int main(){
    cin.tie(0);
    ios::sync_with_stdio(false);
 
    cin >> H >> W;
    int white = 0;
    REP(i, H)REP(j, W){
        cin >> grid[i][j];
        if(grid[i][j] == '.') white++;
    }
    int route = bfs(0, 0, W-1, H-1);
    if(route == -1) puts("-1");
    else cout << white - route - 1<< "\n";
    
    return 0;
}