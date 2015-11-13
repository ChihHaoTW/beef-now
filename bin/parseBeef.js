var fs = require('fs');
var GoogleSpreadsheet  = require('google-spreadsheet');
var sheet = new GoogleSpreadsheet('18AYlrW4MlIlEouQ4IYRh3kOfdOJJNhIYxHMmP9rWZHs');
var saveFileName = 'beef.json';
var sliceFileName = 'beef3.json';

function getSheet(){
	sheet.getRows(1, function(err, row_data){
		if(err){console.log(err)}
		//console.log(row_data);
		fs.writeFile(saveFileName, JSON.stringify(row_data, null, 4), 'utf8');
		
		var array = [];
		for(var i in row_data){
			if(row_data[i]["title"].indexOf("尚未評鑑") >= 0) break; 
			else {
				var tmp = row_data[i]["開店時間"].replace(/中午/, "12:00");
				tmp = tmp.replace(/24HR/, "00:00-24:00");
				row_data[i]["開店時間"] = tmp;	
				
				var re = /(\d*:\d*)-(賣完為止|\d*:\d*)?/g;
				var result = row_data[i]["開店時間"].match(re);

				if(!result) continue;

				if(!row_data[i]["公休時間"]) row_data[i]["公休時間"] = "無";
				if(result){
					row_data[i]["openTime"] = {};
					switch(row_data[i]["公休時間"]){
						case "週一":
							row_data[i]["openTime"]["Mon"] = "";
							row_data[i]["openTime"]["Tue"] = result;
							row_data[i]["openTime"]["Wed"] = result;
							row_data[i]["openTime"]["Thu"] = result;
							row_data[i]["openTime"]["Fri"] = result;
							row_data[i]["openTime"]["Sat"] = result;
							row_data[i]["openTime"]["Sun"] = result;
							break;
						case "週二":
							row_data[i]["openTime"]["Mon"] = result;
							row_data[i]["openTime"]["Tue"] = "";
							row_data[i]["openTime"]["Wed"] = result;
							row_data[i]["openTime"]["Thu"] = result;
							row_data[i]["openTime"]["Fri"] = result;
							row_data[i]["openTime"]["Sat"] = result;
							row_data[i]["openTime"]["Sun"] = result;
							break;
						default:
							row_data[i]["openTime"]["Mon"] = result;
							row_data[i]["openTime"]["Tue"] = result;
							row_data[i]["openTime"]["Wed"] = result;
							row_data[i]["openTime"]["Thu"] = result;
							row_data[i]["openTime"]["Fri"] = result;
							row_data[i]["openTime"]["Sat"] = result;
							row_data[i]["openTime"]["Sun"] = result;
							break;
					}
				}
				
				if(result != null){
					console.log(row_data[i]["title"]);
					console.log(row_data[i]["openTime"]);
					//console.log(result);
				// 	console.log(result+"\n");	
				}	
			
			}
			array.push(row_data[i]);	
		}
		fs.writeFile(sliceFileName, JSON.stringify(array, null, 4), 'utf8');
	});
}

getSheet();
