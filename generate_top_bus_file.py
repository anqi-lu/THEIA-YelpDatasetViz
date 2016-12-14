from cat_bus import cat_bus_info
import json
import sys

def generate_top_checkin_file(city, category):
    top_checkin_bus = cat_bus_info(city, category).get_top_checkin()

    with open('json/top_checkin_bus/'+city.replace(" ","")+'_'+category.strip().replace(" ","").replace("/","")+'.json', 'w') as outfile:
        json.dump(top_checkin_bus, outfile, sort_keys = True, indent=2)

cities = ["Las Vegas", "Phoenix", "Charlotte", "Pittsburg", "Madison", "Urbana-Champaign"]

with open('json/bus_cat.json') as data_file:
    data = json.load(data_file)

    categories = set()

    for city in data['children']:
        # all categories at the city level
        for venue_type in city['children']:
            # all venue types for a city
            for venue in venue_type['children']:
                # all venues (Pizza, Nightlife...)
                categories.add(venue['name'])

for city in cities:
    for category in categories:
        generate_top_checkin_file(city, category)
