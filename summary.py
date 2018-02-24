from textteaser import TextTeaser
import json

def summary(event, context):
	data = json.load(event)
	tt = TextTeaser()
	for x in range(len(data["concept"])):
		data["concept"][x] = " ".join(tt.summarize(data["Title"], data["concept"][x]))
	return data	

#data = json.load(open('data.json'))
#tt = TextTeaser()
#for x in range(len(data["concept"])):
	#Assuming arr[2] is the title
#	print(data["concept"][x])
#	print(type(data["concept"][x]))
#	data["concept"][x] = " ".join(tt.summarize(data["Title"], data["concept"][x]))
#	print(data["concept"][x])
#str_dict = dict(zip(strings[::2], strings[1::2]))
#with open('data.json', 'w') as f:
#	json.dump(data, f, ensure_ascii=False)