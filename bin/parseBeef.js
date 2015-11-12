var fs = require('fs');
var GoogleSpreadsheet  = require('google-spreadsheet');
var sheet = new GoogleSpreadsheet('18AYlrW4MlIlEouQ4IYRh3kOfdOJJNhIYxHMmP9rWZHs');
var saveFileName = 'beef.json';
var sliceFileName = 'beef2.json';

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
				
				var re = /(\d*:\d*)-(賣完為止|\d*:\d*)?/;
				var result = row_data[i]["開店時間"].match(re);
				if(!result) continue;
				if(result[1]) row_data[i]["startTime"] = result[1];
				if(result[2]) row_data[i]["endTime"] = result[2];
				if(result != null){
					console.log(i);
					console.log(row_data[i]["startTime"]);
					console.log(row_data[i]["endTime"]);
				// 	console.log(result+"\n");	
				}	
			
			}
			array.push(row_data[i]);	
		}
		fs.writeFile(sliceFileName, JSON.stringify(array, null, 4), 'utf8');
	});
}

getSheet();
