// The Attribute Rule is applied to the "ITD_Crash0523_PedestrianBicycle" Table
//-99999 means it was on private property
// https://developers.arcgis.com/enterprise-sdk/api-reference/net/esriFieldType/
//https://community.esri.com/t5/arcgis-online-developers-questions/push-a-feature-in-a-featureset-arcade-script/td-p/1342575

function getDistance(road_geom, crash_geom){
    var nearest_dict = NearestCoordinate(road_geom, crash_geom);
    var nearest_distance = nearest_dict.distance * 3.28084

    return nearest_distance
}
// Sets up the 
var fs_json = {
    geometryType: "esriGeometryPolyline",
    fields: [
      { name: "FID", alias: "FID", type: "esriFieldTypeOid" },
      { name: "Distance", alias: "Distance", type: "esriFieldTypeDouble" },
      { name: "RoadName", alias: "RoadName", type: "esriFieldTypeString" },
      { name: "FunctClass", alias: "FunctClass", type: "esriFieldTypeString"},
      { name: "OneWay", alias: "OneWay", type: "esriFieldTypeString"},
      { name: "Speed", alias: "Speed", type: "esriFieldTypeInteger"}
    ],
    features: [
    ]
  };


var road_fs = FeatureSetByName($datastore, "ADA_RoadCenterline", ["OBJECTID","PostSpeed", "StName", "FuncClass", "OneWay"], true);
var buffer_geom = Buffer($feature, 50, "feet")
var intersect_road_fs = Intersects(road_fs, buffer_geom)

if (Count(intersect_road_fs)==0){
    return -99999
}




for (var f in intersect_road_fs){
    var road_name = f.StName;
    var distance = getDistance(f, $feature)
    console(distance)
    Push(
        fs_json['features'],
        {
            attributes: {
                FID: f['OBJECTID'],
                Distance: distance,
                RoadName: f['StName'],
                FunctClass: f['FuncClass'],
                OneWay: f['OneWay'],
                Speed: f['PostSpeed']
            }
        }
    )
}

var updated_fs = FeatureSet(fs_json)
console(updated_fs)
var nearest_bike = NearestCoordinate(bike_fs, $feature);

console(nearest_bike.X, nearest_bike.Y)
