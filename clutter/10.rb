euro = [0, 32, 15, 19, 21, 2, 25, 17, 34, 6, 27, 13, 36,
 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 
 22, 18, 29, 7, 28, 12, 35, 3, 26]

america = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 
3, 24, 36, 13, 1, 0, 27, 10, 10, 25, 29, 12, 8, 19, 31,
 18, 6, 21, 33, 16, 4, 23, 35, 14, 2]

cnt = 0

for num in 2..36 do
    euro_max, america_max = 0, 0

    (euro.length).times do |i|
        t = 0
        for j in i..(i+num) do
            if j > (euro.length - 1)
                t += euro[j - euro.length]
            else
                t += euro[j]
            end
        end
        euro_max = t if t > euro_max
    end

    (america.length).times do |i|
        t = 0
        for j in i..(i+num) do
            print j
            if j > (america.length - 1)
                t += america[j - america.length]
            else
                t += america[j]
            end
        end
        america_max = t if t > america_max
    end

    cnt += 1 if euro_max < america_max
end

puts cnt
# puts america[-1]

