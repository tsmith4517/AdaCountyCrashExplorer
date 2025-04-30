// Feature Class: ITD_Crash0523_PedestrianBicycle
// Field: city_limit
// Triggers: Insert, Update
// Description: This rule determines the city of the crash point based on its location within a city's defined limits.




var fs = FeatureSetByName($datastore, "ADA_CityLimits", ["CITY"], true);

var city = First(Intersects(fs, $feature));
var result = IIF(isEmpty(city), "Unincorporated", city.CITY)


return result