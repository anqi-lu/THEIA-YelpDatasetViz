import json

list_business = []
for line in open('yelp_academic_dataset_business.json', 'r'):
    list_business.append(json.loads(line))

print len(list_business)

'''find the most popular categories'''
# get non-restaurant categories
a, _top_cat_count = {}, {} # table key: category  value: count
b = [] # list to store categories

# get categories under restaurants
restaurant_cat = []
_restaurant_cat_count, restaurant_cat_count = {}, {}
for bus_data in list_business:
    if "Restaurants" in bus_data["categories"]:
        for cat in bus_data["categories"]:
            if cat != "Restaurants" and cat!= "Food":
                if cat not in restaurant_cat:
                    restaurant_cat.append(cat)
                    restaurant_cat_count[cat] = 1
                else:
                    restaurant_cat_count[cat] += 1
    else:
        for cat in bus_data["categories"]:
            if cat not in b:
                b.append(cat)
                a[cat] = 1
            else:
                a[cat] += 1

sorted_a = sorted(a, key=a.get, reverse=True)
# top 100 most popular categories
for w in sorted_a[:100]:
    _top_cat_count[w] = a[w]

with open('popular_cat_count.json', 'w') as outfile:
    json.dump(_top_cat_count, outfile, sort_keys = True, indent=2)

sorted_cat_count = sorted(restaurant_cat_count, key=restaurant_cat_count.get, reverse=True)

for w in sorted_cat_count[:100]:
    _restaurant_cat_count[w] = restaurant_cat_count[w]

with open('restaurant_cat_count.json', 'w') as outfile:
    json.dump(_restaurant_cat_count, outfile, sort_keys = True, indent=2)
