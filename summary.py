from textteaser import TextTeaser
import json
#Assuming a JSON string is passed into the event variable
def summary(event, context):
	tt = textteaser()
	arr = json.loads(event)
	summ_str = ""
	code = []
	strings = []
	if (arr[3]):
		if (len(arr[0]) == 0):
			return arr[1]

	for a in arr[0]:
		#Assuming arr[2] is the title
		summ_str = tt.summarize(arr[2], a)
		strings.append(summ_str)
	return strings