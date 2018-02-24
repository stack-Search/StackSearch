from textteaser import TextTeaser
import json
from pprint import pprint

#Assuming a JSON string is passed into the event variable
def summary(event, context):
    tt = TextTeaser()

# stackAPI_return:
    # concept
    # code
    # title
    # is_code

    data = json.load(open('data.json'))
    pprint(data)


    #summ_str = ""

    #code = []
    #strings = []
    #if (arr[3]):
    #    if (len(arr[0]) == 0):
    #        return arr[1]

    #for (a in arr[0]):
        #Assuming arr[2] is the title
    #    summ_str = tt.summarize(arr[2], a)
    #    strings.append(summ_str)
    #return strings