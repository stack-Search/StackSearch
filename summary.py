from textteaser import TextTeaser
import json
#Assuming a JSON string is passed into the event variable
def summary(event, context):
	tt = textteaser()
	arr = json.loads(event)
	summ_str = ""
	code = []
	strings = []
	counter = 0
	for a in arr[0]:
		#Assuming arr[2] is the title
		summ_str = tt.summarize(arr[2], a)
		strings.append(str(counter))
		strings.append(summ_str)
		counter += 1
	return dict(zip(strings[::2], strings[1::2]))