// Feature Class: 
// Field:
// Triggers:
// Description:




function getDistance(road_geom, crash_geom){
    var nearest_dict = NearestCoordinate(road_geom, crash_geom);
    var nearest_distance = nearest_dict.distance * 3.28084

    return nearest_distance
}
// Sets up the the featureset structure for the road segments within the search  buffer. For this featureset we don't need geometry.
var fs_json = {
    geometryType: "esriGeometryPolyline",
    fields: [
      { name: "FID", alias: "FID", type: "esriFieldTypeOid" },
      { name: "Distance", alias: "Distance", type: "esriFieldTypeDouble" },
      { name: "RoadName", alias: "RoadName", type: "esriFieldTypeString" },
      { name: "FunctClass", alias: "FunctClass", type: "esriFieldTypeString"},
      { name: "OneWay", alias: "OneWay", type: "esriFieldTypeString"},
      { name: "Speed", alias: "Speed", type: "esriFieldTypeInteger"},
      { name: "Private", alias: "Private", type: "esriFieldTypeString"}
    ],
    features: [
    ]
  };


var road_fs = FeatureSetByName($datastore, "ADA_RoadCenterline", ["OBJECTID","PostSpeed", "StName", "FuncClass", "OneWay", "Private"], true);
var buffer_geom = Buffer($feature, 50, "feet")
var intersect_road_fs = Intersects(road_fs, buffer_geom)

if (Count(intersect_road_fs)==0){
    return -99999
}


for (var f in intersect_road_fs){
    console(Geometry(f))
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
                Speed: f['PostSpeed'],
                Private: f['Private']
            }
        }
    )
}

var updated_fs = OrderBy(FeatureSet(fs_json), 'Distance ASC')
console(First(updated_fs))

return First(updated_fs).FuncClass