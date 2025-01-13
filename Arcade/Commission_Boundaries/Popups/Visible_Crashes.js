/* 
Open the Suggestions tab and choose a template to get started creating different content types for your pop-up. 
To learn more about using Arcade to create pop-up content visit: 
https://developers.arcgis.com/arcade/guide/profiles/#popup-element 
*/


// Year dictionary are the attributes that will be added to the table
var year_dict = {};
// Add Field Name "Year" to act as the header
var field_infos = [{fieldName:"Year"}];

// Creates a Feature Set of the Visible Crash Features
var crash_fs = FeatureSetById($map, "190a55937c0-layer-4", ["*"], true);

var crash_i_fs = Intersects(crash_fs, $feature)
var crash_i_years = OrderBy(GroupBy(crash_i_fs, "Accident_Year", [{name: "total", expression: "1", statistic: "count"}]), "Accident_Year asc")


// This is the catch if No Crashes are returned.
if (Count(crash_i_years) == 0){
	return {
		type: "text",
		text: "No Crashes for the Visible Years"
	};
}



for (var y in crash_i_years){
	year_dict[y.Accident_Year] = y.total 
	Push(field_infos, {
		fieldName:y.Accident_Year
	});
}
year_dict["Total"] = Count(crash_i_fs)
Push(field_infos, {fieldName:"Total"})

year_dict["Year"] = "Number of Crashes"
return {
	type: "fields",
	fieldInfos: field_infos,
	attributes: year_dict
};