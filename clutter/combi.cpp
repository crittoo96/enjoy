#include <iostream>
#include <algorithm>
#include <vector>

int combi(int n, int r){
    std::vector<bool> v(n);
    std::fill(v.begin(), v.begin() + r, true);
    int count = 0;
    do {
        for (int i = 0; i < n; ++i) {
            if (v[i]) {
                count++;
                // std::cout << (i + 1) << " ";
            }
        }
        // std::cout << "\n";
    } while (std::prev_permutation(v.begin(), v.end()));
    return count / r;
}

int main() {
   std::cout << combi(5, 3);
   return 0;
}