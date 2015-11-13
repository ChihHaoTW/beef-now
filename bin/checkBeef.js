var fs = require('fs');
var moment = require('moment');
moment().format();

var json = JSON.parse(fs.readFileSync('beef2.json', 'utf8'));
var now = moment();
var startTime, endTime, timeArray;

console.log("now time: " + now.format("ddd H:m"));
for(var row in json){
	for(var each in json[row]["openTime"]) {
		if(each == now.format("ddd")) {
			timeArray = json[row]["openTime"][each][0].split("-");
			startTime = timeArray[0];
			if(timeArray[1] == null) endTime = "24:00";
			else endTime = timeArray[1];
			
			if(now.isBetween(moment(startTime, 'H:m'), moment(endTime, 'H:m'))) {	
				console.log(row);
				console.log(json[row]["title"]);
				console.log(startTime + ' ! ' + now.format('H:m') + ' ! ' + endTime);
			}
		}
	}	
}
