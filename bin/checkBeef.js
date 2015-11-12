var fs = require('fs');
var moment = require('moment');
moment().format();

var json = JSON.parse(fs.readFileSync('beef2.json', 'utf8'));
var now = moment();
var startTime, endTime;

console.log("now time: " + now.format("H:m"));
for(var row in json){
	startTime = json[row]["startTime"];
	endTime = json[row]["endTime"];
	if(now.isBetween(moment(startTime, 'H:m'), moment(endTime, 'H:m'))) {	
		console.log(row);
		console.log(json[row]["title"]);
		console.log(startTime + ' ! ' + now.format('H:m') + ' ! ' + endTime);
	}
}
