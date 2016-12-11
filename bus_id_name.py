import json
# store business id/name pair for further faster look up
map_name_id = {}

for line in open('yelp_academic_dataset_business.json', 'r'):
    bus_data = json.loads(line)
    map_name_id[bus_data["business_id"]] = bus_data["name"]

with open('bus_id_name.json', 'w') as outfile:
    json.dump(map_name_id, outfile, sort_keys = True, indent=2)
