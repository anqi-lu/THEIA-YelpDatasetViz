import json

class cat_bus_info:
    def __init__(self, city, category):
        self.city = city
        self.category = category

    def get_bus_list(self):
        list_business_id = []
        for line in open('json/yelp_academic_dataset_business.json', 'r'):
            data = json.loads(line)
            if (self.category in data["categories"] and data["city"] == self.city):
                list_business_id.append(json.loads(line)["business_id"])
        return list_business_id

    '''get the top 10 businesses with the most checkins'''
    def get_top_checkin(self):
        list_business_id = self.get_bus_list()
        list_checkin = []
        for line in open('json/yelp_academic_dataset_checkin.json', 'r'):
            if json.loads(line)["business_id"] in list_business_id:
                list_checkin.append(json.loads(line))

        a = {} # key: business id  value: number of total checkins
        for checkin_data in list_checkin:
            # sum up the checkins
            bid_info = 0
            for val in checkin_data['checkin_info'].itervalues():
                bid_info += val

            a[checkin_data['business_id']] = bid_info

        # sort on value
        sorted_a = sorted(a, key=a.get, reverse=True)
        top_checkin_bus = []
        for w in sorted_a[:10]:
            for checkin_data in list_checkin:
                if w == checkin_data["business_id"]:
                    top_checkin_bus.append(checkin_data)

        return top_checkin_bus
