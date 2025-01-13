// Feature Class: 
// Field:
// Triggers:
// Description:

// Grabs the features Geometry
var geom = Geometry($feature);

// This is retuned as Nan if the feature has invalid geometry
if (isNaN(geom.X)){
return 0
}else{
return 1
}