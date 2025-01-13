


var fs = FeatureSetByName($datastore, "ADA_CityImpactAreas", ["CITY"], true);

var city = First(Intersects(fs, $feature));
var result = IIF(!city, "Ada County", city.CITY)


return result