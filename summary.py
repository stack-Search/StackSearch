from textteaser import TextTeaser
import json
import sys

data = json.load(sys.argv[1])
tt = TextTeaser()
for x in range(len(data["concept"])):
	data["concept"][x] = " ".join(tt.summarize(data["Title"], data["concept"][x]))

print(json.dump(data, f, ensure_ascii=False))
sys.stdout.flush()