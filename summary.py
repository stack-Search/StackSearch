from textteaser import TextTeaser
import json

data = json.load(open('data.json'))
tt = TextTeaser()
for a in data["concept"]:
	#Assuming arr[2] is the title
	a = tt.summarize(data["Title"], a)
#str_dict = dict(zip(strings[::2], strings[1::2]))
with open('data.json', 'w') as f:
	json.dump(data, f, ensure_ascii=False)