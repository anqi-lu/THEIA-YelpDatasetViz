import json

list_checkin = []
for line in open('json/yelp_academic_dataset_checkin.json', 'r'):
    list_checkin.append(json.loads(line))

with open('checkin_dataset.json', 'w') as outfile:
    json.dump(list_checkin, outfile, sort_keys = True, indent=2)


list_business = []
for line in open('json/yelp_academic_dataset_business.json', 'r'):
    list_business.append(json.loads(line))

with open('business_dataset.json', 'w') as outfile_:
    json.dump(list_business, outfile_, sort_keys = True, indent=2)
