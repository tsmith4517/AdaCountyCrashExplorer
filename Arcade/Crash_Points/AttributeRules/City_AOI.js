// Feature Class: ITD_Crash0523_PedestrianBicycle
// Field: city_aoi
// Triggers: Insert, Update
// Description: This rule determines the city of the crash point based on its location within a city's defined area of impact (AOI).



var fs = FeatureSetByName($datastore, "ADA_CityImpactAreas", ["CITY"], true);

var city = First(Intersects(fs, $feature));
var result = IIF(isEmpty(city), "Ada County", city.CITY)


return result