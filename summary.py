from textteaser import TextTeaser
import json
import sys

data = sys.argv
tt = TextTeaser()
for x in range(2,len(data)):
	data[x] = " ".join(tt.summarize(data[1], data[x]))
data = data[2:]
data=" ".join(data)
print(data)
#print(sys.argv[2])
#print(json.dump(data, f, ensure_ascii=False))
sys.stdout.flush()