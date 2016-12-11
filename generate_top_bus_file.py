from cat_bus import cat_bus_info
import json
import sys

def generate_top_checkin_file(city, category):
    top_checkin_bus = cat_bus_info(city, category).get_top_checkin()

    with open('top_checkin_bus/'+city.replace(" ","")+'_'+category.strip().replace(" ","")+'.json', 'w') as outfile:
        json.dump(top_checkin_bus, outfile, sort_keys = True, indent=2)

def generate_top_review_file(city,category):
    top_review_bus = cat_bus_info(city,category).get_top_review()

    with open('top_review_bus/'+city.replace(" ","")+'_'+category.strip().replace(" ","")+'.json', 'w') as outfile:
        json.dump(top_review_bus, outfile, sort_keys = True, indent=2)

cities = ["Las Vegas", "Phoenix", "Charlotte", "Pittsburg", "Madison", "Urbana-Champaign"]
categories = ["Chinese", "Coffee & Tea", "Fast Food", "Pizza", "Mexican", "Burgers", "Japanese", "Sandwiches"]
for city in cities:
    for category in categories:
        generate_top_checkin_file(city, category)
