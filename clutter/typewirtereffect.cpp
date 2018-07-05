#include <iostream>
#include <string>
#include <thread>
#include <chrono>

using namespace std;

void slow_print(const string&, unsigned int);

int main(){
    string message = "カントリーローど、明日はいつものの僕さ、帰りたい帰れない明日はカントリーロード\n";
    slow_print(message, 24);

    return 0;
}

void slow_print(const string& message, unsigned int millis_per_char){
    for(const char c : message){
        cout << c << flush;
        this_thread::sleep_for(chrono::milliseconds(millis_per_char));
    }
}