from datetime import datetime
import requests
import arcpy
import sys

input_fc = r"C:\Users\tsmit\Documents\Projects\ACHD\DATA\FGDB\Crash.gdb\ITD_Crash0523_PedestrianBicycle"

def getFlag(sunrise, sunset, check_time):
        if check_time > sunrise and check_time < sunset:
            flag = "Daytime"
        elif check_time<sunrise:
            flag = "Before Sunrise"
        elif check_time > sunset:
            flag ="After Sunset"
            
        return flag


with arcpy.da.UpdateCursor(input_fc, ["Latitude", "Longitude", "crash_date", "crash_time", "sunrise_sunset"], 'has_geometry=1 And sunrise_sunset IS NOT NULL') as cursor:
    for row in cursor: 
        lat = row[0]
        lon = row[1]
        date_str = row[2].strftime('%Y-%m-%d')
        crash_time = datetime.strptime(row[3].strftime("%I:%M:%S %p"), "%I:%M:%S %p")
        result = requests.get(f"https://api.sunrise-sunset.org/json?lat={lat}&lng={lon}&date={date_str}&tzid=America/Denver").json()
        sunrise = datetime.strptime(result['results']['sunrise'], "%I:%M:%S %p")
        sunset = datetime.strptime(result['results']['sunset'], "%I:%M:%S %p")
        row[4] = getFlag(sunrise, sunset, crash_time)
        cursor.updateRow(row)


print("done")
