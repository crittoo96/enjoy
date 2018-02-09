(1..100).each do |i|
    flag = false
    (1..100).each do |j|
        if i % j == 0
            flag = !flag
        end
    end
    puts i if flag
end
