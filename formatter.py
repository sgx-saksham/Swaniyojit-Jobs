#data formating to convert into json

res = "{"
f = open("iti.txt", "r", encoding='utf-8')
for i in f:
    line = i.split(":")
    if len(line)<2: continue
    # print(line)
    if line[0].strip() == "company":
        res+='},\n{'
    line = '\"{}\" : \"{}\",\n'.format(line[0].strip(), line[1].strip())
    res+=line
f2 = open("iti2.txt", "w", encoding='utf-8')
f2.write(res)