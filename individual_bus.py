import json
import csv
import sys

class bus_info:
    def __init__(self, bus_id, file_path):
        self.bus_id = bus_id
        self.file_path = file_path

    def parse_checkin(self):
        map_day = {
            "0": "Sunday Dec 04 2016",
            "1": "Monday Dec 05 2016",
            "2": "Tuesday Dec 06 2016",
            "3": "Wednesday Dec 07 2016",
            "4": "Thursday Dec 08 2016",
            "5": "Friday Dec 09 2016",
            "6": "Saturday Dec 10 2016"
        }
        map_slot_val = {}

        f = open("top_individual_checkin/LasVega_Burgers_Second.csv", 'wt')
        writer = csv.writer(f)
        writer.writerow( ('time_day', 'num_checkin') )

        with open(self.file_path) as data_file:
            data = json.load(data_file)
        # sort on day and then time

        day_list = ['0', '1', '2', '3', '4', '5', '6']
        for day in day_list:
            for i in xrange(24):
                checkin_info = data[1]["checkin_info"]
                key = str(i)+'-'+day
                if key in checkin_info.iterkeys():
                    num_checkin = checkin_info[key]
                else:
                    num_checkin = 0
                writer.writerow((str(i)+' '+map_day[day], num_checkin))
        f.close()

        return True
