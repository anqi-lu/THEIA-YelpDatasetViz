from individual_bus import bus_info
import json

with open("json/bus_id_name.json") as data_file:
    data = json.load(data_file)

#bus_id = "jf67Z1pnwElRSXllpQHiJg";
bus_id = "aGbjLWzcrnEx2ZmMCFm3EA";
file_path = "top_checkin_bus/LasVegas_Burgers.json";
booooo = bus_info(bus_id, file_path).parse_checkin()

bus_name = data[bus_id]

print bus_name
