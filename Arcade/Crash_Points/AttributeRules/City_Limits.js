


var fs = FeatureSetByName($datastore, "ADA_CityLimits", ["CITY"], true);

var city = First(Intersects(fs, $feature));
var result = IIF(!city, "Unincorporated", city.CITY)


return result